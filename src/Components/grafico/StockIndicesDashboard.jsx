import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockIndicesDashboard = () => {
  const [activeIndex, setActiveIndex] = useState('dax');
  const [activePeriod, setActivePeriod] = useState('1d');
  const [indexData, setIndexData] = useState({
    dax: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 },
    sp500: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 },
    ibex: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 }
  });

  const periods = [
    { id: '1d', label: '1 día' },
    { id: '5d', label: '5 D' },
    { id: '1m', label: '1 mes' },
    { id: '6m', label: '6 M' },
    { id: 'ytd', label: 'YTD' },
    { id: '1y', label: '1 año' },
    { id: '5y', label: '5 años' },
    { id: 'max', label: 'MÁX.' }
  ];

  useEffect(() => {
    const fetchIndexData = async () => {
      const mockDataForAllIndices = generateMockDataForAllPeriods();
      
      setTimeout(() => {
        setIndexData({
          dax: { 
            loading: false, 
            data: mockDataForAllIndices.dax,
            current: mockDataForAllIndices.dax['1d'].currentValue,
            change: mockDataForAllIndices.dax['1d'].change,
            percentChange: mockDataForAllIndices.dax['1d'].percentChange
          },
          sp500: { 
            loading: false, 
            data: mockDataForAllIndices.sp500,
            current: mockDataForAllIndices.sp500['1d'].currentValue,
            change: mockDataForAllIndices.sp500['1d'].change,
            percentChange: mockDataForAllIndices.sp500['1d'].percentChange
          },
          ibex: { 
            loading: false, 
            data: mockDataForAllIndices.ibex,
            current: mockDataForAllIndices.ibex['1d'].currentValue,
            change: mockDataForAllIndices.ibex['1d'].change,
            percentChange: mockDataForAllIndices.ibex['1d'].percentChange
          }
        });
      }, 1000);
    };

    fetchIndexData();
  }, []);

  function generateMockDataForAllPeriods() {
    const indices = {
      dax: { min: 22000, max: 23000, startValue: 22600 },
      sp500: { min: 5200, max: 5600, startValue: 5400 },
      ibex: { min: 10500, max: 11200, startValue: 10900 }
    };

    const result = {};

    Object.keys(indices).forEach(indexKey => {
      const { min, max, startValue } = indices[indexKey];
      result[indexKey] = {
        '1d': generatePeriodData(min, max, startValue, 24, 'hourly'),
        '5d': generatePeriodData(min - 200, max - 100, startValue - 150, 5, 'daily'),
        '1m': generatePeriodData(min - 300, max - 100, startValue - 200, 30, 'daily'),
        '6m': generatePeriodData(min - 500, max + 200, startValue - 300, 180, 'daily'),
        'ytd': generatePeriodData(min - 400, max + 100, startValue - 250, 60, 'daily'),
        '1y': generatePeriodData(min - 800, max + 400, startValue - 400, 365, 'daily'),
        '5y': generatePeriodData(min - 1200, max + 800, startValue - 1000, 60, 'monthly'),
        'max': generatePeriodData(min - 2000, max + 1500, startValue - 1800, 120, 'monthly')
      };
    });

    return result;
  }

  function generatePeriodData(min, max, startValue, dataPoints, intervalType) {
    const data = [];
    let currentValue = startValue;
    const volatility = (max - min) * 0.01;
    
    const today = new Date();
    let currentDate = new Date();
    
    if (intervalType === 'hourly') {
      currentDate.setHours(9, 0, 0, 0);
    } else if (intervalType === 'daily') {
      currentDate.setDate(currentDate.getDate() - dataPoints);
    } else if (intervalType === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() - dataPoints);
    }
    
    for (let i = 0; i < dataPoints; i++) {
      const trend = Math.sin(i / dataPoints * Math.PI) * volatility * 2;
      const change = (Math.random() - 0.48) * volatility + trend;
      currentValue += change;
      
      currentValue = Math.max(min, Math.min(max, currentValue));
      
      let label;
      if (intervalType === 'hourly') {
        const hour = 9 + Math.floor(i * (9 / dataPoints));
        const minute = Math.floor((i * (9 / dataPoints) % 1) * 60);
        label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      } else if (intervalType === 'daily') {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        label = `${date.getDate()}/${date.getMonth() + 1}`;
      } else if (intervalType === 'monthly') {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() + i);
        label = `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}`;
      }
      
      data.push({
        time: label,
        value: parseFloat(currentValue.toFixed(2))
      });
    }
    
    const finalValue = data[data.length - 1].value;
    const initialValue = data[0].value;
    const change = finalValue - initialValue;
    const percentChange = (change / initialValue * 100).toFixed(2);
    
    return {
      chartData: data,
      currentValue: finalValue,
      change: parseFloat(change.toFixed(2)),
      percentChange: parseFloat(percentChange)
    };
  }

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };

  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };

  const formatTime = (time) => time;

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()} feb, ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:00 UTC+1`;
  };

  const getIndexTitle = (index) => {
    const indexNames = {
      dax: 'DAX',
      sp500: 'S&P 500',
      ibex: 'IBEX'
    };
    return indexNames[index] || index;
  };

  const renderCurrentIndexCard = () => {
    const indexKey = activeIndex;
    const indexName = getIndexTitle(indexKey);
    const indexInfo = indexData[indexKey];
    const isLoading = indexInfo.loading;
    
    const periodData = !isLoading ? indexInfo.data[activePeriod] : null;
    const chartData = !isLoading ? periodData.chartData : [];
    
    const currentValue = !isLoading ? periodData.currentValue : 0;
    const change = !isLoading ? periodData.change : 0;
    const percentChange = !isLoading ? periodData.percentChange : 0;
    const isPositive = change >= 0;

    return (
      <Card className="border-0 shadow-sm" style={{ backgroundColor: '#fafafa' }}>
        <CardHeader className="pb-2 relative">
          {/* Coloco los botones en el mismo CardHeader, alineados a la derecha */}
          <div className="absolute top-4 right-6 z-10 flex gap-2">
            <button 
              className={`px-2 py-0.5 text-xs font-medium rounded ${activeIndex === 'dax' ? 'text-white' : 'text-gray-700'}`}
              style={{ 
                backgroundColor: activeIndex === 'dax' ? '#46695a' : '#e1e3ac'
              }}
              onClick={() => handleIndexChange('dax')}
            >
              DAX
            </button>
            <button 
              className={`px-2 py-0.5 text-xs font-medium rounded ${activeIndex === 'sp500' ? 'text-white' : 'text-gray-700'}`}
              style={{ 
                backgroundColor: activeIndex === 'sp500' ? '#46695a' : '#e1e3ac'
              }}
              onClick={() => handleIndexChange('sp500')}
            >
              S&P 500
            </button>
            <button 
              className={`px-2 py-0.5 text-xs font-medium rounded ${activeIndex === 'ibex' ? 'text-white' : 'text-gray-700'}`}
              style={{ 
                backgroundColor: activeIndex === 'ibex' ? '#46695a' : '#e1e3ac'
              }}
              onClick={() => handleIndexChange('ibex')}
            >
              IBEX
            </button>
          </div>
          
          <CardTitle className="text-2xl font-bold" style={{ color: '#223536' }}>{indexName}</CardTitle>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold mr-3" style={{ color: '#223536' }}>{formatNumber(currentValue)}</span>
            <span className={`flex items-center text-lg`} style={{ color: isPositive ? '#638a63' : '#8B4513' }}>
              {isPositive ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              {isPositive ? '+' : ''}{percentChange}% {formatNumber(Math.abs(change))}             </span>
          </div>
          <div className="text-sm text-gray-500">{getCurrentDate()}</div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4 text-sm overflow-x-auto pb-2">
            {periods.map(period => (
              <button
                key={period.id}
                className={`font-medium`}
                style={{ 
                  color: activePeriod === period.id ? '#638a63' : '#6B7280' 
                }}
                onClick={() => handlePeriodChange(period.id)}
              >
                {period.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <span style={{ color: '#223536' }}>Cargando datos...</span>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10, fill: '#223536' }}
                    tickFormatter={formatTime}
                    interval={Math.floor(chartData.length / 6)}
                  />
                  <YAxis 
                    domain={['dataMin - 50', 'dataMax + 50']} 
                    tick={{ fontSize: 10, fill: '#223536' }}
                    tickCount={5}
                    orientation="right"
                  />
                  <Tooltip 
                    formatter={(value) => [formatNumber(value), 'Valor']}
                    labelFormatter={(time) => `${activePeriod === '1d' ? 'Hora' : 'Fecha'}: ${time}`}
                    contentStyle={{ backgroundColor: '#e1e3ac', borderColor: '#638a63', color: '#223536' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? "#638a63" : "#8B4513"} 
                    dot={false}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-end mt-2 text-sm" style={{ color: '#46695a' }}>
                <span>Cierre: {formatNumber(chartData[chartData.length - 1]?.value || 0)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4" style={{ backgroundColor: '#fafafa' }}>
      {renderCurrentIndexCard()}
    </div>
  );
};

export default StockIndicesDashboard;
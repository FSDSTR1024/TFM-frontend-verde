// Este componente grafica tres indices bursatiles
//Los datos estan simulados

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockIndicesDashboard = () => {
  const [activeIndex, setActiveIndex] = useState('dax'); //Controla qué índice está seleccionado (DAX, S&P 500 o IBEX)
  const [activePeriod, setActivePeriod] = useState('1d'); // Controla el período de tiempo seleccionado (1 día, 5 días, etc.)
  const [indexData, setIndexData] = useState({ //Almacena los datos de todos los índices bursátiles
    dax: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 },
    sp500: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 },
    ibex: { loading: true, data: {}, current: 0, change: 0, percentChange: 0 }
  });

  const periods = [  //Define los diferentes intervalos de tiempo que se pueden seleccionar.
    { id: '1d', label: '1 día' },
    { id: '5d', label: '5 D' },
    { id: '1m', label: '1 mes' },
    { id: '6m', label: '6 M' },
    { id: 'ytd', label: 'YTD' },
    { id: '1y', label: '1 año' },
    { id: '5y', label: '5 años' },
    { id: 'max', label: 'MÁX.' }
  ];

  // Simulo lectura a la base de datos MongoDB
  useEffect(() => {
    
    const fetchIndexData = async () => {
      const mockDataForAllIndices = generateMockDataForAllPeriods();
      
      // Simula delay de la red
      setTimeout(() => {
        setIndexData({ // Estructura de datos para cada índice
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

  // Genera datos para todos los periodos
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

  // Genera puntos de datos aleatorios con tendencias
  // Calcula valores derivados (cambio, porcentaje)
  // Formatea fechas/horas según el tipo de intervalo
  function generatePeriodData(min, max, startValue, dataPoints, intervalType) {
    const data = [];
    let currentValue = startValue;
    const volatility = (max - min) * 0.01;
    
    const today = new Date();
    let currentDate = new Date();
    
   
    if (intervalType === 'hourly') {
      currentDate.setHours(9, 0, 0, 0); // Empieza  a las 9:00 AM 
    } else if (intervalType === 'daily') {
      currentDate.setDate(currentDate.getDate() - dataPoints);
    } else if (intervalType === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() - dataPoints);
    }
    
    for (let i = 0; i < dataPoints; i++) {
      // Generacion de datos aleatorios
      const trend = Math.sin(i / dataPoints * Math.PI) * volatility * 2;
      const change = (Math.random() - 0.48) * volatility + trend;
      currentValue += change;
      
      // Aqui se acota el rango de los datos
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

  const renderIndexCard = (indexKey, indexName) => {
  // Extrae datos del índice específico
  // Determina si el cambio es positivo o negativo
  // Renderiza la tarjeta con título, valor actual, cambio y gráfico
    const indexInfo = indexData[indexKey];
    const isLoading = indexInfo.loading;
    
    // Obtiene datos para el periodo actual
    const periodData = !isLoading ? indexInfo.data[activePeriod] : null;
    const chartData = !isLoading ? periodData.chartData : [];
    
    // Determina si el cambio es positivo o negativo
    const currentValue = !isLoading ? periodData.currentValue : 0;
    const change = !isLoading ? periodData.change : 0;
    const percentChange = !isLoading ? periodData.percentChange : 0;
    const isPositive = change >= 0;

    return (
      <TabsContent value={indexKey} className="mt-0">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{indexName}</CardTitle>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold mr-3">{formatNumber(currentValue)}</span>
              <span className={`flex items-center text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                {isPositive ? '+' : ''}{percentChange}% {formatNumber(Math.abs(change))} Hoy
              </span>
            </div>
            <div className="text-sm text-gray-500">{getCurrentDate()}</div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4 text-sm overflow-x-auto pb-2">
              {periods.map(period => (
                <button
                  key={period.id}
                  className={`font-medium ${activePeriod === period.id ? 'text-blue-600' : 'text-gray-500'}`}
                  onClick={() => handlePeriodChange(period.id)}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <span>Cargando datos...</span>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10 }}
                      tickFormatter={formatTime}
                      interval={Math.floor(chartData.length / 6)}
                    />
                    <YAxis 
                      domain={['dataMin - 50', 'dataMax + 50']} 
                      tick={{ fontSize: 10 }}
                      tickCount={5}
                      orientation="right"
                    />
                    <Tooltip 
                      formatter={(value) => [formatNumber(value), 'Valor']}
                      labelFormatter={(time) => `${activePeriod === '1d' ? 'Hora' : 'Fecha'}: ${time}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isPositive ? "#22c55e" : "#ef4444"} 
                      dot={false}
                      strokeWidth={2}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-end mt-2 text-sm text-gray-500">
                  <span>Cierre: {formatNumber(chartData[chartData.length - 1]?.value || 0)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="dax" onValueChange={setActiveIndex} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dax">DAX</TabsTrigger>
          <TabsTrigger value="sp500">S&P 500</TabsTrigger>
          <TabsTrigger value="ibex">IBEX</TabsTrigger>
        </TabsList>
        
        {renderIndexCard('dax', 'DAX')}
        {renderIndexCard('sp500', 'S&P 500')}
        {renderIndexCard('ibex', 'IBEX')}
      </Tabs>
    </div>
  );
};

export default StockIndicesDashboard;
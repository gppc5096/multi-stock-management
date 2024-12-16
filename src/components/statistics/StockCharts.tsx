import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const StockCharts = () => {
  const entries = useSelector((state: RootState) => state.stock.entries);

  // 한국주식과 미국주식 분리
  const koreanStocks = entries.filter(entry => entry.country === 'KRW');
  const usStocks = entries.filter(entry => entry.country === 'USD');

  // 한국주식 티커별 통계 (원화매수금 기준)
  const koreanTickerStats = koreanStocks.reduce((acc, entry) => {
    const ticker = entry.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        quantity: 0,
        totalAmount: 0,
      };
    }
    
    acc[ticker].quantity += entry.quantity;
    acc[ticker].totalAmount += entry.krwAmount;
    
    return acc;
  }, {} as Record<string, { quantity: number; totalAmount: number; }>);

  // 미국주식 티커별 통계 (달러매수금 기준)
  const usTickerStats = usStocks.reduce((acc, entry) => {
    const ticker = entry.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        quantity: 0,
        totalAmount: 0,
      };
    }
    
    acc[ticker].quantity += entry.quantity;
    acc[ticker].totalAmount += entry.usdAmount;
    
    return acc;
  }, {} as Record<string, { quantity: number; totalAmount: number; }>);

  // 차트 데이터 포맷팅
  const koreanChartData = Object.entries(koreanTickerStats).map(([ticker, stats]) => ({
    name: ticker,
    value: stats.totalAmount,
    quantity: stats.quantity,
  }));

  const usChartData = Object.entries(usTickerStats).map(([ticker, stats]) => ({
    name: ticker,
    value: stats.totalAmount,
    quantity: stats.quantity,
  }));

  // 바 차트용 데이터 포맷팅
  const koreanBarData = Object.entries(koreanTickerStats).map(([ticker, stats]) => ({
    name: ticker,
    amount: stats.totalAmount,
  }));

  const usBarData = Object.entries(usTickerStats).map(([ticker, stats]) => ({
    name: ticker,
    amount: stats.totalAmount,
  }));

  if (entries.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">등록된 거래 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">한국주식 티커별 자산분포</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={koreanChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: ${entry.quantity}주`}
              >
                {koreanChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [
                  `${(value / 1000000).toFixed(1)}M KRW`,
                  '원화매수금'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">미국주식 티커별 자산분포</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={usChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: ${entry.quantity}주`}
              >
                {usChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [
                  `${value.toFixed(2)} USD`,
                  '달러매수금'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 새로 추가된 한국주식 원화매수금 현황 차트 */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">한국주식 원화매수금 현황</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={koreanBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                label={{ value: '원화매수금 (백만원)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M KRW`, '원화매수금']}
              />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 새로 추가된 미국주식 달러매수금 현황 차트 */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">미국주식 달러매수금 현황</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                label={{ value: '달러매수금 (USD)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2)} USD`, '달러매수금']}
              />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default StockCharts;
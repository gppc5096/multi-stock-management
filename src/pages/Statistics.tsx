import { Card } from "@/components/ui/card";
import StockStats from "@/components/statistics/StockStats";
import StockCharts from "@/components/statistics/StockCharts";

const Statistics = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-16 z-40 bg-background py-4 border-b">
        <h1 className="text-4xl font-bold text-center" style={{ color: '#c23c10' }}>Multi Stock Management</h1>
      </div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#10c21e' }}>통계</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <StockStats />
        </Card>
        <Card className="p-4">
          <StockCharts />
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
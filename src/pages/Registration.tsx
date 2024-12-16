import { Card } from "@/components/ui/card";
import StockForm from "@/components/stock/StockForm";
import StockList from "@/components/stock/StockList";

const Registration = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="sticky top-16 z-40 bg-background py-4 border-b">
        <h1 className="text-4xl font-bold text-center" style={{ color: '#c23c10' }}>Multi Stock Management</h1>
      </div>
      <div className="flex flex-col space-y-6 p-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#10c21e' }}>등록</h2>
          <StockForm />
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#10c21e' }}>현황</h2>
          <StockList />
        </Card>
      </div>
    </div>
  );
};

export default Registration;
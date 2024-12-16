import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card } from '@/components/ui/card';
import CountryStats from './stats/CountryStats';
import BrokerStats from './stats/BrokerStats';
import TickerStats from './stats/TickerStats';

const StockStats = () => {
  const entries = useSelector((state: RootState) => state.stock.entries);

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
        <h3 className="text-lg font-semibold mb-4">국가별 통계</h3>
        <CountryStats entries={entries} />
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">증권사별 통계</h3>
        <BrokerStats entries={entries} />
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">티커별 통계</h3>
        <TickerStats entries={entries} />
      </Card>
    </div>
  );
};

export default StockStats;
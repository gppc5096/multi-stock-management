import { StockEntry } from '@/store/stockSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BrokerStatsProps {
  entries: StockEntry[];
}

const BrokerStats = ({ entries }: BrokerStatsProps) => {
  // 증권사별 통계 계산
  const stats = entries.reduce((acc, entry) => {
    const broker = entry.broker;
    if (!acc[broker]) {
      acc[broker] = {
        tickers: {} as Record<string, {
          quantity: number;
          krwAmount: number;
          usdAmount: number;
        }>,
        totalKRW: 0,
        totalUSD: 0,
      };
    }
    
    // 티커별 통계
    if (!acc[broker].tickers[entry.ticker]) {
      acc[broker].tickers[entry.ticker] = {
        quantity: 0,
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    acc[broker].tickers[entry.ticker].quantity += entry.quantity;
    acc[broker].tickers[entry.ticker].krwAmount += entry.krwAmount;
    acc[broker].tickers[entry.ticker].usdAmount += entry.usdAmount;
    
    // 증권사 총계
    acc[broker].totalKRW += entry.krwAmount;
    acc[broker].totalUSD += entry.usdAmount;
    
    return acc;
  }, {} as Record<string, {
    tickers: Record<string, {
      quantity: number;
      krwAmount: number;
      usdAmount: number;
    }>,
    totalKRW: number;
    totalUSD: number;
  }>);

  // 전체 총계 계산
  const totalKRW = Object.values(stats).reduce((sum, stat) => sum + stat.totalKRW, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>증권사</TableHead>
          <TableHead>티커</TableHead>
          <TableHead>보유수량</TableHead>
          <TableHead>USD 자산</TableHead>
          <TableHead>KRW 자산</TableHead>
          <TableHead>비중</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(stats).map(([broker, stat]) => (
          <>
            {Object.entries(stat.tickers).map(([ticker, tickerStat], index) => (
              <TableRow key={`${broker}-${ticker}`}>
                {index === 0 && (
                  <TableCell rowSpan={Object.keys(stat.tickers).length}>
                    {broker}
                  </TableCell>
                )}
                <TableCell>{ticker}</TableCell>
                <TableCell>{tickerStat.quantity.toLocaleString()}</TableCell>
                <TableCell>{tickerStat.usdAmount.toLocaleString()} USD</TableCell>
                <TableCell>{tickerStat.krwAmount.toLocaleString()} KRW</TableCell>
                <TableCell>
                  {((tickerStat.krwAmount / totalKRW) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell colSpan={2}>증권사 소계</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{stat.totalUSD.toLocaleString()} USD</TableCell>
              <TableCell>{stat.totalKRW.toLocaleString()} KRW</TableCell>
              <TableCell>{((stat.totalKRW / totalKRW) * 100).toFixed(2)}%</TableCell>
            </TableRow>
          </>
        ))}
        <TableRow className="font-semibold">
          <TableCell colSpan={3}>총계</TableCell>
          <TableCell>
            {Object.values(stats).reduce((sum, stat) => sum + stat.totalUSD, 0).toLocaleString()} USD
          </TableCell>
          <TableCell>{totalKRW.toLocaleString()} KRW</TableCell>
          <TableCell>100%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BrokerStats;
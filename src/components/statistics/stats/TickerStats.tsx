import { StockEntry } from '@/store/stockSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TickerStatsProps {
  entries: StockEntry[];
}

const TickerStats = ({ entries }: TickerStatsProps) => {
  // 티커별 통계 계산
  const stats = entries.reduce((acc, entry) => {
    const ticker = entry.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        quantity: 0,
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    acc[ticker].quantity += entry.quantity;
    acc[ticker].krwAmount += entry.krwAmount;
    acc[ticker].usdAmount += entry.usdAmount;
    
    return acc;
  }, {} as Record<string, {
    quantity: number;
    krwAmount: number;
    usdAmount: number;
  }>);

  // 총 자산 계산
  const totalKRW = Object.values(stats).reduce((sum, stat) => sum + stat.krwAmount, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>티커</TableHead>
          <TableHead>보유수량</TableHead>
          <TableHead>USD 자산</TableHead>
          <TableHead>KRW 자산</TableHead>
          <TableHead>비중</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(stats).map(([ticker, stat]) => (
          <TableRow key={ticker}>
            <TableCell>{ticker}</TableCell>
            <TableCell>{stat.quantity.toLocaleString()}</TableCell>
            <TableCell>{stat.usdAmount.toLocaleString()} USD</TableCell>
            <TableCell>{stat.krwAmount.toLocaleString()} KRW</TableCell>
            <TableCell>
              {((stat.krwAmount / totalKRW) * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-semibold">
          <TableCell>총계</TableCell>
          <TableCell>-</TableCell>
          <TableCell>
            {Object.values(stats).reduce((sum, stat) => sum + stat.usdAmount, 0).toLocaleString()} USD
          </TableCell>
          <TableCell>{totalKRW.toLocaleString()} KRW</TableCell>
          <TableCell>100%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TickerStats;
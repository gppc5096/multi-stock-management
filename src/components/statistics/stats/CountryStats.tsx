import { StockEntry } from '@/store/stockSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CountryStatsProps {
  entries: StockEntry[];
}

const CountryStats = ({ entries }: CountryStatsProps) => {
  // 국가별 통계 계산
  const stats = entries.reduce((acc, entry) => {
    const country = entry.country;
    if (!acc[country]) {
      acc[country] = {
        krwTotal: 0,
        usdTotal: 0,
      };
    }
    
    if (country === 'KRW') {
      acc[country].krwTotal += entry.krwAmount;
    } else {
      acc[country].usdTotal += entry.usdAmount;
      acc[country].krwTotal += entry.krwAmount;
    }
    
    return acc;
  }, {} as Record<string, { krwTotal: number; usdTotal: number; }>);

  // 총 자산 계산
  const totalKRW = Object.values(stats).reduce((sum, stat) => sum + stat.krwTotal, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>국가</TableHead>
          <TableHead>USD 자산</TableHead>
          <TableHead>KRW 자산</TableHead>
          <TableHead>비중</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(stats).map(([country, stat]) => (
          <TableRow key={country}>
            <TableCell>{country}</TableCell>
            <TableCell>{stat.usdTotal.toLocaleString()} USD</TableCell>
            <TableCell>{stat.krwTotal.toLocaleString()} KRW</TableCell>
            <TableCell>
              {((stat.krwTotal / totalKRW) * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-semibold">
          <TableCell>총계</TableCell>
          <TableCell>
            {Object.values(stats).reduce((sum, stat) => sum + stat.usdTotal, 0).toLocaleString()} USD
          </TableCell>
          <TableCell>{totalKRW.toLocaleString()} KRW</TableCell>
          <TableCell>100%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CountryStats;
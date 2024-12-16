import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { deleteStockEntry, setEditingEntry } from '@/store/stockSlice';
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StockList = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.stock.entries);

  const handleDelete = (id: string) => {
    dispatch(deleteStockEntry(id));
    toast.success('항목이 삭제되었습니다.');
  };

  const handleEdit = (id: string) => {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
      dispatch(setEditingEntry(entry));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>거래일자</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>국가</TableHead>
            <TableHead>증권사</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead>티커명</TableHead>
            <TableHead>매수수량</TableHead>
            <TableHead>매수환율</TableHead>
            <TableHead>매수단가</TableHead>
            <TableHead>달러매수금</TableHead>
            <TableHead>원화매수금</TableHead>
            <TableHead className="text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.type}</TableCell>
              <TableCell>{entry.country}</TableCell>
              <TableCell>{entry.broker}</TableCell>
              <TableCell>{entry.stockName}</TableCell>
              <TableCell>{entry.ticker}</TableCell>
              <TableCell>{entry.quantity}</TableCell>
              <TableCell>{entry.exchangeRate.toLocaleString()}</TableCell>
              <TableCell>{entry.price.toLocaleString()}</TableCell>
              <TableCell>{entry.usdAmount.toLocaleString()}</TableCell>
              <TableCell>{entry.krwAmount.toLocaleString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(entry.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>항목 삭제</AlertDialogTitle>
                      <AlertDialogDescription>
                        이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockList;
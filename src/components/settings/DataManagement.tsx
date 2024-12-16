import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from "sonner";
import { updateEntireOptions } from '@/store/optionSlice';
import { addStockEntry, resetStockData } from '@/store/stockSlice';
import { StockEntry } from '@/store/stockSlice';
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

const DataManagement = () => {
  const dispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);
  const stockData = useSelector((state: RootState) => state.stock);

  const handleExportSettings = () => {
    const jsonString = JSON.stringify(options, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('설정이 JSON 파일로 저장되었습니다.');
  };

  const handleExportStockData = () => {
    const jsonString = JSON.stringify(stockData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stock_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('주식 데이터가 JSON 파일로 저장되었습니다.');
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        dispatch(updateEntireOptions(parsedData));
        toast.success('설정이 성공적으로 가져와졌습니다.');
      } catch (error) {
        toast.error('유효하지 않은 JSON 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleImportStockData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Clear existing entries and add new ones
        parsedData.entries.forEach((entry: StockEntry) => {
          dispatch(addStockEntry(entry));
        });
        
        toast.success('주식 데이터가 성공적으로 가져와졌습니다.');
      } catch (error) {
        toast.error('유효하지 않은 JSON 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    dispatch(resetStockData());
    toast.success('모든 주식 데이터가 초기화되었습니다.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">데이터 관리</h3>
        <div className="space-y-4">
          <Card className="border-[#676966] p-4 rounded-[5px]">
            <h4 className="font-medium mb-4">설정 데이터</h4>
            <div className="flex gap-2">
              <Button onClick={handleExportSettings} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  가져오기
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-[#676966] p-4 rounded-[5px]">
            <h4 className="font-medium mb-4">주식 데이터</h4>
            <div className="flex gap-2">
              <Button onClick={handleExportStockData} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportStockData}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  가져오기
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-[#676966] p-4 rounded-[5px]">
            <h4 className="font-medium mb-4">데이터 초기화</h4>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  데이터 초기화
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>데이터 초기화</AlertDialogTitle>
                  <AlertDialogDescription>
                    모든 주식 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                    계속하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetData}>
                    초기화
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;

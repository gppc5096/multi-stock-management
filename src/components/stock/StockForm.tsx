import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStockEntry, updateStockEntry, setEditingEntry } from '@/store/stockSlice';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { RootState } from '@/store/store';
import { format } from 'date-fns';
import { calculateAmounts } from '@/utils/stockCalculations';
import StockFormFields from './StockFormFields';

export interface FormData {
  date: string;
  type: string;
  country: string;
  broker: string;
  stockName: string;
  ticker: string;
  quantity: string;
  exchangeRate: string;
  price: string;
  usdAmount: string;
  krwAmount: string;
}

const StockForm = () => {
  const dispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);
  const editingEntry = useSelector((state: RootState) => state.stock.editingEntry);
  
  const [formData, setFormData] = useState<FormData>({
    date: format(new Date(), 'yyyy-MM-dd'),
    type: '',
    country: '',
    broker: '',
    stockName: '',
    ticker: '',
    quantity: '',
    exchangeRate: options.exchangeRate.toString(),
    price: '',
    usdAmount: '',
    krwAmount: '',
  });

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        date: editingEntry.date,
        type: editingEntry.type,
        country: editingEntry.country,
        broker: editingEntry.broker,
        stockName: editingEntry.stockName,
        ticker: editingEntry.ticker,
        quantity: editingEntry.quantity.toString(),
        exchangeRate: editingEntry.exchangeRate.toString(),
        price: editingEntry.price.toString(),
        usdAmount: editingEntry.usdAmount.toString(),
        krwAmount: editingEntry.krwAmount.toString(),
      });
    }
  }, [editingEntry]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (['quantity', 'price', 'exchangeRate', 'country'].includes(field)) {
        const quantity = parseFloat(newData.quantity) || 0;
        const price = parseFloat(newData.price) || 0;
        const exchangeRate = parseFloat(newData.exchangeRate) || 0;
        
        const { usdAmount, krwAmount } = calculateAmounts(
          newData.country,
          quantity,
          price,
          exchangeRate
        );
        
        return {
          ...newData,
          usdAmount: usdAmount.toFixed(2),
          krwAmount: krwAmount.toFixed(0)
        };
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields: (keyof FormData)[] = ['date', 'type', 'country', 'broker', 'stockName', 'ticker', 'quantity', 'price'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    const stockEntry = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      ...formData,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price),
      exchangeRate: parseFloat(formData.exchangeRate),
      usdAmount: parseFloat(formData.usdAmount),
      krwAmount: parseFloat(formData.krwAmount),
    };

    if (editingEntry) {
      dispatch(updateStockEntry(stockEntry));
      dispatch(setEditingEntry(null));
      toast.success('주식 정보가 수정되었습니다.');
    } else {
      dispatch(addStockEntry(stockEntry));
      toast.success('주식 정보가 저장되었습니다.');
    }

    setFormData(prev => ({
      ...prev,
      type: '',
      country: '',
      broker: '',
      stockName: '',
      ticker: '',
      quantity: '',
      price: '',
      usdAmount: '',
      krwAmount: '',
    }));
  };

  const handleStockSelect = (stockName: string) => {
    const stockItem = options.categories
      .find(cat => cat.id === 'stocks')
      ?.items.find(item => item.value === stockName);
    
    const tickerItem = options.categories
      .find(cat => cat.id === 'tickers')
      ?.items.find(item => item.value === stockName);
    
    if (stockItem && tickerItem) {
      setFormData(prev => ({
        ...prev,
        stockName: stockItem.value,
        ticker: tickerItem.value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StockFormFields
        formData={formData}
        handleInputChange={handleInputChange}
        handleStockSelect={handleStockSelect}
      />
      <Button type="submit" className="w-full">
        {editingEntry ? '수정' : '저장'}
      </Button>
      {editingEntry && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            dispatch(setEditingEntry(null));
            setFormData(prev => ({
              ...prev,
              type: '',
              country: '',
              broker: '',
              stockName: '',
              ticker: '',
              quantity: '',
              price: '',
              usdAmount: '',
              krwAmount: '',
            }));
          }}
        >
          취소
        </Button>
      )}
    </form>
  );
};

export default StockForm;
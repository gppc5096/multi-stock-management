import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { FormData } from './StockForm';

interface StockFormFieldsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleStockSelect: (stockName: string) => void;
}

const StockFormFields = ({ 
  formData, 
  handleInputChange, 
  handleStockSelect 
}: StockFormFieldsProps) => {
  const options = useSelector((state: RootState) => state.options);

  const inputStyle = "rounded-[5px]";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="date">거래일자</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="type">구분</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleInputChange('type', value)}
        >
          <SelectTrigger className={inputStyle}>
            <SelectValue placeholder="구분 선택" />
          </SelectTrigger>
          <SelectContent className="bg-[#f7eed5]">
            {options.categories
              .find(cat => cat.id === 'transactionType')
              ?.items.map(item => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="country">국가</Label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleInputChange('country', value)}
        >
          <SelectTrigger className={inputStyle}>
            <SelectValue placeholder="국가 선택" />
          </SelectTrigger>
          <SelectContent className="bg-[#f7eed5]">
            {options.categories
              .find(cat => cat.id === 'currency')
              ?.items.map(item => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="broker">증권사</Label>
        <Select
          value={formData.broker}
          onValueChange={(value) => handleInputChange('broker', value)}
        >
          <SelectTrigger className={inputStyle}>
            <SelectValue placeholder="증권사 선택" />
          </SelectTrigger>
          <SelectContent className="bg-[#f7eed5]">
            {options.categories
              .find(cat => cat.id === 'broker')
              ?.items.map(item => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="stockName">종목명</Label>
        <Select
          value={formData.stockName}
          onValueChange={handleStockSelect}
        >
          <SelectTrigger className={inputStyle}>
            <SelectValue placeholder="종목 선택" />
          </SelectTrigger>
          <SelectContent className="bg-[#f7eed5]">
            {options.categories
              .find(cat => cat.id === 'stocks')
              ?.items.map(item => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="ticker">티커명</Label>
        <Input
          id="ticker"
          value={formData.ticker}
          readOnly
          className={`bg-muted ${inputStyle}`}
        />
      </div>

      <div>
        <Label htmlFor="quantity">매수수량</Label>
        <Input
          id="quantity"
          type="text"
          value={formData.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, '');
            if (/^\d*$/.test(value)) {
              handleInputChange('quantity', value);
            }
          }}
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="exchangeRate">매수환율</Label>
        <Input
          id="exchangeRate"
          type="text"
          value={formData.exchangeRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, '');
            if (/^\d*$/.test(value)) {
              handleInputChange('exchangeRate', value);
            }
          }}
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="price">매수단가</Label>
        <Input
          id="price"
          type="text"
          value={formData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, '');
            if (/^\d*$/.test(value)) {
              handleInputChange('price', value);
            }
          }}
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="usdAmount">달러매수금</Label>
        <Input
          id="usdAmount"
          value={formData.usdAmount}
          readOnly
          className={`bg-muted ${inputStyle}`}
        />
      </div>

      <div>
        <Label htmlFor="krwAmount">원화매수금</Label>
        <Input
          id="krwAmount"
          value={formData.krwAmount}
          readOnly
          className={`bg-muted ${inputStyle}`}
        />
      </div>
    </div>
  );
};

export default StockFormFields;
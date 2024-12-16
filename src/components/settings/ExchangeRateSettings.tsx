import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface ExchangeRateSettingsProps {
  exchangeRate: number;
  onExchangeRateChange: (value: string) => void;
}

const ExchangeRateSettings = ({ 
  exchangeRate, 
  onExchangeRateChange 
}: ExchangeRateSettingsProps) => {
  // 천단위 구분 포맷팅 함수
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 입력값 처리 함수
  const handleInputChange = (value: string) => {
    // 콤마 제거
    const numericValue = value.replace(/,/g, '');
    
    // 숫자가 아닌 문자 제거
    const cleanedValue = numericValue.replace(/[^\d]/g, '');
    
    // 빈 문자열이거나 0보다 작은 경우 '0' 반환
    if (!cleanedValue || Number(cleanedValue) < 0) {
      onExchangeRateChange('0');
      return;
    }
    
    // 5000 초과인 경우 5000으로 제한
    if (Number(cleanedValue) > 5000) {
      onExchangeRateChange('5000');
      return;
    }
    
    onExchangeRateChange(cleanedValue);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">환율 설정</h3>
      <Card className="p-4 border-[#676966] rounded-[5px]">
        <div className="space-y-2">
          <Label htmlFor="exchangeRate">현재 환율 (USD/KRW)</Label>
          <Input
            id="exchangeRate"
            type="text"
            value={formatNumber(exchangeRate)}
            onChange={(e) => handleInputChange(e.target.value)}
            className="max-w-[200px]"
            min="0"
            max="5000"
          />
          <p className="text-sm text-gray-500">
            허용 범위: 0 ~ 5,000
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ExchangeRateSettings;
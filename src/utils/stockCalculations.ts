export const calculateAmounts = (
  country: string,
  quantity: number,
  price: number,
  exchangeRate: number
) => {
  const usdAmount = quantity * price;
  
  if (country === 'USD') {
    return {
      usdAmount,
      krwAmount: usdAmount * exchangeRate
    };
  } else if (country === 'KRW') {
    return {
      usdAmount: 0,
      krwAmount: quantity * price
    };
  }
  
  return {
    usdAmount: 0,
    krwAmount: 0
  };
};
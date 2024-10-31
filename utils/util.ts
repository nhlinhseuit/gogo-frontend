export const formatCurrency = ({ price }: { price: number }) => {
    if (price === 0) return `0`;

    const absPrice = Math.abs(price);
    let formattedPrice;

    if (absPrice < 1000) {
      formattedPrice = `${price}`;
    } else if (absPrice < 1000000) {
      const value = price / 1000;
      formattedPrice = `${Number.isInteger(value) ? value : value.toFixed(2)}K`;
    } else{
      const value = price / 1000000;
      formattedPrice = `${Number.isInteger(value) ? value : value.toFixed(2)}M`;
    }

    return formattedPrice;
  };
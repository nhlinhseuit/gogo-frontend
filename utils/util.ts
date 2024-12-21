export const isDateValid = (selectedDate: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
};

export const formatDayApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// export const formatStartDayToISO = (date: Date): string => {
//   date.setHours(0, 0, 0, 0);
//   return date.toISOString();
// };
// export const formatEndDayToISO = (date: Date): string => {
//   date.setHours(23, 59, 0, 0);
//   return date.toISOString();
// };

export const normalizeSearchItem = (term: string | number) => {
  const lowerCaseTerm = term.toString().trim().toLowerCase();
  // Chuyển đổi ký tự có dấu thành không dấu
  const normalizedTerm = lowerCaseTerm
    .normalize("NFD") // Phân tách các ký tự có dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d") // Thay thế "đ" thành "d"
    .replace(/Đ/g, "D"); // Thay thế "Đ" thành "D"

  // Giữ lại khoảng trắng và ký tự chữ và số
  return normalizedTerm.replace(/[^a-z0-9\s]/g, "");
};

export const formatCurrency = ({ price }: { price: number }) => {
  if (price === 0) return `0`;

  const absPrice = Math.abs(price);
  let formattedPrice;

  if (absPrice < 1000) {
    formattedPrice = `${price}`;
  } else if (absPrice < 1000000) {
    const value = price / 1000;
    formattedPrice = `${Number.isInteger(value) ? value : value.toFixed(2)}K`;
  } else {
    const value = price / 1000000;
    formattedPrice = `${Number.isInteger(value) ? value : value.toFixed(2)}M`;
  }

  return formattedPrice;
};

import { ReadonlyURLSearchParams } from "next/navigation";

export const convertDataNavigate = (params: any) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        return [key, JSON.stringify(value)]; // Chuyển thành chuỗi JSON
      }
      return [key, String(value)]; // Đảm bảo mọi giá trị là chuỗi
    })
  );
};

export const convertDataReceive = (searchParams: ReadonlyURLSearchParams) => {
  return Object.fromEntries(
    Array.from(searchParams.entries()).map(([key, value]) => {
      try {
        return [key, JSON.parse(value)];
      } catch {
        return [key, value]; // Trả về giá trị ban đầu nếu không phải JSON
      }
    })
  );
};

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

export const parseDayFromApi = (dateString: string): Date | undefined => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Kiểm tra định dạng "yyyy-MM-dd"
  
  if (!dateRegex.test(dateString)) {
    return undefined; // Chuỗi không hợp lệ
  }
  
  const [year, month, day] = dateString.split("-").map(Number);

  // Tạo đối tượng Date (chú ý month - 1 vì tháng trong JS bắt đầu từ 0)
  const parsedDate = new Date(year, month - 1, day);

  // Kiểm tra tính hợp lệ của ngày (JS tự động sửa ngày không hợp lệ, cần kiểm tra lại)
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return undefined; // Ngày không hợp lệ
  }

  return parsedDate;
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

import { ReadonlyURLSearchParams } from "next/navigation";

export const defaultSearchFlightParams = (
  locationName: string,
  locationId: string
) => {
  return {
    roundTrip: false,
    departure_location: "Hồ Chí Minh",
    departure_location_id: 2,
    arrival_location: locationName,
    arrival_location_id: locationId,
    departure_time_from: formatDayFromInputToISODateApi(new Date()).startTime,
    departure_time_to: formatDayFromInputToISODateApi(new Date()).endTime,
    return_time_from: "",
    return_time_to: "",
    seat_classes: ["FIRST_CLASS"],
    passenger_count: 1,
  };
};

export const defaultSearchStayParams = (
  locationName: string,
  locationId: string
) => {
  return {
    location_id: locationId,
    location: locationName,
    checkin_date: formatDayFromInputToNormalDateApi(new Date()),
    checkout_date: formatDayFromInputToNormalDateApi(new Date()),
    rooms: 1,
    guests: 1,
  };
};

const images = [
  "/assets/images/Turkey.svg",
  "/assets/images/Australia.svg",
  "/assets/images/Azerbaijan.svg",
  "/assets/images/Maldives.svg",
  "/assets/images/France.svg",
  "/assets/images/US.svg",
  "/assets/images/UK.svg",
  "/assets/images/Japan.svg",
  "/assets/images/UAE.svg",
];

export function getRandomImgUrl() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export const imagesBookComponent = [
  "/assets/images/Melbourne.svg",
  "/assets/images/Columbia.svg",
  "/assets/images/London.svg",
  "/assets/images/Paris.svg",
];

export const extractDateAndTime = (
  isoString: string
): { date: string; time: string } | undefined => {
  if (!isoString) return undefined;

  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // Kiểm tra định dạng ISO 8601
  if (!dateTimeRegex.test(isoString)) return undefined;

  try {
    const dateObj = new Date(isoString); // Tạo đối tượng Date từ chuỗi ISO 8601
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`, // Ngày theo định dạng yyyy-MM-dd
      time: `${hours}:${minutes}`, // Giờ theo định dạng HH:mm
    };
  } catch (error) {
    return undefined; // Trả về undefined nếu xảy ra lỗi
  }
};

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("currentUser")
      ? JSON.parse(sessionStorage.getItem("currentUser")!)
      : null;
  } else return null;
};
export const getToken = () => {
  try {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("authToken") || null;
    } else return null;
  } catch (e) {
    console.log("error", e);
  }
  try {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("authToken") || null;
    } else return null;
  } catch (e) {
    console.log("error", e);
  }
};

export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : "Invalid email format.";
};

export const validatePassword = (value: string) => {
  return value.length >= 6
    ? null
    : "Password must be at least 6 characters long.";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword
    ? null
    : "Confirm password is not correct.";
};

export const validatePhoneNumber = (value: string): string | null => {
  const phoneRegex = /^[0-9]{9,11}$/;

  if (!value) {
    return "Phone number is required.";
  }

  if (!phoneRegex.test(value)) {
    return "Invalid phone number.";
  }

  return null;
};

export const getReviewComment = (rating: number) => {
  if (rating >= 4) {
    return "Very good";
  } else if (rating < 4 && rating >= 3) {
    return "Good";
  } else {
    return "Average";
  }
};

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

//? KHI CHỌN GIÁ TRỊ TRONG FLIGHTSINPUT VÀ STAYSINPUT, CONVERT ĐỂ TRUYỀN ĐI PARAMS
export const formatDayFromInputToNormalDateApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const formatDayFromInputToISODateApi = (
  date: Date
): { startTime: string; endTime: string } => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  // (6h sáng)
  const startTime = `${year}-${month}-${day}T06:00:00Z`;

  // (10h tối)
  const endTime = `${year}-${month}-${day}T22:00:00Z`;

  return { startTime, endTime };
};

//? KHI NHẬN GIÁ TRỊ TỪ PARAMS, CONVERT ĐỂ HIỂN THỊ TRÊN FLIGHTSINPUT VÀ STAYSINPUT
export const parseNormalDateFromSearchParamsToDayOfInput = (
  dateString: string
): Date | undefined => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Kiểm tra định dạng "yyyy-MM-dd"

  if (!dateRegex.test(dateString)) {
    return undefined;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return undefined;
  }

  return parsedDate;
};
export const parseISODateFromSearchParamsToDayOfInput = (
  dateString: string
): Date | undefined => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // Kiểm tra định dạng "yyyy-MM-ddTHH:mm:ssZ"

  if (!isoDateRegex.test(dateString)) {
    return undefined;
  }

  const parsedDate = new Date(dateString);

  // Kiểm tra tính hợp lệ của đối tượng Date
  if (isNaN(parsedDate.getTime())) {
    return undefined;
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

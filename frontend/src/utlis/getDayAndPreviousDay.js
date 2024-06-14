import { formatDate } from "./formatDate";

export function getDayAndPreviousDay(day) {
  const dayPast = new Date();
  const dateAfter = new Date(dayPast.setDate(dayPast.getDate() - day));
  // Tính ra ngày cụ thể từ tổng số ngày trước đó (day người dùng nhập vào), query là tổng số ngày
  const today = new Date();
  const fullMonthAndDay = formatDate(today)
  return { dateAfter, today, fullMonthAndDay }
}


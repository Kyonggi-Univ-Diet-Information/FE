export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" }).format(date);
};

export const formatDatefromString = (date: string) => {
  const [year, month, day] = date.split(".");
  return `${year}년 ${month}월 ${day}일`;
};

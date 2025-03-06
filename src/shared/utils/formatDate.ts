export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" }).format(date);
};

export const formatDatefromString = (date: string) => {
  // eslint-disable-next-line prefer-const
  let [year, month, day] = date.split(".");
  if (month[0] === "0") month = month.slice(1);
  if (day[0] === "0") day = day.slice(1);

  return `${year}년 ${month}월 ${day}일`;
};

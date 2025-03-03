export const formatDate = (date) => {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" }).format(date);
};

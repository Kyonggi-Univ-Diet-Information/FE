export const formatDate = (date: Date, language: "ko" | "en" = "ko") => {
  const locale = language === "en" ? "en-US" : "ko-KR";
  return new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(date);
};

export const formatDatefromString = (
  date: string,
  language: "ko" | "en" = "ko",
) => {
  // eslint-disable-next-line prefer-const
  let [year, month, day] = date.split(".");
  if (month[0] === "0") month = month.slice(1);
  if (day[0] === "0") day = day.slice(1);

  if (language === "en") {
    return `${month}/${day}/${year}`;
  }
  return `${year}년 ${month}월 ${day}일`;
};

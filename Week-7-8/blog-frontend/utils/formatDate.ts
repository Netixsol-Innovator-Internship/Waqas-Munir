export const formatDate = (date: Date) => {
  const formattedDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
  }).format(formattedDate);
};

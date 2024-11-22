export default function DateComponent() {
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[today.getDay()];
  let month = months[today.getMonth()];

  return (
    <div className=" max-xs:text-center max-xs:w-full">
      <h1 className="text-gray-600 sm:text-2xl text-xl">
        {day}, {today.getDate()}
      </h1>
      <p className="text-gray-400">{month}</p>
    </div>
  );
}

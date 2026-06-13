import { useState } from "react";

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

type DPickerProps ={
  status: Date | null;
  setter: React.Dispatch<React.SetStateAction<Date | null>>;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function DPicker({status, setter}: DPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8, 1));

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();

    const days: CalendarDay[] = [];

    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthLastDate - i;

      days.push({
        date: new Date(year, month - 1, day),
        day,
        isCurrentMonth: false,
      });
    }

    const currentMonthLastDate = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= currentMonthLastDate; day++) {
      days.push({
        date: new Date(year, month, day),
        day,
        isCurrentMonth: true,
      });
    }

    const nextMonthDays = 42 - days.length;

    for (let day = 1; day <= nextMonthDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        day,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatSelectedDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  };

  const handleSelectDate = (date: Date) => {
    setter(date);
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setIsOpen(false);
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="relative w-85">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 w-full flex pl-11 items-center rounded-lg ${
          isOpen
            ? "border-2 border-blue-500 bg-white"
            : "border border-gray-300 bg-gray-100"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>


        <span className={status ? "text-gray-900" : "text-gray-400"}>
          {status ? formatSelectedDate(status) : "Select Date"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute w-full z-50 rounded-lg bg-white px-8 py-7 shadow-2xl">
          <div className="mb-7 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="text-4xl leading-none text-gray-300 hover:text-gray-500"
            >
              ‹
            </button>

            <h2 className="text-xl font-bold text-slate-900">
              {formatMonth(currentMonth)}
            </h2>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-md text-4xl leading-none text-gray-300 hover:text-gray-500"
            >
              ›
            </button>
          </div>

          <div className="mb-5 grid grid-cols-7 text-center">
            {weekDays.map((day) => (
              <div key={day} className="text-lg font-bold text-slate-900">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center">
            {calendarDays.map((item) => {
              const isSelected =
                status !== null && isSameDate(item.date, status);

              const past = isPastDate(item.date);

              return (
                <button
                  key={item.date.toISOString()}
                  type="button"
                  onClick={() => handleSelectDate(item.date)}
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-lg text-lg transition ${
                    isSelected
                      ? "bg-blue-100 font-bold text-slate-800"
                      : past || !item.isCurrentMonth
                      ? "text-gray-300 hover:bg-blue-50"
                      : "text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DPicker;
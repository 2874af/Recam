import { useState } from "react";

type TimeOption = {
  label: string;
  value: number;
};

type TPickerProps = {
  status: string;
  setter: React.Dispatch<React.SetStateAction<string>>
}

const timeOptions: TimeOption[] = [
  { label: "9:00 AM", value: 9 * 60 },
  { label: "9:15 AM", value: 9 * 60 + 15 },
  { label: "9:30 AM", value: 9 * 60 + 30 },
  { label: "9:45 AM", value: 9 * 60 + 45 },
  { label: "10:00 AM", value: 10 * 60 },
  { label: "10:15 AM", value: 10 * 60 + 15 },
  { label: "10:30 AM", value: 10 * 60 + 30 },
  { label: "10:45 AM", value: 10 * 60 + 45 },
  { label: "11:00 AM", value: 11 * 60 },
  { label: "11:15 AM", value: 11 * 60 + 15 },
  { label: "11:30 AM", value: 11 * 60 + 30 },
  { label: "11:45 AM", value: 11 * 60 + 45 },
  { label: "12:00 PM", value: 12 * 60 },
];

function TPicker({status, setter}:TPickerProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState<TimeOption>(timeOptions[0]);
  const [endTime, setEndTime] = useState<TimeOption | null>(null);

  const canConfirm = startTime && endTime && endTime.value > startTime.value;

  const handleConfirm = () => {
    if (!canConfirm || !endTime) return;

    setter(`${startTime.label}-${endTime.label}`);
    setOpen(false);
  };

  return (
    <div className="relative w-110 flex ml-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-12 w-full items-center rounded-lg border ml-auto text-left pl-11 ${
          open ? "border-2 border-blue-500 bg-white" : "border border-gray-300 bg-gray-100"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute text-gray-500 left-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <span className={status ? "text-gray-900" : "text-gray-400"}>
          {status || "Select Time"}
        </span>
      </button>

      {open && (
        <div className="absolute top-16 z-50 w-full rounded-lg bg-white p-14 shadow-xl">
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <label className="pl-1 text-sm font-semibold text-slate-900">
                Start time
              </label>

              <select
                value={startTime.value}
                onChange={(e) => {
                  const selected = timeOptions.find(
                    (time) => time.value === Number(e.target.value)
                  );

                  if (!selected) return;

                  setStartTime(selected);

                  if (endTime && endTime.value <= selected.value) {
                    setEndTime(null);
                  }
                }}
                className="h-10 w-36 rounded-md bg-gray-100 px-3 text-sm text-gray-600 outline-none focus:border focus:border-sky-400"
              >
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="pl-1 text-sm font-semibold text-slate-900">
                End time
              </label>

              <select
                value={endTime?.value ?? ""}
                onChange={(e) => {
                  const selected = timeOptions.find(
                    (time) => time.value === Number(e.target.value)
                  );

                  if (selected) {
                    setEndTime(selected);
                  }
                }}
                className="h-10 w-36 rounded-md bg-gray-100 px-3 text-sm text-gray-600 outline-none focus:border focus:border-sky-400"
              >
                <option value="">9:00 AM</option>

                {timeOptions.map((time) => (
                  <option
                    key={time.value}
                    value={time.value}
                    disabled={time.value <= startTime.value}
                  >
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
            className={`mx-auto mt-14 block h-12 w-40 rounded-md font-semibold text-white ${
              canConfirm
                ? "bg-sky-500 hover:bg-sky-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default TPicker;
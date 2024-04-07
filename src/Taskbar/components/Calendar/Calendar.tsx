import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from './Calendar.module.scss'

export default function Calendar() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <div className={styles.calendar_container}>
        <DateCalendar readOnly />
        </div>
      </LocalizationProvider>
    </>
  );
}

import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from './Calendar.module.scss'
import { useTheme } from "../../../contexts/ThemeContext";
import Lockscreen from "../../../Desktop/components/Lockscreen/Lockscreen";
import { ThemeProvider, createTheme } from "@mui/material";
import DateTime from "./DateTime/DateTime";
import Weather from "./Weather/Weather";
import { BrowserView } from "react-device-detect";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function Calendar() {
  const [theme] = useTheme();
  return (
    <>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <div className={styles.calendar_container + " " + styles[theme]}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DateTime/> 
        <DateCalendar readOnly />
        <BrowserView>
            <Weather/>
        </BrowserView>
      </LocalizationProvider>
        </div>
        </ThemeProvider>
    </>
  );
}

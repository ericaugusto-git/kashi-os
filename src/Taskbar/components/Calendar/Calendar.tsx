import { ThemeProvider, createTheme } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/pt-br';
import { BrowserView } from "react-device-detect";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from "./Calendar.module.scss";
import DateTime from "./DateTime/DateTime";
import Weather from "./Weather/Weather";
import { ptBR as coreptBR } from '@mui/material/locale';
import { useDesktopPosition } from "../../../contexts/DesktopPositonContext";
const darkTheme = createTheme(
{  
  palette: {
    mode: "dark",
  }
},
ptBR, // x-date-pickers translations
coreptBR, // core translations
);



export default function Calendar() {
  const [theme] = useTheme();
  const [position] = useDesktopPosition();
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div style={{[position]: '41px'}} className={styles.calendar_container + " " + styles[theme]}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
          >
            <DateTime />
            <DateCalendar readOnly/>
            <BrowserView>
              <Weather />
            </BrowserView>
          </LocalizationProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

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
const darkTheme = createTheme(
{  
  palette: {
    mode: "dark",
  }
},
ptBR, // x-date-pickers translations
coreptBR, // core translations
);

const lightTheme = createTheme({  
  palette: {
    mode: "light",
  }
},
  ptBR
);

export default function Calendar() {
  const [theme] = useTheme();
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <div className={styles.calendar_container + " " + styles[theme.value]}>
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

import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BrowserView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useDesktopPosition } from "../../../contexts/DesktopPositonContext";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from "./Calendar.module.scss";
import DateTime from "./DateTime/DateTime";
import Weather from "./Weather/Weather";


export default function Calendar() {
  const [theme] = useTheme();
  const [position] = useDesktopPosition();
  const {i18n} = useTranslation();
  return (
    <>
        <div style={{[position]: '41px'}} className={styles.calendar_container + " " + styles[theme]}>
            <DateTime />
            <ReactCalendar locale={i18n.resolvedLanguage?.toLocaleLowerCase()}/>
            <BrowserView>
              <Weather />
            </BrowserView>
        </div>
    </>
  );
}

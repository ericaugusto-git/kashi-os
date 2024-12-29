import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BrowserView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useDesktopPosition } from "../../../contexts/DesktopPositonContext";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from "./Calendar.module.scss";
import DateTime from "./DateTime/DateTime";
import Weather from "./Weather/Weather";
import { AnimatePresence, motion } from 'framer-motion';


export default function Calendar({calendarRef, isCalendarOpen}: {calendarRef: React.RefObject<HTMLDivElement>, isCalendarOpen: boolean}) {
  const [theme] = useTheme();
  const [position] = useDesktopPosition();
  const {i18n} = useTranslation();
  return (
    <>
      <AnimatePresence>
                { isCalendarOpen && <motion.div  style={{[position]: '41px'}} ref={calendarRef} className={styles.calendar_container + " " + styles[theme]}          initial={{ opacity: 0 }}
            animate={{opacity: 1 }}
            exit={{ overflow: "hidden", opacity: 0 }}
            transition={{ duration: 0.2 }}>

              <DateTime />
              <ReactCalendar locale={i18n.resolvedLanguage?.toLocaleLowerCase()}/>
              <BrowserView>
                <Weather />
              </BrowserView>
            </motion.div>}
        </AnimatePresence>
    </>
  );
}

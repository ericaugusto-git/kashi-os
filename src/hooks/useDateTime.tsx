import moment from "moment";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";



interface DateTime {
    date: string;
    hour: string;
}

function useDateTime(  date_format?: string, hour_format?: string): [DateTime, React.Dispatch<React.SetStateAction<DateTime>>] {
    // Set local timezone
    const {i18n} = useTranslation();
    
    const setCurrentTime = useCallback(() => {
        const now = moment();
        setDateTime({
            date: now.format(date_format),
            hour: now.format(hour_format)
        });
    }, [date_format, hour_format])

    useEffect(() => {
        moment.locale(i18n.resolvedLanguage?.toLocaleLowerCase());
        setCurrentTime();
    }, [i18n.resolvedLanguage, setCurrentTime]);
    date_format = date_format ?? 'LL';
    hour_format = hour_format ?? 'LT';
    const [dateTime, setDateTime] = useState<DateTime>({
        date: moment().format(date_format),
        hour: moment().format(hour_format)
    });


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime();
        }, 1000);
        return () => clearInterval(interval);
    }, [setCurrentTime]);
    return [dateTime, setDateTime];
}

export default useDateTime;
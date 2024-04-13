import moment from "moment";
import { useEffect, useState } from "react";

type DateTimeProps = {
    date_format?: string,
    hour_format?: string
};

interface DateTime {
    date: string;
    hour: string;
}

function useDateTime(  date_format?: string, hour_format?: string): [DateTime, React.Dispatch<React.SetStateAction<DateTime>>] {
    date_format = date_format ?? 'LL';
    hour_format = hour_format ?? 'LT';
    const [dateTime, setDateTime] = useState<DateTime>({
        date: moment().format(date_format),
        hour: moment().format(hour_format)
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            setDateTime({
                date: now.format(date_format),
                hour: now.format(hour_format)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return [dateTime, setDateTime];
}

export default useDateTime;
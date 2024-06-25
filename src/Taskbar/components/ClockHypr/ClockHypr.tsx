import moment from 'moment';
import 'moment/locale/pt-br'; // Import the pt-br locale
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import calendar from '../../../assets/taskbar/calendar.svg';
import clock from '../../../assets/taskbar/clock.svg';
import style from './ClockHypr.module.scss';

export default function ClockHypr() {
    const now = moment();
    const formattedTime = now.format('hh:mm A');
    // Format the date as "Sun 18"
    const formattedDate = now.format('ddd D');
    const [dateTime, setDateTime] = useState([formattedDate, formattedTime]);
    const {i18n} = useTranslation();

    useEffect(() => {
        // Set the locale to pt-br
        // Update the dateTime state every second
        const handleDateTime = () => {
            moment.locale(i18n.resolvedLanguage?.toLocaleLowerCase());
            const formattedTime = moment().format('hh:mm A');
            const formattedDate = moment().format('ddd D');
            setDateTime([formattedDate, formattedTime]);
        }
        handleDateTime();
        const intervalId = setInterval(() => {
            handleDateTime();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [i18n.resolvedLanguage, i18n]);




    return (
        <>
        <div className={`${style.date_time}`}>
            <div>
                <button className="svgMask taskbar_icon" style={{ maskImage: `url("${calendar}")` }}></button>
                {dateTime[0]}
            </div>
            <div>
                <button className="svgMask taskbar_icon" style={{ maskImage: `url("${clock}")` }}></button>
                {dateTime[1]}
            </div>
        </div>
        </>
    );
}

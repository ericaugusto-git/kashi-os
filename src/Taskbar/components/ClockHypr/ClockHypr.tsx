import useDateTime from '@/hooks/useDateTime';
import 'moment/dist/locale/pt-br';
import calendar from '../../../assets/taskbar/calendar.svg';
import clock from '../../../assets/taskbar/clock.svg';
import style from './ClockHypr.module.scss';

export default function ClockHypr() {

    const [dateTime] = useDateTime('ddd D','LT');

    return (
        <>
        <div className={`${style.date_time}`}>
            <div>
                <div className="svgMask taskbar_icon" style={{ maskImage: `url("${calendar}")` }}></div>
                {dateTime.date}
            </div>
            <div>
                <div className="svgMask taskbar_icon" style={{ maskImage: `url("${clock}")` }}></div>
                    {dateTime.hour}
            </div>
        </div>
        </>
    );
}

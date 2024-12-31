import { useTranslation } from 'react-i18next';
import styles from './WeatherError.module.scss';

function WeatherError({geoError, waitingGpsConsent}: {geoError: GeolocationPositionError | null, waitingGpsConsent: boolean}) {
  const { t } = useTranslation();
    const errorMsg =
    geoError?.code == 1 || waitingGpsConsent
      ? "weather_permission"
      : "weather_error";
    return ( 
        <div className={styles.error}>
        <div className={styles.sad_zeus + " " + "backgroundImage"}>
          <span className={styles.anime}>{t(errorMsg)}</span>
        </div>
      </div>
     );
}

export default WeatherError;
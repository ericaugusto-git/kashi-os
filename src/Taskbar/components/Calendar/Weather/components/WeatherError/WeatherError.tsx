import styles from './WeatherError.module.scss';

function WeatherError({geoError}: {geoError: GeolocationPositionError}) {
    const errorMsg =
    geoError?.code == 1
      ? "need location permission  to show weather info!"
      : "Could not get weather info. Sorry :(";
    return ( 
        <div className={styles.error}>
        <div className={styles.sad_zeus + " " + "backgroundImage"}>
          <span className={styles.anime}>{errorMsg}</span>
        </div>
      </div>
     );
}

export default WeatherError;
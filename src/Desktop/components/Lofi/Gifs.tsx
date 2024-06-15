import { gifs } from "./config";
import styles from './Gifs.module.scss';

export default function Gifs({gifsActive, setGifId, gifsRef}: {gifsActive: boolean, setGifId:React.Dispatch<React.SetStateAction<string>>, gifsRef: React.RefObject<HTMLDivElement>}) {
    return <div ref={gifsRef}  className={`${styles.gifs} ${gifsActive && styles.active}`}>
        {gifs.map((gif) => <div key={gif.id} onClick={() => setGifId(gif.id)} className={`backgroundImage ${styles.gif}`} style={{backgroundImage: `url("${gif.url}")`}}></div>)}
    </div>
}
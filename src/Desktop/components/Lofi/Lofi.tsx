import React, { useEffect, useRef, useState } from 'react';
import styles from './Lofi.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import LofiPlayer from './LofiPlayer';
import { gifs } from './config';
import Gifs from './Gifs';
import useComponentVisible from '../../../hooks/useComponentVisible';
import fullscreen from '../../../assets/playlist/fullscreen.svg'
import exit_fullscreen from '../../../assets/playlist/exit_fullscreen.svg'
import close from '../../../assets/playlist/close.svg'
import pomodoro from '../../../assets/playlist/pomodoro.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { usePcStatus } from '../../../contexts/PcStatusContext';


export default function Lofi() {
  const [theme] = useTheme();
  const [_,setPcStatus] = usePcStatus();



  const [gifUrl, setGifUrl] = useState("");
  const [gifId, setGifId] = useState(localStorage.getItem('gifId') ?? gifs[17].id);
  const gifsBtnRef = useRef<HTMLButtonElement>(null);
  const [giphyError, setGiphyError] = useState(false);
  const [gifsRef, gifsActive, setGifsActive] = useComponentVisible(false, gifsBtnRef);
  const handle = useFullScreenHandle();

  useEffect(() => {
    localStorage.setItem('gifId', gifId)
    const fetchGif = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/${gifId}?api_key=${
            import.meta.env.VITE_REACT_GIPHY_API_KEY
          }`
        );
        const data = await response.json();
        setGifUrl(data.data.images.original.url);
      } catch (error) {
        setGiphyError(true)
        console.error("Error fetching the GIF:", error);
      }
    };

    fetchGif();
  }, [gifId]);


  return (
    <FullScreen handle={handle}>
          {giphyError && <span className={styles.loading}>my giphy API key run out problably, just this pink is still good rigth :( ?</span>}
    <div style={{ '--background-image': `url("${gifUrl}")` } as React.CSSProperties} className={`${styles.lofi_wrapper} ${styles[theme]}`}>
    <Gifs gifsRef={gifsRef} gifsActive={gifsActive} setGifId={setGifId}/>
    <LofiPlayer gifsBtnRef={gifsBtnRef} setGifsActive={setGifsActive}/>
    <div className={styles.actions}>
      <button className={`backgoundImage ${styles.close}`} style={{backgroundImage: `url("${close}")`}} onClick={() => setPcStatus('on')}></button>
      <button className={`backgoundImage ${styles.pomodoro}`} style={{backgroundImage: `url("${pomodoro}")`}} onClick={() => setPcStatus('on')}></button>
      <button onClick={handle.active ? handle.exit : handle.enter} className={`backgoundImage ${styles.full}`}  style={{backgroundImage: `url("${handle.active ? exit_fullscreen : fullscreen}")`}}></button>
    </div>
    </div>
    </FullScreen>

  );
}6
import React, { useEffect, useRef, useState } from 'react';
import { FullScreenHandle } from 'react-full-screen';
import close from '@/assets/playlist//close.svg';
import exit_fullscreen from '@/assets/playlist//exit_fullscreen.svg';
import fullscreen from '@/assets/playlist//fullscreen.svg';
import { usePcStatus } from '../../../contexts/PcStatusContext';
import { useTheme } from '../../../contexts/ThemeContext';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { gifsId } from './config';
import Gifs from './Gifs';
import styles from './Lofi.module.scss';
import LofiPlayer from './LofiPlayer';
import { fetchGif } from '@/utils/utils';


export default function Lofi({screenHandle}: {screenHandle: FullScreenHandle}) {
  const [theme] = useTheme();
  const [_,setPcStatus] = usePcStatus();



  const [gifUrl, setGifUrl] = useState("");
  const [gifId, setGifId] = useState(localStorage.getItem('lastLofiGifId') ?? gifsId[3]);
  const gifsBtnRef = useRef<HTMLButtonElement>(null);
  const [giphyError, setGiphyError] = useState(false);
  const [gifsRef, gifsActive, setGifsActive] = useComponentVisible(false, gifsBtnRef);

  useEffect(() => {
    localStorage.setItem('lastLofiGifId', gifId)
    const fetchGif1 = async () => {
      try {
        // const response = await fetch(
        //   `https://api.giphy.com/v1/gifs/${gifId}?api_key=${
        //     import.meta.env.VITE_REACT_GIPHY_API_KEY
        //   }`
        // );
        // const data = await response.json();
        // setGifUrl(data.data.images.original.url);
        setGifUrl(await fetchGif(gifId));
      } catch (error) {
        setGiphyError(true)
        console.error("Error fetching the GIF:", error);
      }
    };

    fetchGif1();
  }, [gifId]);


  return (
    <>
          {giphyError && <span className={styles.loading}>my giphy API key run out problably, just this pink is still good rigth :( ?</span>}
    <div style={{ '--background-image': `url("${gifUrl}")` } as React.CSSProperties} className={`${styles.lofi_wrapper} ${styles[theme]}`}>
    <Gifs gifsRef={gifsRef} gifsActive={gifsActive} setGifId={setGifId}/>
    <LofiPlayer gifsBtnRef={gifsBtnRef} setGifsActive={setGifsActive}/>
    <img className={styles.giphy_attribution} src='Poweredby_100px-Black_VertLogo.png'></img>
    <div className={styles.actions}>
      <button className={`backgoundImage ${styles.close}`} style={{backgroundImage: `url("${close}")`}} onClick={() => setPcStatus('on')}></button>
      {/* <button className={`backgoundImage ${styles.pomodoro}`} style={{backgroundImage: `url("${pomodoro}")`}} onClick={() => setPcStatus('on')}></button> */}
      <button onClick={screenHandle.active ? screenHandle.exit : screenHandle.enter} className={`backgoundImage ${styles.full}`}  style={{backgroundImage: `url("${screenHandle.active ? exit_fullscreen : fullscreen}")`}}></button>
    </div>
    </div>
    </>
  );
}
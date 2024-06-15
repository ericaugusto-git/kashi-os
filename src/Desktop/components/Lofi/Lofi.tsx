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
import { FullScreen, useFullScreenHandle } from 'react-full-screen';


export default function Lofi() {
  const [theme] = useTheme();


  const [gifUrl, setGifUrl] = useState("");
  const [gifId, setGifId] = useState(localStorage.getItem('gifId') ?? gifs[17].id);
  const gifsBtnRef = useRef<HTMLButtonElement>(null)
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
        console.error("Error fetching the GIF:", error);
      }
    };

    fetchGif();
  }, [gifId]);


  return (
    <FullScreen handle={handle}>
          {/* <span className={styles.loading}>Loading gif... :)</span> */}
    <div style={{ '--background-image': `url("${gifUrl}")` } as React.CSSProperties} className={`${styles.lofi_wrapper} ${styles[theme]}`}>
    <Gifs gifsRef={gifsRef} gifsActive={gifsActive} setGifId={setGifId}/>
    <LofiPlayer gifsBtnRef={gifsBtnRef} setGifsActive={setGifsActive}/>
    <div className={styles.actions}>
      <button className={`svgMask ${styles.close}`} style={{maskImage: `url("${close}")`}}></button>
      <button onClick={handle.active ? handle.exit : handle.enter} className={`svgMask ${styles.full}`}  style={{maskImage: `url("${handle.active ? exit_fullscreen : fullscreen}")`}}></button>
    </div>
    </div>
    </FullScreen>

  );
}6
import { useRef, useState, useEffect } from "react";
import play from '../../../assets/playlist/play.svg'
import pause from '../../../assets/playlist/pause.svg'
import previous from '../../../assets/playlist/previous.svg'
import next from '../../../assets/playlist/next.svg'
import gifs from '../../../assets/playlist/gif.svg'
import styles from './LofiPlayer.module.scss'
import { playlist } from "./config";
type Player = YT.Player & {
    getVideoData: () => VideoData
}
type VideoData =  {
    title: string,
    author: string,
    url: string
}


export default function LofiPlayer({setGifsActive, gifsBtnRef}: {setGifsActive: React.Dispatch<React.SetStateAction<boolean >>,  gifsBtnRef: React.RefObject<HTMLButtonElement>}) {
    const playerRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<Player | null>(null);
    const [videoId, setVideoId] = useState('jfKfPfyJRdk');
    const [isPlaying, setIsPlaying] = useState(false)
    const local = localStorage.getItem('lofiVolume');
    const [volume, setVolume] = useState<number>(local != null ? +local : 50); // Initial volume set to 50%
    const [videoData, setVideoData] = useState<VideoData>();
    useEffect(() => {
      // Load the YouTube IFrame Player API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      console.log(volume)
      // Define the function for YouTube API to call when it's ready
      window.onYouTubeIframeAPIReady = () => {
        if (playerRef.current) {
          const newPlayer = new window.YT.Player(playerRef.current, {
            height: '50',
            width: '50',
            videoId: videoId,
            playerVars: {
              controls: 0,
              autoplay: 1,            
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerReady,
            },
          });
  
          setPlayer(newPlayer as Player);
      }
  };
  
  
  
  // Function called when the player is ready
  const onPlayerReady = (event: YT.PlayerEvent) => {
        setVideoData({...(event.target as Player).getVideoData(), url: event.target.getVideoUrl()})
        const playerState: YT.PlayerState = event.target.getPlayerState();
        setIsPlaying(() => playerState == 1);
        const local = localStorage.getItem('lofiVolume');
        const currentVolume = local != null ? +local : volume;
        console.log(currentVolume)
        event.target.setVolume(currentVolume); // Set the initial volume
      };
  
      // Cleanup function
      return () => {
        window.onYouTubeIframeAPIReady = undefined;
        if (playerRef.current) {
          playerRef.current.innerHTML = '';
        }
      };
    }, []);
  
    useEffect(() => {
      // console.log(player?.getVideoData());
    //   if(player){
    //     setVideoData(player.getVideoData());
    //     console.log(player);
    //     console.log(videoData)
    // }
    }, [player])
  
  
  
    const toggleIsPlaying = () => {
      isPlaying ? player?.pauseVideo() : player?.playVideo();
      setIsPlaying((prev) => !prev);
    }

    const toggleGifs = () => {
        setGifsActive((prev) => !prev);
    }
  
    const handleDirection = (direction: string) => {
      let newIndex: number = 0;
      const index = playlist.findIndex((id) => id == videoId);
      if (direction === 'next') {
        newIndex = (index + 1) % playlist.length;
      } else if (direction === 'prev') {
        newIndex = (index - 1 + playlist.length) % playlist.length;
      }
      setVideoId(() => playlist[newIndex]);
      player?.loadVideoById(playlist[newIndex]);
    };
  
  
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseInt(event.target.value, 10);
      setVolume(() =>{
        localStorage.setItem('lofiVolume', newVolume.toString());
        return newVolume;
        });
      if (player) {
        player.setVolume(newVolume);
      }
    };
    return <div className={styles.player}>
            <a href={videoData?.url} target='_blank' className={styles.video_wrapper}>
      <div ref={playerRef}></div>
      <div className={styles.video_info}>
        <span className={styles.title}>{videoData?.title}</span>
        <span className={styles.author}>{videoData?.author}</span>
      </div>
    </a>
      <div className={styles.actions}>
      <button className={`svgMask ${styles.icon}`} ref={gifsBtnRef} onClick={toggleGifs} style={{maskImage: `url("${gifs}")`}}></button>
      <button className={`svgMask ${styles.icon}`} style={{maskImage: `url("${!isPlaying ? play : pause}")`}} onClick={toggleIsPlaying}></button>
        <button className={`svgMask ${styles.icon}`} onClick={() => handleDirection('prev')} style={{maskImage: `url("${previous}")`}}></button>
        <button className={`svgMask ${styles.icon}`} onClick={() => handleDirection('next')} style={{maskImage: `url("${next}")`}}></button>
        <input className={styles.volume} type="range" min="0" max="100" value={volume} onChange={handleVolumeChange}/>
      </div>
    </div>
}
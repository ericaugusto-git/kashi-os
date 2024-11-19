import { FileProps, WindowType } from '@/constants/window';
import { useEffect, useRef, useState } from 'react';
import styles from './Audio.module.scss';
import mute from '@/assets/playlist//mute.svg';
import pause from '@/assets/playlist//pause.svg';
import play from '@/assets/playlist//play.svg';
import speaker from '@/assets/playlist//speaker.svg';
import { useTranslation } from 'react-i18next';

const formatDuration = (seconds: number | undefined): string => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

function Audio({filePath,getFileUrl, fileList, listFiles, folderPath = '/home/music'}: FileProps){ 
    const audioRef = useRef<HTMLAudioElement>(null); // Type assertion
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [systemMusics, setSystemMusics] = useState<WindowType[]>([]);
    const [selected, setSelected] = useState<WindowType | undefined>();
    const [playlistMode, setPlaylistMode] = useState(!filePath);
    const {t} = useTranslation();
    useEffect(() => {
      const getAudioFiles = async () => {
        if (!listFiles) return;
        const files = await listFiles(folderPath!);
        setSystemMusics(files?.filter(file => file.metadata?.duration) || []);
      }
      getAudioFiles();
    }, [folderPath, fileList, listFiles]);

        
    const selectMusic = (music: WindowType) => {
      setSelected(music)
  }


    
    useEffect(() => {
      const setCurrentMusic = async (music: WindowType) => {
        if (audioRef.current && getFileUrl && music) {
          const fileUrl = await getFileUrl(music.folderPath + '/' + music.app);
          if (audioRef.current) {
            audioRef.current.src = fileUrl;
            audioRef.current.play();
            setIsPlaying(true);
            setSelected(music);
          }
        }
      };
      setCurrentMusic(selected!);
    }, [getFileUrl, selected]);

    useEffect(() => {
      const setInitialMusic = () => {  
            const currentMusic = systemMusics.find(music => music.props?.filePath === filePath);
            if (currentMusic) {
                setSelected(currentMusic);
            }
        }
        setInitialMusic();
    }, [filePath, getFileUrl, systemMusics]);

    useEffect(() => {
      if (audioRef.current) {
        // Add event listeners for audio state changes
        const audio = audioRef.current;
        
        const handleEnded = () => setIsPlaying(false);
        const handleError = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('pause', handlePause);

        // Cleanup listeners on unmount
        return () => {
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('error', handleError);
          audio.removeEventListener('pause', handlePause);
        };
      }
    }, []);

    const togglePlay = () => {
        if (audioRef.current && selected) {
            if (isPlaying) {
              audioRef?.current.pause();
            } else {
              audioRef?.current.play();
            }
            setIsPlaying(!isPlaying);
        }
      };
      const toggleMute = () => {
        if (audioRef.current) {
          audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }
      };

      const nextMusic = () => {
        if (systemMusics.length && selected) {
            const currentIndex = systemMusics.findIndex(music => music.app === selected.app);
            const nextIndex = (currentIndex + 1) % systemMusics.length;
            setSelected(systemMusics[nextIndex]);
        }
    };
      
    const previousMusic = () => {
      if (audioRef.current?.currentTime && audioRef.current?.currentTime < 2.5 && audioRef.current?.currentTime > 1) {
        audioRef.current.currentTime = 0;
        return;
      }
        if (systemMusics.length && selected) {
            const currentIndex = systemMusics.findIndex(music => music.app === selected.app);
            const previousIndex = currentIndex === 0 ? systemMusics.length - 1 : currentIndex - 1;
            setSelected(systemMusics[previousIndex]);
        }
    };

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration);
        }
      };

      const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (audioRef.current) {
          const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * duration;
          audioRef.current.currentTime = seekTime;
        }
      };

    const togglePlaylistMode = () => {
      if(selected){
        setPlaylistMode(!playlistMode);
      }
  };

    return <div className={styles.playlist}>

{playlistMode ? (
            // Playlist view
            <div className={styles.musics}>
                {systemMusics.map((music, i) => (               
                <div key={i} onClick={() => selectMusic(music)} className={`${styles.music} ${selected?.app == music.app && styles.selected}`}>
                    <span className={styles.noWrap}>{music.app}</span>
                    <div className={styles.descricao}>
                    <span className={styles.noWrap}>{music.metadata?.artist || 'Unknown'}</span>
                    <span className={styles.duration}>{formatDuration(music.metadata?.duration)}</span>
                    </div>
                </div>
                ))}
            </div>
        ) : (
            // Single song view
            <div className={styles.singleView}>
                <div className={styles.albumArt}>
                    <div 
                        className={`backgroundImage ${styles.largeCover}`} 
                        style={{backgroundImage: `url(${selected?.thumbnail || 'music_icon.svg'})`}}
                    />
                    <div className={styles.songInfo}>
                        <h2>{selected?.app}</h2>
                        <p>{selected?.metadata?.artist}</p>
                    </div>
                </div>
            </div>
        )}
        
        <div className="audio-player">
        <audio ref={audioRef} style={{display: 'none'}}         onTimeUpdate={handleTimeUpdate} controls/>
    </div>
        <div className={styles.footer}>
        <div className={styles.progress_bar} onClick={handleSeek}>
          <div
            className={styles.progress_bar_fill}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>        
        <div className={styles.music_and_actions}>            
           { playlistMode ? <a  onClick={togglePlaylistMode} className={styles.current_music}>
              <div className={`backgroundImage ${styles.music_cover}`} style={{backgroundImage: `url(${selected?.thumbnail || 'music_icon.svg'})`}}></div>
                <div className={styles.desc}>
                    <span className={styles.titulo_desc}>{selected?.app}</span>
                    <span className={styles.subtitulo_desc}>{selected?.metadata?.artist}</span>
                </div>
            </a> : <a className={styles.playlist_mode_toggle} onClick={togglePlaylistMode}>
              <div className={styles.playlist_icon}></div>
              {t('in_this_folder')}
              </a>}
            <div className={styles.actions}>
                <button className={`svgMask ${styles.previous}`} onClick={previousMusic}></button>
                <button style={{maskImage: `url("${isPlaying ? pause : play}")`}}  onClick={togglePlay} className={`svgMask ${styles.pause_play}`}></button>
                <button className={`svgMask ${styles.next}`} onClick={nextMusic}></button>
            </div>
            <div className={styles.timeControls}>
                <span className={styles.timeDisplay}>
                    {formatDuration(currentTime)} / {formatDuration(duration)}
                </span>
                <button 
                    className={`svgMask ${styles.mute_speaker}`} 
                    style={{maskImage: `url("${isMuted ? mute : speaker}")`}} 
                    onClick={toggleMute}
                ></button>
            </div>
        </div>
        </div>
    </div>
} 


export default Audio;
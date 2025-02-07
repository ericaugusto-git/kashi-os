import { FileProps, AppType } from '@/constants/apps';
import { useEffect, useRef, useState } from 'react';
import styles from './Audio.module.scss';
import mute from '@/assets/playlist//mute.svg';
import pause from '@/assets/playlist//pause.svg';
import play from '@/assets/playlist//play.svg';
import speaker from '@/assets/playlist//speaker.svg';
import { useTranslation } from 'react-i18next';
import { audioMimeTypes } from '@/constants/mimeTypes';

const formatDuration = (seconds: number | undefined): string => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

function Audio({filePath,getFileUrl, fileList, listFiles, handleDrop, folderPath = '/home/music'}: FileProps){ 
    const audioRef = useRef<HTMLAudioElement>(null); // Type assertion
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [systemMusics, setSystemMusics] = useState<AppType[]>([]);
    const [selected, setSelected] = useState<AppType | undefined>();
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

        
    const selectMusic = (music: AppType) => {
      setSelected(music)
  }


    
    useEffect(() => {
      const setCurrentMusic = async (music: AppType) => {
        if (audioRef.current && getFileUrl && music) {
          const fileUrl = await getFileUrl(music.folderPath + '/' + music.name);
          if (audioRef.current && fileUrl) {
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
            const currentIndex = systemMusics.findIndex(music => music.name === selected.name);
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
            const currentIndex = systemMusics.findIndex(music => music.name === selected.name);
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

  const handleDropWrapper = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleDrop!(folderPath, event, Object.keys(audioMimeTypes));
  }


    return <div className={`${styles.playlist} backgroundTransition`} onDrop={handleDropWrapper} onDragOver={(e) => e.preventDefault()}>
{systemMusics?.length == 0 && <div className={styles.no_music}>
   {`${t('no_audio')} ${folderPath}, ${t('drag_drop')}`}
   <span className={`${styles.folderEmptyIcon} svgMask`} style={{maskImage: 'url("music_slash.svg")'}}></span>
</div>}
{playlistMode ? (
            // Playlist view
            <div className={styles.musics}>
                {systemMusics.map((music, i) => (               
                <div key={i} onClick={() => selectMusic(music)} className={`${styles.music} ${selected?.name == music.name && styles.selected}`}>
                    <span className={styles.noWrap}>{music.name}</span>
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
                        <h2>{selected?.name}</h2>
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
            className={`${styles.progress_bar_fill} backgroundTransition`}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>        
        <div className={styles.music_and_actions}>            
           { playlistMode ? <a style={{visibility: systemMusics.length == 0 ? 'hidden' : 'visible'}}  onClick={togglePlaylistMode} className={styles.current_music}>
              <div className={`backgroundImage ${styles.music_cover}`} style={{backgroundImage: `url(${selected?.thumbnail || 'music_icon.svg'})`}}></div>
                <div className={styles.desc}>
                    <span className={styles.titulo_desc}>{selected?.name}</span>
                    <span className={styles.subtitulo_desc}>{selected?.metadata?.artist}</span>
                </div>
            </a> : <a className={styles.playlist_mode_toggle} onClick={togglePlaylistMode}>
              <div className={styles.playlist_icon}></div>
              <span>

              {t('in_this_folder')}
              </span>
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
import { useRef, useState } from 'react';
import styles from './Playlist.module.scss'
import pause from '../../../assets/playlist/pause.svg'
import play from '../../../assets/playlist/play.svg'
import samba from '../../../assets/samba.png'
import mute from '../../../assets/playlist/mute.svg'
import speaker from '../../../assets/playlist/speaker.svg'
import yesterdays from '../../../assets/Yesterdays.mp3'

type Music = {
    nome: string;
    compositor: string;
    duration: string;
  };

function Playlist(){
    const audioRef = useRef<HTMLAudioElement>(null); // Type assertion
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
    if (audioRef.current) {
        if (isPlaying) {
          audioRef?.current.pause();
        } else {
          audioRef?.current.play();
        }
    }
        setIsPlaying(!isPlaying);
      };
      const toggleMute = () => {
        if (audioRef.current) {
          audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }
      };

      const previousMusic = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
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
    
    const musics: Music[] = [{nome: "Samba Triste", compositor: "Baden Powel", duration: "2:38"}, 
    {nome: "Yesterdays", compositor: "Luíz Bonfá", duration: "3:28"},
    {nome: "Chaconne, Partita No. 2 BWV 1004", compositor: "Johann Sebastian Bach | Hilary Hahn", duration: "17:49"}];

    const [selected, setSelected] = useState(musics[0]);

    const selectMusic = (music: Music) => {
        setSelected(music)
    }

    return <div className={styles.playlistContainer}>
    <div className={styles.cables + ' backgroundImage'} ></div>
    <div className={styles.playlist}>
        <div className={styles.musics}>
            {musics.map((music, i) => (               
            <div key={i} onClick={() => selectMusic(music)} className={`${styles.music} ${selected.nome == music.nome && styles.selected}`}>
                <span className={styles.noWrap}>{music.nome}</span>
                <div className={styles.descricao}>
                <span className={styles.noWrap}>{music.compositor}</span>
                <span className={styles.duration}>{music.duration}</span>
                </div>
            </div>
            ))}
        </div>
        <div className="audio-player">
        <audio ref={audioRef} src={yesterdays} style={{display: 'none'}}         onTimeUpdate={handleTimeUpdate} controls/>
    </div>
        <div className={styles.footer}>
        <div className={styles.progress_bar} onClick={handleSeek}>
          <div
            className={styles.progress_bar_fill}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>        
        <div className={styles.music_and_actions}>            
            <div className={styles.current_music}>
                <img src={samba}></img>
                <div className={styles.desc}>
                    <span className={styles.titulo_desc}>{selected.nome}</span>
                    <span className={styles.subtitulo_desc}>{selected.compositor}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={`svgMask ${styles.previous}`} onClick={previousMusic}></button>
                <button style={{maskImage: `url("${isPlaying ? pause : play}")`}}  onClick={togglePlay} className={`svgMask ${styles.pause_play}`}></button>
                <button className={`svgMask ${styles.next}`}></button>
            </div>
            <button className={`svgMask ${styles.mute_speaker}`} style={{maskImage: `url("${isMuted ? mute : speaker}")`}} onClick={toggleMute}></button>
        </div>
        </div>
    </div>
</div> 
}

export default Playlist;
import { fetchGif } from '@/utils/utils';
import styles from './Playlist.module.scss';
import { useEffect, useState } from 'react';
function Playlist(){
    const [gif, setGif] = useState();
    useEffect(() => {
        fetchGif('KXECBV0GkdCX6').then(gifUrl => setGif(gifUrl))
    }, []);
    return <div className={styles.playlistContainer}>
    <a href={gif} target='_blank' className={styles.cables + ' backgroundImage'} style={{backgroundImage: `url("${gif}")`}}>
        <img src="Poweredby_100px-Black_VertLogo.png"></img>
    </a>
    <div style={{ left: 0, width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(181deg, rgb(31 31 31) 0%, rgb(18 18 18) 100%)' }}>
    <iframe style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }} src="https://open.spotify.com/embed/playlist/6RnqgQq6cGcQM49nNxdcCN?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
</div> 
}

export default Playlist;
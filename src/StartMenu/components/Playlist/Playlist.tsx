import styles from './Playlist.module.scss';
function Playlist(){

    return <div className={styles.playlistContainer}>
    <div className={styles.cables + ' backgroundImage'} ></div>
    <div style={{ left: 0, width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(181deg, rgb(31 31 31) 0%, rgb(18 18 18) 100%)' }}>
    <iframe style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }} src="https://open.spotify.com/embed/playlist/6RnqgQq6cGcQM49nNxdcCN?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
</div> 
}

export default Playlist;
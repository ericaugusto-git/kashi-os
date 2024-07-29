import { useState, useEffect } from 'react';
import { fetchGif } from '../../../utils/utils';
import { gifs } from './config';
import styles from './Gifs.module.scss';

export default function Gifs({ gifsActive, setGifId, gifsRef }: { gifsActive: boolean, setGifId: React.Dispatch<React.SetStateAction<string>>, gifsRef: React.RefObject<HTMLDivElement> }) {
    const [gifUrls, setGifUrls] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchGifUrls = async () => {
            const urls: { [key: string]: string } = {};
            for (const gif of gifs) {
                const url = await fetchGif(gif.id);
                urls[gif.id] = url;
            }
            setGifUrls(urls);
        };

        fetchGifUrls();
    }, [gifs]);

    return (
        <div ref={gifsRef} className={`${styles.gifs} ${gifsActive && styles.active}`}>
            {gifs.map((gif) => (
                <div 
                    key={gif.id} 
                    onClick={() => setGifId(gif.id)} 
                    className={`backgroundImage ${styles.gif}`} 
                    style={{ backgroundImage: `url("${gifUrls[gif.id] || ''}")` }}
                ></div>
            ))}
        </div>
    );
}

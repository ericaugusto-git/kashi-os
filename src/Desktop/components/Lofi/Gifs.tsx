import { useEffect, useState } from 'react';
import { gifsId } from './config';
import styles from './Gifs.module.scss';

type Giphys = {
    id: string,
    url: string;
}

export default function Gifs({ gifsActive, setGifId, gifsRef }: { gifsActive: boolean, setGifId: React.Dispatch<React.SetStateAction<string>>, gifsRef: React.RefObject<HTMLDivElement> }) {
    // const [gifUrls, setGifUrls] = useState<{ [key: string]: string }>({});
    const [giphys, setGiphys] = useState<Giphys[]>();
    // useEffect(() => {
    //     const fetchGifUrls = async () => {
    //         const urls: { [key: string]: string } = {};
    //         for (const gif of gifs) {
    //             const url = await fetchGif(gif.id);
    //             urls[gif.id] = url;
    //         }
    //         setGifUrls(urls);
    //     };

    //     fetchGifUrls();
    // }, [gifs]);
    useEffect(() => {
        const url = `https://api.giphy.com/v1/gifs?api_key=${import.meta.env.VITE_REACT_GIPHY_API_KEY}&ids=${gifsId.join(',')}`;
        const fetchGifs = async () => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                
                //@ts-expect-error dont wanna create type for giphy response
                const gifs = data.data.map((a) => {return {id: a.id , url: a.images.original.url}});
                setGiphys(gifs);
                
            })
            .catch(error => console.error('Error fetching GIFs:', error));
        }
        fetchGifs();
    }, [])

    return (
        <div ref={gifsRef} className={`${styles.gifs} ${gifsActive && styles.active}`}>
            {giphys && giphys.map((gif) => (
                <div 
                    key={gif.id} 
                    onClick={() => setGifId(gif.id)} 
                    className={`backgroundImage ${styles.gif}`} 
                    style={{ backgroundImage: `url("${gif.url || ''}")` }}
                ></div>
            ))}
        </div>
    );
}

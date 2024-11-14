import { FileProps } from '@/constants/window';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { useEffect, useState } from 'react';
import 'video-react/dist/video-react.css';

export function Video({filePath, getFileUrl}: FileProps)  {
    const [videoUrl, setVideoUrl] = useState<string>();
    useEffect(() => {
        const getVideoUrl = async () => {
            if(getFileUrl && filePath){
                const videoUrl = await getFileUrl(filePath);
                setVideoUrl(videoUrl);
            }
        }
        getVideoUrl();
    }, [filePath, getFileUrl]);

    if (!videoUrl) return <>loading...</>;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <MediaPlayer style={{ width: '100%', height: '100%' }}>
                <MediaProvider>
                    <source src={videoUrl} type="video/mp4" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
        </div>
    );
}
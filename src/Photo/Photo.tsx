import { FileProps } from "@/constants/apps";
import { useEffect, useState } from "react";
import style from './Photo.module.scss';

export default function Photo ({filePath, getFileUrl}: FileProps) {
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    useEffect(() => {
        if(filePath && getFileUrl){
            getFileUrl(filePath).then(setImgUrl);
        }
    }, [filePath, getFileUrl])

    return <div className={style.photo} style={{'backgroundImage': `url('${imgUrl}')`, width: '100%', height: '100%', backgroundSize: 'contain', backgroundPosition: 'center'}}></div>
}
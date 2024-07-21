import { useState } from "react";
import { WindowType } from "../../../constants/window";
import styles from './WindowContent.module.scss';

export default function WindowContent({window, closeRefCurrent, index}: {window: WindowType, closeRefCurrent: (HTMLButtonElement | null)[], index: number}){
    const [loading, setLoading] = useState(!!window.link);
    return <>
    {loading && <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>}
        {window.link ? <iframe src={window.link} onLoad={() => setLoading(false)} width="100%" height="100%"></iframe> : window.conteudo && <window.conteudo closeBtnRefs={closeRefCurrent} closeRefIndex={index} />}
    </> 
}
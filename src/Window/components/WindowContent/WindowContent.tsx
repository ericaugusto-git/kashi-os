import { useState } from "react";
import { WindowType } from "../../../constants/window";
import styles from './WindowContent.module.scss';
import { ErrorBoundary } from "react-error-boundary";
import { useFileSystem } from "@/contexts/FileSystemContext";

export default function WindowContent({window, closeRefCurrent, index}: {window: WindowType, closeRefCurrent: (HTMLButtonElement | null)[], index: number}){
    const [loading, setLoading] = useState(!!window.link);
    const {getFileUrl, updateFile, fileList, listFiles} = useFileSystem();
    const Component = window.conteudo;
    const props = window.props || {}
    return <>
    {loading && <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>}
        {window.link ? <iframe src={window.link} onLoad={() => setLoading(false)} width="100%" height="100%"></iframe> : 
        Component && <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Component closeBtnRefs={closeRefCurrent} folderPath={window.folderPath} {...props} getFileUrl={getFileUrl} updateFile={updateFile} closeRefIndex={index} fileList={fileList!} listFiles={listFiles} />
        </ErrorBoundary>}
    </> 
}


function ErrorFallback({ error }: {error: Error}) {
    console.error(error);
    return <div>Something went wrong while loading the content. sorry :(</div>;
  }
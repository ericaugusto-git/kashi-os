import { useFileSystem } from "@/contexts/FileSystemContext";
import { loadComponent } from "@/utils/componentLoader";
import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { WindowType } from "../../../constants/window";
import styles from './WindowContent.module.scss';

export default function WindowContent({window, closeRefCurrent, index}: {window: WindowType, closeRefCurrent: (HTMLButtonElement | null)[], index: number}){
    const [loading, setLoading] = useState(!!window.link);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const [Component, setComponent] = useState<any>(null);
    const LoadedComponent = useMemo(() => window.componentPath ? loadComponent(window.componentPath!) : null, [window.componentPath]);
    // useEffect(() => {
    //     if (window.componentPath) {
    //         try {
    //             setComponent(() => LoadedComponent);
    //         } catch (error) {
    //             console.error('Error loading component:', error);
    //         }
    //     }
    // }, [window.componentPath]);
    const {getFileUrl, updateFile, fileList, listFiles} = useFileSystem();
    const props = window.props || {}

    return <>
    {loading && <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>}
        {window.link ? <iframe src={window.link} onLoad={() => setLoading(false)} width="100%" height="100%"></iframe> : 
        LoadedComponent && <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>Loading...</div>}>
                <LoadedComponent closeBtnRefs={closeRefCurrent} folderPath={window.folderPath} getFileUrl={getFileUrl} updateFile={updateFile} closeRefIndex={index} fileList={fileList} listFiles={listFiles} {...props} />
                </Suspense>
        </ErrorBoundary>}
    </> 
}


function ErrorFallback({ error }: {error: Error}) {
    console.error(error);
    return <div>Something went wrong while loading the content. sorry :(</div>;
  }
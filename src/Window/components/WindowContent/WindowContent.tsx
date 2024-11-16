import React, { lazy, Suspense, useEffect, useState } from "react";
import { WindowConteudo, WindowType } from "../../../constants/window";
import styles from './WindowContent.module.scss';
import { ErrorBoundary } from "react-error-boundary";
import { useFileSystem } from "@/contexts/FileSystemContext";
import Folder from "../../../Folder/Folder";
import { loadComponent } from "@/utils/componentLoader";

export default function WindowContent({window, closeRefCurrent, index}: {window: WindowType, closeRefCurrent: (HTMLButtonElement | null)[], index: number}){
    const [loading, setLoading] = useState(!!window.link);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<any>(null);
    useEffect(() => {
        if (window.componentPath) {
            try {
                const LoadedComponent = loadComponent(window.componentPath);
                setComponent(() => LoadedComponent);
            } catch (error) {
                console.error('Error loading component:', error);
            }
        }
    }, [window.componentPath]);
    const {getFileUrl, updateFile, fileList, listFiles} = useFileSystem();
    const props = window.props || {}

    return <>
    {loading && <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>}
        {window.link ? <iframe src={window.link} onLoad={() => setLoading(false)} width="100%" height="100%"></iframe> : 
        Component && <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>Loading...</div>}>
                <Component closeBtnRefs={closeRefCurrent} folderPath={window.folderPath} getFileUrl={getFileUrl} updateFile={updateFile} closeRefIndex={index} fileList={fileList} listFiles={listFiles} {...props} />
                </Suspense>
        </ErrorBoundary>}
    </> 
}


function ErrorFallback({ error }: {error: Error}) {
    console.error(error);
    return <div>Something went wrong while loading the content. sorry :(</div>;
  }
import { useFileSystem } from "@/contexts/FileSystemContext";
import { loadComponent } from "@/utils/componentLoader";
import { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AppType } from "@/constants/apps";
import styles from './WindowContent.module.scss';

export default function WindowContent({window, closeRefCurrent, index}: {window: AppType, closeRefCurrent: (HTMLButtonElement | null)[], index: number}){
    const [loading, setLoading] = useState(!!window.link);
    const [componentLoaded, setComponentLoaded] = useState(false);
    
    // Use useRef to store the loaded component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const componentRef = useRef<any>(null);
    
    // Load component only once when componentPath changes or on initial mount
    useEffect(() => {
        if (window.componentPath && !componentRef.current) {
            componentRef.current = loadComponent(window.componentPath);
            setComponentLoaded(true);
        }
    }, [window.componentPath]);

    const LoadedComponent = componentRef.current;

    const fileSystem = useFileSystem();
    const props = window.props || {};

    return <>
        {loading && <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>}
        {window.link ? 
            <iframe 
            src={window.link}
            onLoad={() => setLoading(false)}
            width="100%"
            height="100%"
            allow="camera; microphone; clipboard-write; fullscreen"
            referrerPolicy="origin"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          ></iframe> : 
            componentLoaded && LoadedComponent && 
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoadedComponent 
                            app={window}
                            closeBtnRefs={closeRefCurrent} 
                            folderPath={window.folderPath} 
                            {...fileSystem}
                            closeRefIndex={index} 
                            {...props} 
                        />
                    </Suspense>
                </ErrorBoundary>
        }
    </> 
}


function ErrorFallback({ error }: {error: Error}) {
    console.error(error);
    return <div>Something went wrong while loading the content. sorry :(</div>;
  }
import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

function useOpenWindow(): (app: WindowType) => void {
    const [windows, setWindows] = useWindowContext();

    const openWindow = (app: WindowType) => {
        console.log('APP', app);
        console.log('SET WINDOWS', setWindows);
        if(app.notUnique){
            app.uniqueName = app.app;
            app.app = app.app + Math.random().toString(36).substring(2, 15);
        }
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false })); // Deactivate all windows
            console.log('PREV WINDOWS', JSON.parse(JSON.stringify(prevWindows)));
            if(!prevWindows.find(a => a.app == app.app)){
                console.log('APP NOT FOUND', app);
                app.x = app.x ?? Math.round(0.08 * innerWidth) * ((windows.length + 1) / 4)
                app.y = app.y ?? 80 * ((windows.length + 1) / 4)
                return [...updatedWindows, { ...app, active: true, minimized: false }]; // Add the new window
            }else{
                const ap = updatedWindows.find(a=> a.app == app.app);
                if(ap){
                    ap.active = true;
                    ap.minimized = false;
                }
                return [...updatedWindows]; // Add the new window
            }
        });
    }
    return openWindow;
}

export default useOpenWindow;

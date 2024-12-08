import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

function useOpenWindow(): (app: WindowType) => void {
    const [windows, setWindows] = useWindowContext();

    const openWindow = (app: WindowType) => {
        if(app.notUnique){
            app = JSON.parse(JSON.stringify(app));
            app.uniqueName = app.uniqueName ?? app.app;
            app.app = app.app + Math.random().toString(36).substring(2, 15);
        }
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false })); // Deactivate all windows
            if(!prevWindows.find(a => a.app == app.app)){
                app.x = app.x ?? Math.round(0.08 * innerWidth) * ((windows.length + 1) / 4)
                app.y = app.y ?? 80 * ((windows.length + 1) / 4)
                return [...updatedWindows, { ...app, active: true, minimized: false }]; // Add the new window
            }else{
                const ap = updatedWindows.find(a=> a.app == app.app);
                if(ap){
                    ap.active = true;
                    ap.minimized = false;
                }
                return [...updatedWindows];
            }
        });
    }
    return openWindow;
}

export default useOpenWindow;

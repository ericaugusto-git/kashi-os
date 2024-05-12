import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

function useOpenWindow(): (app: WindowType) => void {
    const [windows, setWindows] = useWindowContext();
    const openWindow = (app: WindowType) => {
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false })); // Deactivate all windows
            if(!prevWindows.find(a => a.app == app.app)){
                app.x = app.x ?? Math.round(0.08 * innerWidth) * ((windows.length + 1) / 2)
                app.y = app.y ?? 50 * ((windows.length + 1) / 2)
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

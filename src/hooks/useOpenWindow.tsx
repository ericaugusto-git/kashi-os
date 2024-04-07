import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

function useOpenWindow(): (app: WindowType) => void {
    const [windows, setWindows] = useWindowContext();
    const openWindow = (app: WindowType) => {
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .filter(window => window.app !== app.app) // Remove existing window if it exists
                .map(window => ({ ...window, active: false })); // Deactivate all windows
            app.x = app.x ?? 150 * ((windows.length + 1) / 2)
            app.y = app.y ?? 50 * ((windows.length + 1) / 2)
            return [...updatedWindows, { ...app, active: true }]; // Add the new window
        });
    }
    return openWindow;
}

export default useOpenWindow;

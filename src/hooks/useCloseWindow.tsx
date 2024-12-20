import { AppType } from '@/constants/apps';
import { useWindowContext } from '../contexts/WindowContext';

function useCloseWindow(): (app: AppType | string) => void {
    const [, setWindows] = useWindowContext();
    const closeWindow = (app: AppType | string) => {
        const nome = typeof app === 'string' ? app : app.app;
        
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .filter(window => window.app !== nome) // Remove existing window if it exists
            return [...updatedWindows]; // Add the new window
        });
    }
    return closeWindow;
}

export default useCloseWindow;

import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

function useCloseWindow(): (app: WindowType | string) => void {
    const [, setWindows] = useWindowContext();
    const closeWindow = (app: WindowType | string) => {
        const nome = typeof app === 'string' ? app : app.app;
        console.log(nome)
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .filter(window => window.app !== nome) // Remove existing window if it exists
                console.log(updatedWindows)
            return [...updatedWindows]; // Add the new window
        });
    }
    return closeWindow;
}

export default useCloseWindow;

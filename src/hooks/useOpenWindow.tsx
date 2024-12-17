import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';

const INITIAL_OFFSET = 50; // Initial offset from top-left
const OFFSET_INCREMENT = 30; // Offset increment for each new window

function useOpenWindow(): (app: WindowType) => void {
    const [_, setWindows] = useWindowContext();

    const calculateWindowPosition = (app: WindowType, existingWindows: WindowType[]) => {
        // If the window has specific coordinates, use them
        if (app.x !== undefined && app.y !== undefined) {
            return { x: app.x, y: app.y };
        }

        // Get the number of existing windows for offset calculation
        const windowCount = existingWindows.length;

        // Calculate position with increasing offset
        let x = INITIAL_OFFSET + (OFFSET_INCREMENT * (windowCount % 10));
        let y = INITIAL_OFFSET + (OFFSET_INCREMENT * (windowCount % 10));

        // Ensure window doesn't go off screen
        const maxX = window.innerWidth - 400; // Assuming minimum window width
        const maxY = window.innerHeight - 400; // Assuming minimum window height

        // Reset position if it would go off screen
        if (x > maxX || y > maxY) {
            x = INITIAL_OFFSET;
            y = INITIAL_OFFSET;
        }

        return { x, y };
    };

    const openWindow = (app: WindowType) => {
        if (app.notUnique) {
            app = JSON.parse(JSON.stringify(app));
            app.uniqueName = app.uniqueName ?? app.app;
            app.app = app.app + Math.random().toString(36).substring(2, 15);
        }

        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false }));

            if (!prevWindows.find(a => a.app === app.app)) {
                const position = calculateWindowPosition(app, prevWindows);
                return [...updatedWindows, { 
                    ...app, 
                    x: position.x,
                    y: position.y,
                    active: true, 
                    minimized: false 
                }];
            } else {
                const existingWindow = updatedWindows.find(a => a.app === app.app);
                if (existingWindow) {
                    existingWindow.active = true;
                    existingWindow.minimized = false;
                }
                return [...updatedWindows];
            }
        });
    };

    return openWindow;
}

export default useOpenWindow;

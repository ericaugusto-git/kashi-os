import { AppType } from '@/constants/apps';
import { useWindowContext } from '../contexts/WindowContext';
import { taskbarHeight } from '@/Taskbar/TaskbarHypr';

const INITIAL_OFFSET = 50; // Initial offset from top-left
const OFFSET_INCREMENT = 30; // Offset increment for each new window

function useOpenWindow(): (app: AppType) => void {
    const [_, setWindows] = useWindowContext();

    const calculateWindowPosition = (app: AppType, existingWindows: AppType[]) => {
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

    const openWindow = (app: AppType) => {
        if (app.notUnique) {
            app = JSON.parse(JSON.stringify(app));
            app.titleBarName = app.titleBarName ?? app.name;
            app.name = app.name + Math.random().toString(36).substring(2, 15);
        }

        if(app.maximized){
             app.width = '100%';
             app.height = (innerHeight - taskbarHeight) + 'px';
             app.x = 0;
             app.y = 0;
        }

        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false }));

            if (!prevWindows.find(a => a.name === app.name)) {
                const position = calculateWindowPosition(app, prevWindows);
                return [...updatedWindows, { 
                    ...app, 
                    x: position.x,
                    y: position.y,
                    active: true, 
                    minimized: false 
                }];
            } else {
                const existingWindow = updatedWindows.find(a => a.name === app.name);
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

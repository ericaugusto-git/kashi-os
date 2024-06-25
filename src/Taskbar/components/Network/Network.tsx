import { useEffect, useState } from 'react';
import wifi from '../../../assets/taskbar/wifi.svg';
import ethernet from '../../../assets/taskbar/ethernet.svg';

// Extending Navigator interface to include Network Information API
interface NavigatorConnection extends Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
}

interface NetworkInformation extends EventTarget {
    type: string;
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
    addEventListener: (type: "change", listener: (this: NetworkInformation, ev: Event) => unknown) => void;
    removeEventListener: (type: "change", listener: (this: NetworkInformation, ev: Event) => unknown) => void;
}

export default function Network() {
    const [isOnline, setOnline] = useState<boolean>(navigator.onLine);
    const navigatorConnection = navigator as NavigatorConnection;
    const connection = navigatorConnection.connection || navigatorConnection.mozConnection || navigatorConnection.webkitConnection;
    const [type, setType] = useState<string | undefined>(connection?.type);

    const updateNetworkStatus = () => {
        setOnline(navigator.onLine);
    };

    useEffect(() => {
        const updateNetworkInfo = () => {
            
            setType(connection?.type);
        };
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
        }

        return () => {
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);

            if (connection) {
                connection.removeEventListener('change', updateNetworkInfo);
            }
        };
    }, [connection]);

    return (
        <div className="svgMask taskbar_icon" style={{ maskImage: `url("${type === 'ethernet' ? ethernet : wifi}")` }}></div>
    );
}

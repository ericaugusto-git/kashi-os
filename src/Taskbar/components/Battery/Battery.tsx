import style from './Battery.module.scss';
import { useEffect, useState } from 'react';

// Extending Navigator interface to include getBattery
interface NavigatorBattery extends Navigator {
    getBattery: () => Promise<BatteryManager>;
}

interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    addEventListener: (type: "chargingchange" | "levelchange", listener: (this: BatteryManager, ev: Event) => unknown) => void;
    removeEventListener: (type: "chargingchange" | "levelchange", listener: (this: BatteryManager, ev: Event) => unknown) => void;
}

export default function Battery() {
    const [battery, setBattery] = useState<BatteryManager | null>(null);

    useEffect(() => {
        const navigatorWithBattery = navigator as NavigatorBattery;

        navigatorWithBattery.getBattery().then((battery) => {
            
            
            setBattery(battery);

            // Level change event listener
            const handleLevelChange = () => {
                
                setBattery({ ...battery });
            };

            // Charging change event listener
            const handleChargingChange = () => {
                
                setBattery({ ...battery });
            };

            battery.addEventListener('levelchange', handleLevelChange);
            battery.addEventListener('chargingchange', handleChargingChange);

            // Cleanup function to remove event listeners
            return () => {
                battery.removeEventListener('levelchange', handleLevelChange);
                battery.removeEventListener('chargingchange', handleChargingChange);
            };
        });
    }, []);

    return (
        <div className={style.battery}>
            <div className={style.battery_icon}>
                <div style={{ width: battery?.level ? battery.level * 100 + '%' : '0%' }} className={style.battery_fill}></div>
            </div>
            {battery?.level !== undefined && battery.level * 100 + '%'}
        </div>
    );
}

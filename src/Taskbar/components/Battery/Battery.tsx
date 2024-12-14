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
    const [batteryLevel, setBatteryLevel] = useState<string | null>(null);
    const [notSupported, setNotSupported] = useState<boolean>();
    useEffect(() => {
        const navigatorWithBattery = navigator as NavigatorBattery;
        if(typeof navigatorWithBattery.getBattery !== "undefined"){
            navigatorWithBattery?.getBattery().then((battery) => {
                setBatteryLevel(Math.ceil(battery.level * 100)  + '%');
    
                // Level change event listener
                const handleLevelChange = () => {
                    setBatteryLevel(Math.ceil(battery.level * 100)  + '%');
                };
    
                // Charging change event listener
                const handleChargingChange = () => {
                    setBatteryLevel(Math.ceil(battery.level * 100)  + '%');
                };
    
                battery.addEventListener('levelchange', handleLevelChange);
                battery.addEventListener('chargingchange', handleChargingChange);
    
                // Cleanup function to remove event listeners
                return () => {
                    battery.removeEventListener('levelchange', handleLevelChange);
                    battery.removeEventListener('chargingchange', handleChargingChange);
                };
            });
        }else{
            setNotSupported(true)
        }
    }, []);
    if(notSupported) return <></>
    return (
        <div className={style.battery}>
            <div className={style.battery_icon}>
                <div style={{ width: batteryLevel ?? '100%' }} className={style.battery_fill}></div>
            </div>
            <span>
             {batteryLevel ?? ''}
            </span>
        </div>
    );
}

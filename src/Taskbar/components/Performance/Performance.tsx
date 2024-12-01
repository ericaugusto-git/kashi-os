import style from './Performance.module.scss';
import performance_icon from '../../../assets/taskbar/performance.svg';
import { useEffect, useState } from 'react';

export default function Performance() {
    const [memoryData, setMemoryData] = useState({
        usedJSHeapSize: 0,
        sizeChange: 0
    });
    performance
    useEffect(() => {
        if (performance.memory) {
            const intervalId = setInterval(() => {
                setMemoryData((prev) => {
                    return {
                        usedJSHeapSize: performance.memory.usedJSHeapSize,
                        sizeChange: performance.memory.usedJSHeapSize - prev.usedJSHeapSize
                    };
                });
            }, 2000); // 10 seconds interval

            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }
    }, []);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
        const formattedBytes = (bytes / Math.pow(k, i)).toFixed(2);
        return `${formattedBytes.replace('-', '')} ${sizes[i]}`;
    };

    return (
        <div className={style.performance}>
            <button className="svgMask taskbar_icon" style={{ maskImage: `url("${performance_icon}")` }}></button>
            <span className={style.heap_total}>{formatBytes(memoryData.usedJSHeapSize)}</span>
            <span className={style.size_change} style={{ color: memoryData.sizeChange >= 0 ? '#B8E3B1' : '#E3B1B1' }}>
                {memoryData.sizeChange >= 0 ? '▲' : '▼'} {formatBytes(memoryData.sizeChange)}
            </span>
        </div>
    );
}

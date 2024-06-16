interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }

  // performance.d.ts
interface PerformanceMemory {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

interface Performance {
  memory: PerformanceMemory;
}

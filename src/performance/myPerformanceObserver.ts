import {performance, PerformanceObserver} from "perf_hooks";

require = performance.timerify(require);

export const myPerformanceObserver = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    });
    //observer.disconnect();
})
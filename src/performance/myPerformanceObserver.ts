import {performance, PerformanceObserver} from "perf_hooks";
import {PerformanceType} from "./performance-types";

require = performance.timerify(require);

export const myPerformanceObserver = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
        switch (entry.name) {
            case PerformanceType.LOAD:
                startTime = entry.duration;
                break;
            case PerformanceType.GET:
                getTime = entry.duration;
                break;
            case PerformanceType.DELETE:
                deleteTime = entry.duration;
                break
            default:
                break;
        }
    });
    //observer.disconnect();
})
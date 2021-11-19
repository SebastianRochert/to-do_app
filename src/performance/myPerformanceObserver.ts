import {performance, PerformanceObserver} from "perf_hooks";
import {PerformanceType} from "./performance-types";
import {setDeleteTime, setGetTime, setStartTime} from "./performanceTimes";

require = performance.timerify(require);

export const myPerformanceObserver = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
        switch (entry.name) {
            case PerformanceType.LOAD:
                setStartTime(entry.duration);
                break;
            case PerformanceType.GET:
                setGetTime(entry.duration);
                break;
            case PerformanceType.DELETE:
                setDeleteTime(entry.duration);
                break
            default:
                break;
        }
    });
    //observer.disconnect();
})
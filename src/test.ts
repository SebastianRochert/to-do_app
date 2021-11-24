import {getDeleteTime, getGetTime, getStartTime} from "./performance/performanceTimes";

export function testApp() {
    const erg = `Performance Measurements:
            Duration of initial loading the state: ${getStartTime()}
            Duration of get call: ${getGetTime()}
            Duration of delete call: ${getDeleteTime()}`;
    console.log(erg);
}
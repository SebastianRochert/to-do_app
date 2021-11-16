import {store} from "../redux";

// Redux Logger as seen on https://redux.js.org/understanding/history-and-design/middleware#problem-logging
export const reduxLogger = () => (next: (arg0: any) => any) => (action: any) => {
    console.log("dispatching: ", action);
    let result = next(action);
    console.log("Next State: ", store.getState());
    return result;
}

export const crashReporter = () => (next: (arg0: any) => any) => (action: any) => {
    try {
        return next(action);
    } catch (e: any) {
        console.error("Caught an exeption!", e)
        throw new Error(e);
    }
}

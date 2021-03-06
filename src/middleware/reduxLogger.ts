import {Dispatch, MiddlewareAPI} from "redux";
import {Action} from "../redux/actions";
import {ActionType} from "../redux/action-types";
import {findTodos} from "../service/todo.service";
import {createTodoAction} from "../redux/action-creators";
import {performance, PerformanceObserver} from "perf_hooks";
import {PerformanceType} from "../performance/performance-types";
import {myPerformanceObserver} from "../performance/myPerformanceObserver";

myPerformanceObserver.observe({entryTypes: ["measure"]});

// Redux Logger as seen on https://redux.js.org/understanding/history-and-design/middleware#problem-logging
export const reduxLogger = (api: MiddlewareAPI) => (next: (arg0: any) => any) => (action: Action) => {
    //console.log("dispatching: ", action);
    let result = next(action);
    //console.log("Next State: ", api.getState());
    return result;
}

export const crashReporter = () => (next: (arg0: any) => any) => (action: Action) => {
    try {
        return next(action);
    } catch (e) {
        console.error("Caught an exception!", e)
        throw new Error("Exception thrown in reduxLogger.ts/crashReporter");
    }
}

export const loadStateMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    performance.mark("start");
    if (action.type === ActionType.REHYDRATION) {
        next(action);
        /**
         * Connection ready state
         0 = disconnected
         1 = connected
         2 = connecting
         3 = disconnecting
         */
        //console.log("DB readyState", TodoModel.db.readyState);
        findTodos().then((todos) => {
            //console.log("DB readyState", TodoModel.db.readyState);
            for (let todo of todos) {
                api.dispatch(createTodoAction(todo));
            }
            performance.mark("stop");
            performance.measure(PerformanceType.LOAD, "start", "stop");
        });
    } else {
        next(action);
    }
}

/* Funktioniert nur mit einer Browser-Ausgabe...
export const loadStateMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    window.performance;
    // Run nested timeouts and create a Performance mark (for each).
    performance.mark("markerNameA");
    setTimeout(function () {
        if (action.type === ActionType.REHYDRATION) {
            next(action);
            findTodos().then((todos) => {
                for (let todo of todos) {
                    api.dispatch(createTodoAction(todo));
                }
            });
        } else {
            next(action);
        }
        // Create measurements
        performance.measure("measure loadStateMiddleware", "markerNameA");
        // Pull out all of the measurements.
        console.log(performance.getEntriesByType("measure"));
        // Finally, clean up the entries.
        performance.clearMarks();
        performance.clearMeasures();
    }, 1000);
}
 */
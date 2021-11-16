import reducers from "./reducers/reducer.index";
import {createStore, applyMiddleware} from 'redux';
import {crashReporter, reduxLogger} from "../middleware/reduxLogger"
import {composeWithDevTools} from "remote-redux-devtools";

const composeEnhancers = composeWithDevTools({name: "Todo-App", hostname: "localhost", realtime: true, port: 9092});
export const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxLogger, crashReporter)));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
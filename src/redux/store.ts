import reducers from "./reducers/reducer.index";
import {createStore, applyMiddleware} from 'redux';
import {crashReporter, reduxLogger} from "../middleware/reduxLogger"

export const store = createStore(reducers, applyMiddleware(reduxLogger, crashReporter));


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
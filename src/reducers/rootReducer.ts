import { combineReducers } from 'redux';
import navReducer from './navReducer';
import userReducer from './userReducer';
import tasksReducer from './tasksReducer';
import hideoutReducer from './hideoutReducer';

const rootReducer = combineReducers({
    nav: navReducer,
    user: userReducer,
    tasks: tasksReducer,
    hideout: hideoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

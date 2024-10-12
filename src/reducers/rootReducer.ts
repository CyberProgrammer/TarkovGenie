import { combineReducers } from 'redux';
import navReducer from './navReducer';
import userReducer from './userReducer';
import tasksReducer from './tasksReducer';
import hideoutReducer from './hideoutReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
    nav: navReducer,
    user: userReducer,
    tasks: tasksReducer,
    hideout: hideoutReducer,
    itemsNeeded: itemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import {combineReducers} from "redux";
import userReducer from './user';
import postReducer from './post';


const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
})
// 함수의 return값만 뽑아올때 ReturnType
export type RootState = ReturnType<typeof reducer>;

export default reducer;
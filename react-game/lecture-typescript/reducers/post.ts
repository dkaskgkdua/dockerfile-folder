import { ADD_POST, AddPostAction } from "../actions/post";
import { produce } from 'immer';

const initialState: string[] = [];

const postReducer = (prevState = initialState, action: AddPostAction):string[] => {
    return produce(prevState, (draft) => {
        switch(action.type) {
            case ADD_POST:
                draft.push(action.data);
                break;
            default:
                break;
        }
    })

}

export default postReducer;

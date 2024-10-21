import { createStore } from "redux";
import { UnknownAction } from "redux";

interface ProfileState {
  name: string,
  surname: string,
  avatar: string,
}

const initialState: ProfileState = {
  name: '',
  surname: '',
  avatar: '',
}

const profileReducer = (state = initialState, action: UnknownAction): ProfileState => {
  switch (action.type) {
  case "setProfile":
    return {
      ...state,
    };
  default:
    return state;
  }
}

const store = createStore(profileReducer);

export default store;
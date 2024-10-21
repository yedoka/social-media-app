import { createStore } from "redux";
import { UnknownAction } from "redux";
import type { User } from "../types/Credentials";

const initialState: User = {
  username: '',
  avatar: '',
}

const profileReducer = (state = initialState, action: UnknownAction): User => {
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
import {createSlice} from "@reduxjs/toolkit";

interface PostState {
    imgUrl: string | null;
    description: string | null;
}

const initialState: PostState = {
  imgUrl: null,
  description: null,
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action) {
      state.imgUrl = action.payload.imgUrl;
      state.description = action.payload.description;
    }
  }
})

export default postSlice;
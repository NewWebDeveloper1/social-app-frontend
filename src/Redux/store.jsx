import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import userProfileReducer from "./UserProfile/user.reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import postReducer from "./Post/post.reducer";
import reelReducer from "./Reels/reels.reducer";
import chatReducer from "./Chat/chat.reducer";
import storyReducer from "./Story/story.reducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["userProfile"], // Specify which reducers to persist
// };

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  posts: postReducer,
  reel: reelReducer,
  chat: chatReducer,
  story: storyReducer,
});

// const persistedReducer = persistReducer( rootReducer);

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export const persistor = persistStore(store);

export default store;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appSliceReducer from './appSlice';
import authSliceReducer from './authSlice';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
// export const store = configureStore({
//   reducer: {
//     auth: authReducer, app: appReducer 
//   },
// });

export const store = configureStore({
  reducer: {
    app: appSliceReducer ,
    auth: authSliceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

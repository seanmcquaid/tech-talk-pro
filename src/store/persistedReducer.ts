import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/slice';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const rootReducer = combineReducers({
  counter: counterReducer,
});

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: 'root',
  storage:
    typeof window !== 'undefined'
      ? createWebStorage('local')
      : createNoopStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

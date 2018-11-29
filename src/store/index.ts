import { combineReducers } from 'redux';
import { audioMetaReducer } from './audio/reducer';

export const rootReducer = combineReducers({
  audioMeta: audioMetaReducer,
});

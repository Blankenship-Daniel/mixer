import { combineReducers } from 'redux';
import { audioMetaReducer } from './audioMeta/reducer';
import { activeAudioReducer } from './activeAudio/reducer';
import { appWideLoadingReducer } from './appWideLoading/reducer';

export const rootReducer = combineReducers({
  audioMeta: audioMetaReducer,
  activeAudio: activeAudioReducer,
  appWideLoading: appWideLoadingReducer,
});

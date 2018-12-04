import { action } from 'typesafe-actions';
import { AudioTypes } from './types';

export const setAudioMeta = meta => action(AudioTypes.SET_AUDIO_META, meta);
export const deleteAudioMeta = uuid =>
  action(AudioTypes.DELETE_AUDIO_META, uuid);

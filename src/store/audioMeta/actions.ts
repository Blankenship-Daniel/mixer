import { action } from 'typesafe-actions';
import { AudioTypes } from './types';

export const setAudioMeta = (meta: any) =>
  action(AudioTypes.SET_AUDIO_META, meta);
export const deleteAudioMeta = (uuid: string) =>
  action(AudioTypes.DELETE_AUDIO_META, uuid);
export const editAudioMeta = (edit: any) =>
  action(AudioTypes.EDIT_AUDIO_META, edit);

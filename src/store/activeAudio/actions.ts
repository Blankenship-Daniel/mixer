import { action } from 'typesafe-actions';
import { ActiveAudioTypes } from './types';

export const setActiveAudio = audio =>
  action(ActiveAudioTypes.SET_ACTIVE_AUDIO, audio);

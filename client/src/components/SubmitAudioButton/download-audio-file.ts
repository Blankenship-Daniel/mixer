import { mixAudio } from '../../services/mix-audio';
import { createRequestPayload } from './create-request-payload';
import { settings } from '../../../settings';

export const downloadAudioFile = async audioMeta => {
  const response = await mixAudio(createRequestPayload(audioMeta));
  const downloadUrl = await response.text();
  const downloadLink = document.createElement('a');
  downloadLink.href = settings.SERVER_BASE_URL + downloadUrl;
  downloadLink.click();
};

import { settings } from '../../../settings';
import { CustomFile } from './metadata/custom-file';

export const uploadFiles = (files: CustomFile[]) => {
  const body: FormData = files.reduce((formData, file) => {
    formData.append(file.id, file);
    return formData;
  }, new FormData());

  return fetch(`${settings.SERVER_BASE_URL}/upload`, {
    method: 'POST',
    mode: 'no-cors',
    body,
  });
};

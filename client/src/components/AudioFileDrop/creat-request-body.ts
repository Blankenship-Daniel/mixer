import { CustomFile } from './metadata/custom-file';

export const createRequestBody = (files: CustomFile[]): FormData => {
  return files.reduce((formData, file) => {
    formData.append(file.id, file);
    return formData;
  }, new FormData());
};

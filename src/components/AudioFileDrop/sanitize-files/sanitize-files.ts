import { supportedFileTypes } from './supported-file-types';

export const sanitizeFiles = (files: File[]): File[] => {
  return files.filter((f: File) => supportedFileTypes.indexOf(f.type) > -1);
};

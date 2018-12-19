import { supportedFileTypes } from './supported-file-types';
import { CustomFile } from '../metadata/custom-file';

export const sanitizeFiles = (files: CustomFile[]): CustomFile[] => {
  return files.filter((f: File) => supportedFileTypes.indexOf(f.type) > -1);
};

import { supportedFileTypes } from './supported-file-types';

export const sanitizeFiles = (files: FileList): File[] => {
  const f: File[] = Array.from(files);
  return f.filter((f: File) => supportedFileTypes.includes(f.type));
};

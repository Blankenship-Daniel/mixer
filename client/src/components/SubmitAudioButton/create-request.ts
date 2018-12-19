import { AudioMetaTag } from '../AudioFileDrop/metadata';

export const createRequest = (audioMeta: AudioMetaTag[]): string => {
  return JSON.stringify(
    audioMeta.map(meta => {
      delete meta.imageDataUrl;
      return meta;
    }),
  );
};

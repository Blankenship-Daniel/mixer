import { AudioMetaTag } from '../AudioFileDrop/metadata';

export const createRequestPayload = (audioMeta: AudioMetaTag[]): string => {
  return JSON.stringify(
    audioMeta.map(meta => ({
      id: meta.id,
      customStartTime: meta.customStartTime,
      customEndTime: meta.customEndTime,
      duration: meta.duration,
    })),
  );
};

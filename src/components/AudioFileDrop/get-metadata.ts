import universalParse from 'id3-parser/lib/universal';
import uuid from 'uuid';
import { createDataUrl } from './create-data-url';

export const getMetadata = async (files: File[]): Promise<any[]> => {
  let tags = [];
  for (let i = 0; i < files.length; i++) {
    const tag = await universalParse(files[i]);
    tag.id = uuid();
    tag.imageDataUrl = tag.image ? createDataUrl(tag.image) : '';
    tags.push(tag);
  }
  return tags;
};

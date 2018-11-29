import universalParse from 'id3-parser/lib/universal';
import uuid from 'uuid';
import { createDataUrl } from './create-data-url';

export const getMetadata = async (files: File[]): Promise<any[]> => {
  let tags = [];
  for (let i = 0; i < files.length; i++) {
    const tag = await universalParse(files[i]);
    tag.id = uuid();
    tag.imageDataUrl = tag.image ? createDataUrl(tag.image) : '';
    delete tag.image; // No reason to keep all of this data in memory once we've generated the imageDataUrl
    tags.push(tag);
  }
  return tags;
};

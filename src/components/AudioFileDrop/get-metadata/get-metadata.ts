import universalParse from 'id3-parser/lib/universal';
import * as uuid from 'uuid';
import { createDataUrl } from '../create-data-url';
import { noCoverArtDataUrl } from './no-cover-art-data-url';

export interface AudioMetaTag {
  album: string;
  artist: string;
  band: string;
  genre: string;
  id: string;
  imageDataUrl: string;
  src: string;
  title: string;
  track: string;
  version: any;
  year: string;
}

export const getMetadata = async (files: File[]): Promise<AudioMetaTag[]> => {
  let tags = [];
  for (let i = 0; i < files.length; i++) {
    const tag = await universalParse(files[i]);
    tag.title = tag.title || 'Untitled';
    tag.artist = tag.artist || '';
    tag.album = tag.album || '';
    tag.id = uuid.v1();
    tag.src = URL.createObjectURL(files[i]);
    tag.imageDataUrl = tag.image ? createDataUrl(tag.image) : noCoverArtDataUrl;
    delete tag.image; // No reason to keep all of this data in memory once we've generated the imageDataUrl
    tags.push(tag);
  }
  return tags;
};

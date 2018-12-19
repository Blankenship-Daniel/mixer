import universalParse from 'id3-parser/lib/universal';
import * as uuid from 'uuid';
import { createDataUrl } from '../create-data-url';
import { noCoverArtDataUrl } from './no-cover-art-data-url';
import { CustomFile } from './custom-file';
import { AudioMetaTag } from './audio-meta-tag';

export class MetaData {
  private files: CustomFile[];

  constructor(files: CustomFile[]) {
    this.files = files;
    this.files.forEach((file: CustomFile) => (file.id = uuid.v1()));
  }

  getFiles = (): CustomFile[] => {
    return this.files;
  };

  getMetaData = async (): Promise<AudioMetaTag[]> => {
    let tags = [];
    for (const file of this.files) {
      const tag = await universalParse(file); // Returns metadata for a given file
      tag.title = tag.title || 'Untitled';
      tag.artist = tag.artist || '';
      tag.album = tag.album || '';
      tag.id = file.id;
      tag.src = URL.createObjectURL(file);
      tag.imageDataUrl = tag.image
        ? createDataUrl(tag.image)
        : noCoverArtDataUrl;
      tag.customStartTime = null;
      tag.customEndTime = null;
      delete tag.image; // No reason to keep all of this data in memory once we've generated the imageDataUrl
      tags.push(tag);
    }
    return tags;
  };
}

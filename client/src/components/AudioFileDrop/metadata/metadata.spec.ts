import * as uuid from 'uuid';
import * as parse from 'id3-parser/lib/universal';
import { AudioMetaTag } from './audio-meta-tag';
import { CustomFile } from './custom-file';
import { MetaData } from './metadata';

describe('getMetadata', () => {
  beforeEach(() => {
    // NOTICE: this is a workaround for the following reported issue:
    // https://github.com/jsdom/jsdom/issues/1721
    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: () => {} });
    }
  });

  it('should return AudioMetaTags for a given FileList', async () => {
    const mockFiles: CustomFile[] = [
      {
        id: null,
        lastModified: 123,
        name: 'test1',
        size: 123,
        slice: jest.fn(() => {}),
        type: 'audio/mp3',
      },
      {
        id: null,
        lastModified: 123,
        name: 'test2',
        size: 123,
        slice: jest.fn(() => {}),
        type: 'audio/mp3',
      },
    ];
    const mockReturnValue = {
      album: 'Junta',
      artist: 'Phish',
      band: 'Phish',
      genre: 'Rock',
      image: { data: [1, 2, 3] },
      title: 'Fee',
      track: '6/0',
      year: '1989',
    };
    const mockId: string = '123';
    jest.spyOn(parse, 'default').mockReturnValue(mockReturnValue);
    jest.spyOn(uuid, 'v1').mockReturnValue(mockId);

    const metaData: MetaData = new MetaData(mockFiles);
    const audioMeta: AudioMetaTag[] = await metaData.getMetaData();
    audioMeta.forEach(meta => {
      expect(meta).toHaveProperty('id');
      expect(meta).not.toHaveProperty('image');
      expect(meta).toHaveProperty('imageDataUrl');
      expect(meta).toHaveProperty('src');
    });
  });
});

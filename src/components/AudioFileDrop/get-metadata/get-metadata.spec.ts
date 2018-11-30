import * as uuid from 'uuid';
import * as parse from 'id3-parser/lib/universal';
import { AudioMetaTag, getMetadata } from './get-metadata';

describe('getMetadata', () => {
  it('should return AudioMetaTags for a given FileList', async () => {
    const mockFiles: File[] = [
      {
        lastModified: 123,
        name: 'test1',
        size: 123,
        slice: jest.fn(() => {}),
        type: 'audio/mp3',
      },
      {
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
    const audioMeta: AudioMetaTag[] = await getMetadata(mockFiles);
    audioMeta.forEach(meta => {
      expect(meta).toHaveProperty('id');
      expect(meta).not.toHaveProperty('image');
      expect(meta).toHaveProperty('imageDataUrl');
    });
  });
});

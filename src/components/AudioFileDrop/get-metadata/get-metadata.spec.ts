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
      title: 'Fee',
      track: '6/0',
      year: '1989',
    };
    const mockId: string = '123';
    jest.spyOn(parse, 'default').mockReturnValue(mockReturnValue);
    jest.spyOn(uuid, 'v1').mockReturnValue(mockId);
    const audioMeta: AudioMetaTag[] = await getMetadata(mockFiles);
    const expectedAudioMeta: AudioMetaTag[] = audioMeta.map(tag => {
      return { ...tag, id: mockId, imageDataUrl: '' };
    });
    expect(audioMeta).toEqual(expectedAudioMeta);
  });
});

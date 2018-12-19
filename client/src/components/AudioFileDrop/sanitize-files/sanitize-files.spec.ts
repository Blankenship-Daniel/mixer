import { sanitizeFiles } from './';

describe('sanitizeFiles', () => {
  it('should only return supported file types', () => {
    const mockFiles: File[] = [
      {
        lastModified: 123,
        name: 'test1',
        size: 123,
        slice: jest.fn(() => {}),
        type: 'image/jpeg',
      },
      {
        lastModified: 123,
        name: 'test2',
        size: 123,
        slice: jest.fn(() => {}),
        type: 'audio/mp3',
      },
    ];
    const files: File[] = sanitizeFiles(mockFiles);
    expect(files.length).toBe(1);
    expect(files[0]).toEqual(mockFiles[1]);
  });
});

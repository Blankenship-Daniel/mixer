import { createDataUrl } from '.';

describe('createDataUrl', () => {
  it('should create base64 data url from image object', () => {
    const expectedBase64Url: string = `data:image/jpeg;base64,AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+`;
    const mockImage = {
      data: [],
      mime: 'image/jpeg',
    };
    for (let i = 0; i < 255; i++) {
      mockImage.data.push(i);
    }
    const base64Url: string = createDataUrl(mockImage);
    expect(base64Url).toBe(expectedBase64Url);
  });
});

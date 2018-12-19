import { getNextTrack, getPrevTrack } from './';

const mockIds = ['1', '2', '3', '4'];

describe('getNextTrack', () => {
  it('should correctly get the next track', () => {
    expect(getNextTrack('1', mockIds)).toBe('2');
    expect(getNextTrack('2', mockIds)).toBe('3');
    expect(getNextTrack('3', mockIds)).toBe('4');
    expect(getNextTrack('4', mockIds)).toBe('1');
  });
});

describe('getPrevTrack', () => {
  it('should correctly get the previous track', () => {
    expect(getPrevTrack('4', mockIds)).toBe('3');
    expect(getPrevTrack('3', mockIds)).toBe('2');
    expect(getPrevTrack('2', mockIds)).toBe('1');
    expect(getPrevTrack('1', mockIds)).toBe('4');
  });
});

export const getNextTrack = (id: string, ids: string[]): string => {
  const i = ids.indexOf(id);

  if (i >= ids.length - 1) {
    return ids[0];
  }

  return ids[i + 1];
};

export const getPrevTrack = (id: string, ids: string[]): string => {
  const i = ids.indexOf(id);

  if (i <= 0) {
    return ids[ids.length - 1];
  }

  return ids[i - 1];
};

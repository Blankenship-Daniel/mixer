import { settings } from '../../settings';

export const mixAudio = (body: string) => {
  return fetch(`${settings.SERVER_BASE_URL}/mix`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
};

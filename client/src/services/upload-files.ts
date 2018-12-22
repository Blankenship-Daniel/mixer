import { settings } from '../../settings';

export const uploadFiles = (body: FormData) => {
  return fetch(`${settings.SERVER_BASE_URL}/upload`, {
    method: 'POST',
    body,
  });
};

export const mixAudio = (body: string) => {
  fetch('/mix', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
};

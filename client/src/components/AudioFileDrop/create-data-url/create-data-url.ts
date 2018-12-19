export const createDataUrl = (image): string => {
  const base64: string = image.data.reduce(
    (accumulator, data) => (accumulator += String.fromCharCode(data)),
    '',
  );
  return `data:${image.mime};base64,${window.btoa(base64)}`;
};

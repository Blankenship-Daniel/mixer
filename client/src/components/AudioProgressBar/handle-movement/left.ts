export const getLeftX = (e, rightHandlePos: number): number => {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target;
  const clientRect: DOMRect = el.parentElement.getBoundingClientRect();
  const leftBoundary: number = 0;
  const rightBoundary: number = clientRect.width - el.offsetWidth;
  const x: number = e.clientX - el.offsetWidth;
  const rightX: number = rightBoundary - rightHandlePos - el.offsetWidth * 2;

  if (x > rightX) {
    return rightX;
  }
  if (x < leftBoundary) {
    return leftBoundary;
  }
  if (x > rightBoundary) {
    return rightBoundary;
  }
  return x;
};

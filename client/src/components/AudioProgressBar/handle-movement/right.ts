export const getRightX = (e, leftHandlePos: number): number => {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target;
  const clientRect: DOMRect = el.parentElement.getBoundingClientRect();
  const leftBoundary: number = 0;
  const rightBoundary: number = clientRect.width - el.offsetWidth;
  const x: number = e.clientX - el.offsetWidth;
  const rightX: number = rightBoundary - x;
  const leftX: number = leftHandlePos + el.offsetWidth * 2;

  if (x < leftX) {
    return rightBoundary - leftX;
  }
  if (x < leftBoundary) {
    return rightBoundary;
  }
  if (x > rightBoundary) {
    return leftBoundary;
  }
  return rightX;
};

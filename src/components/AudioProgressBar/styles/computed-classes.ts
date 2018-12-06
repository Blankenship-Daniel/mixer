import classNames from 'classnames';

export const foregroundBarClasses = (classes: any): string => {
  return classNames(classes.foreground, classes.bar);
};

export const backgroundBarClasses = (classes: any): string => {
  return classNames(classes.background, classes.bar);
};

export const leftHandleClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.handle, classes.leftHandle, {
    [classes.pointerDown]: conditional,
  });
};

export const rightHandleClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.handle, classes.rightHandle, {
    [classes.pointerDown]: conditional,
  });
};

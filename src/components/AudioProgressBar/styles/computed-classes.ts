import classNames from 'classnames';

export const foregroundBarClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.foreground, classes.bar, {
    [classes.foregroundEditMode]: conditional,
  });
};

export const backgroundBarClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.background, classes.bar, {
    [classes.backgroundEditMode]: conditional,
  });
};

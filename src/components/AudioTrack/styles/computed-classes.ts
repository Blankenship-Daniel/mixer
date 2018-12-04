import classNames from 'classnames';

export const deleteIconClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.deleteIcon, {
    [classes.show]: conditional,
  });
};

export const playIconClasses = (classes: any, conditional: boolean): string => {
  return classNames(classes.playPauseIcon, {
    [classes.hide]: conditional,
  });
};

export const pauseIconClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.playPauseIcon, {
    [classes.hide]: conditional,
  });
};

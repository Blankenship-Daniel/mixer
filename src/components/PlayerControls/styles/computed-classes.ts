import classNames from 'classnames';

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

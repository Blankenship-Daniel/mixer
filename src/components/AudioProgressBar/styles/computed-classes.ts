import classNames from 'classnames';

export const foregroundBarClasses = (classes: any): string => {
  return classNames(classes.foreground, classes.bar);
};

export const backgroundBarClasses = (classes: any): string => {
  return classNames(classes.background, classes.bar);
};

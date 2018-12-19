import classNames from 'classnames';

export const dragAndDropClasses = (
  classes,
  isHovered: boolean,
  isHidden: boolean,
): string => {
  return classNames(classes.audioFileDropContainer, {
    [classes.hover]: isHovered,
    [classes.hide]: isHidden,
  });
};

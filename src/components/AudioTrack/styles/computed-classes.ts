import classNames from 'classnames';

export const deleteIconClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.deleteIcon, {
    [classes.show]: conditional,
  });
};

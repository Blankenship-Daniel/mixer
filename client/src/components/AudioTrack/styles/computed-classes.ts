import classNames from 'classnames';

export const deleteIconClasses = (
  classes: any,
  conditional: boolean,
): string => {
  return classNames(classes.deleteIcon, classes.icon, {
    [classes.show]: conditional,
  });
};

export const editIconClasses = (classes: any, conditional: boolean) => {
  return classNames(classes.editIcon, classes.icon, {
    [classes.show]: conditional,
  });
};

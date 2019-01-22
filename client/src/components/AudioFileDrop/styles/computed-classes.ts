import classNames from 'classnames';
import { AudioFileDropVariants } from '../variants';

export const dragAndDropClasses = (
  classes,
  isHovered: boolean,
  variant: AudioFileDropVariants,
): string => {
  return classNames(classes.audioFileDropContainer, classes[variant], {
    [classes.hover]: isHovered,
  });
};

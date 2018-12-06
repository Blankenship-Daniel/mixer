import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    progressBar: {
      display: 'block',
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      height: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    bar: {
      width: '100%',
      height: theme.spacing.unit,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: theme.shape.borderRadius,
    },
    foreground: {
      background: theme.palette.primary.dark,
      zIndex: 1,
    },
    background: {
      background: theme.palette.primary.light,
    },
    handle: {
      display: 'block',
      position: 'absolute',
      borderRadius: '50%',
      background: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      width: theme.spacing.unit * 3,
      height: theme.spacing.unit * 3,
      zIndex: 2,
    },
    pointerDown: {
      background: theme.palette.grey[200],
      boxShadow: theme.shadows[1],
    },
    leftHandle: {
      top: -theme.spacing.unit,
      left: 0,
    },
    rightHandle: {
      top: -theme.spacing.unit,
      right: 0,
    },
  });

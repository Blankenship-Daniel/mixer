import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    progressBar: {
      display: 'block',
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
    },
    bar: {
      width: '100%',
      height: theme.spacing.unit / 1.5,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    foreground: {
      background: theme.palette.primary.dark,
      zIndex: 1,
    },
    background: {
      background: theme.palette.primary.light,
    },
    foregroundEditMode: {
      background: theme.palette.secondary.dark,
    },
    backgroundEditMode: {
      background: theme.palette.secondary.light,
    },
  });

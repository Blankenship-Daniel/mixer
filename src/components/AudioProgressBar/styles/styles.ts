import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    progressBar: {
      display: 'block',
      position: 'relative',
      width: '100%',
    },
    bar: {
      width: '100%',
      height: theme.spacing.unit / 2,
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
  });

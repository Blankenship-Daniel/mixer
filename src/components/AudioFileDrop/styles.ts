import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    audioFileDropContainer: {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    hover: {
      borderColor: theme.palette.secondary.light,
      borderStyle: 'dashed',
      borderWidth: theme.spacing.unit,
      borderRadius: theme.shape.borderRadius,
    },
    hide: {
      display: 'none',
    },
  });

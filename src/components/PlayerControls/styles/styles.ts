import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    playPauseIcon: {
      height: 38,
      width: 38,
    },
    hide: {
      display: 'none',
    },
    disabled: {
      color: theme.palette.grey[200],
    },
  });

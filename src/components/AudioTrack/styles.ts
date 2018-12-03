import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      display: 'flex',
      margin: theme.spacing.unit,
      justifyContent: 'space-between',
    },
    deleteIcon: {
      display: 'none',
      position: 'absolute',
      top: theme.spacing.unit,
      right: theme.spacing.unit,
      color: theme.palette.secondary.dark,
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.secondary.light,
      },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 200,
    },
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
  });

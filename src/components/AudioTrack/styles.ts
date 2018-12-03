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
      position: 'absolute',
      top: theme.spacing.unit,
      right: theme.spacing.unit,
      color: theme.palette.action.active,
      cursor: 'pointer',
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
    playIcon: {
      height: 38,
      width: 38,
    },
  });

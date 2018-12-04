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
      color: theme.palette.error.dark,
      '&:hover': {
        color: theme.palette.error.light,
      },
      cursor: 'pointer',
      borderRadius: '50%',
      background: theme.palette.common.white,
      padding: theme.spacing.unit,
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
    show: {
      display: 'block',
    },
    progressBar: {
      width: '100%',
      height: theme.spacing.unit / 2,
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  });

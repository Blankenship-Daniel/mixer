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
      top: theme.spacing.unit,
      right: theme.spacing.unit,
      color: theme.palette.grey[800],
      '&:hover': {
        color: theme.palette.error.contrastText,
        background: theme.palette.error.dark,
      },
    },
    editIcon: {
      bottom: theme.spacing.unit,
      right: theme.spacing.unit,
      color: theme.palette.grey[800],
      '&:hover': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.dark,
      },
    },
    icon: {
      display: 'none',
      position: 'absolute',
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
      height: theme.spacing.unit / 1.5,
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    range: {
      height: theme.spacing.unit,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

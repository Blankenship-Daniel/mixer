import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { AudioFileDropVariants } from '../variants';

export const styles = (theme: Theme) =>
  createStyles({
    audioFileDropContainer: {
      display: 'flex',
      borderStyle: 'dashed',
      borderWidth: theme.spacing.unit,
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.grey[400],
      justifyContent: 'center',
      alignItems: 'center',
    },
    [AudioFileDropVariants.DRAWER]: {
      height: '182px',
      margin: theme.spacing.unit,
    },
    [AudioFileDropVariants.FULL_SCREEN]: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    hover: {
      borderColor: theme.palette.secondary.light,
    },
    dropZoneText: {
      color: theme.palette.grey[500],
      textTransform: 'uppercase',
    },
  });

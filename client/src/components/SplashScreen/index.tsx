import * as React from 'react';
import { connect } from 'react-redux';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import Typography from '@material-ui/core/Typography';
import { supportedFileTypes } from '../AudioFileDrop/sanitize-files/supported-file-types';
import { AudioMetaTag } from '../AudioFileDrop/metadata';
import { lang } from '../../config/lang/en';

interface PropsFromState {
  audioMeta: AudioMetaTag[];
}

type Props = WithStyles<typeof styles> & PropsFromState;
type State = {};

class SplashScreen extends React.Component<Props, State> {
  public showSplashScreen = classes => {
    return (
      <div className={classes.splash}>
        <div>
          <Typography className={classes.spacing} variant="h2">
            {lang.splashScreenHeader}
          </Typography>
          <Typography className={classes.spacing} variant="subtitle1">
            {`${lang.splashScreenSubtitle} `}
            <strong>{supportedFileTypes.join(', ')}</strong>
          </Typography>
        </div>
      </div>
    );
  };

  render() {
    const { classes, audioMeta } = this.props;
    return !audioMeta.length ? this.showSplashScreen(classes) : null;
  }
}

const mapStateToProps = ({ audioMeta }) => {
  return { audioMeta };
};

export default withStyles(styles)(connect(mapStateToProps)(SplashScreen));

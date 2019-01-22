import * as React from 'react';
import { compose } from 'redux';
import AppWideLoading from '../AppWideLoading';
import AudioTrackList from '../AudioTrackList';
import SplashScreen from '../SplashScreen';
import { withRoot } from '../../withRoot';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '../../theme';

type Props = WithStyles<typeof styles>;
type State = {};

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <AppWideLoading />
        <AudioTrackList />
        <SplashScreen />
      </div>
    );
  }
}

export default compose(
  withRoot,
  withStyles(styles),
)(App);

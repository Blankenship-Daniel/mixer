import * as React from 'react';
import AudioTrack from '../AudioTrack';
import { withRoot } from '../../withRoot';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '../../theme';

type State = {};

class App extends React.Component<WithStyles<typeof styles>, State> {
  render() {
    return (
      <div>
        <AudioTrack />
        <AudioTrack />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));

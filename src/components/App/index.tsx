import * as React from 'react';
import AudioTrack from '../AudioTrack';
import AudioFileDrop from '../AudioFileDrop';
import { withRoot } from '../../withRoot';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '../../theme';

type Props = WithStyles<typeof styles>;
type State = {};

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <AudioFileDrop />
        <AudioTrack />
        <AudioTrack />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));

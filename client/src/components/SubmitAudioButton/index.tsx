import * as React from 'react';
import { connect } from 'react-redux';
import { AudioMetaTag } from '../AudioFileDrop/metadata';
import Button from '@material-ui/core/Button';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { downloadAudioFile } from './download-audio-file';

interface PropsFromState {
  audioMeta: AudioMetaTag[];
}

type Props = PropsFromState & WithStyles<typeof styles>;
type State = {};

class SubmitAudioButton extends React.Component<Props, State> {
  render() {
    const { classes, audioMeta } = this.props;
    return (
      <Button
        className={classes.submitAudioBtn}
        variant={'contained'}
        color="primary"
        onClick={() => downloadAudioFile(audioMeta)}
      >
        Create Mix
      </Button>
    );
  }
}

const mapStateToProps = ({ audioMeta }) => ({ audioMeta });
export default withStyles(styles)(connect(mapStateToProps)(SubmitAudioButton));

import * as React from 'react';
import { styles } from './styles/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { playIconClasses, pauseIconClasses } from './styles/computed-classes';

interface IncomingProps {
  isPlaying: boolean;
  onPlay: Function;
  onPause: Function;
  onSkipNext: Function;
  onSkipPrev: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = {};

class PlayerControls extends React.Component<Props, State> {
  render() {
    const { classes, isPlaying } = this.props;
    return (
      <div className={classes.controls}>
        <IconButton aria-label="Previous">
          <SkipPreviousIcon onClick={() => this.props.onSkipPrev()} />
        </IconButton>
        <IconButton aria-label="Play/pause">
          <PlayArrowIcon
            className={playIconClasses(classes, !isPlaying)}
            onClick={() => this.props.onPlay()}
          />
          <Pause
            className={pauseIconClasses(classes, isPlaying)}
            onClick={() => this.props.onPause()}
          />
        </IconButton>
        <IconButton aria-label="Next">
          <SkipNextIcon onClick={() => this.props.onSkipNext()} />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerControls);

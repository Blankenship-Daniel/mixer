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
  isActive: boolean;
  isPlaying: boolean;
  onPlay: Function;
  onPause: Function;
  onSkipNext: Function;
  onSkipPrev: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = {};
type IconColorType = 'action' | 'disabled';

class PlayerControls extends React.Component<Props, State> {
  private iconColor = (isActive: boolean): IconColorType => {
    return isActive ? 'action' : 'disabled';
  };

  render() {
    const { classes, isActive, isPlaying } = this.props;
    return (
      <div className={classes.controls}>
        <IconButton aria-label="Previous">
          <SkipPreviousIcon
            color={this.iconColor(isActive)}
            onClick={() => this.props.onSkipPrev()}
          />
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
          <SkipNextIcon
            color={this.iconColor(isActive)}
            onClick={() => this.props.onSkipNext()}
          />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerControls);

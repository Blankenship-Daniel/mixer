import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const initialState = {
  src: '',
  isHovered: false,
};

interface IncomingProps {
  uuid: string;
  album: string;
  artist: string;
  image: string;
  title: string;
  src: string;
  delete: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = Readonly<typeof initialState>;

class AudioTrack extends React.Component<Props, State> {
  readonly state: State = initialState;

  private audio: HTMLAudioElement;

  constructor(props: Props) {
    super(props);
    this.audio = new Audio(props.src);
  }

  private playAudio = () => {
    this.audio.play();
  };

  private pauseAudio = () => {
    this.audio.pause();
  };

  public onMouseEnterEvent = e => {
    this.setState({ isHovered: true });
  };

  public onMouseLeaveEvent = e => {
    this.setState({ isHovered: false });
  };

  render() {
    const { classes } = this.props;
    const deleteIconClasses = (classes): string => {
      return classNames(classes.deleteIcon, {
        [classes.show]: this.state.isHovered,
      });
    };
    const playIconClasses = (classes): string => {
      return classNames(classes.playPauseIcon, {
        [classes.hide]: !this.audio.paused,
      });
    };
    const pauseIconClasses = (classes): string => {
      return classNames(classes.playPauseIcon, {
        [classes.hide]: this.audio.paused,
      });
    };

    return (
      <div
        onMouseOver={this.onMouseEnterEvent}
        onMouseEnter={this.onMouseEnterEvent}
        onMouseLeave={this.onMouseLeaveEvent}
        draggable
      >
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {this.props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.props.artist}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {this.props.album}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="Previous">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="Play/pause">
                <PlayArrowIcon
                  onClick={() => this.playAudio()}
                  className={playIconClasses(classes)}
                />
                <Pause
                  onClick={() => this.pauseAudio()}
                  className={pauseIconClasses(classes)}
                />
              </IconButton>
              <IconButton aria-label="Next">
                <SkipNextIcon />
              </IconButton>
            </div>
          </div>
          <CardMedia className={classes.cover} image={this.props.image} />
          <DeleteForeverIcon
            className={deleteIconClasses(classes)}
            onClick={() => this.props.delete(this.props.uuid)}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AudioTrack);

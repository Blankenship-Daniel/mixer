import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AudioProgressBar from '../AudioProgressBar';
import PlayerControls from '../PlayerControls';
import { styles } from './styles/styles';
import { deleteIconClasses } from './styles/computed-classes';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { deleteAudioMeta } from '../../store/audioMeta/actions';
import { setActiveAudio } from '../../store/activeAudio/actions';
import {
  getPrevTrack,
  getNextTrack,
} from './get-active-track/get-active-track';
import { Events } from './events';
import { HTML5AudioEvents } from './html5-audio-events';

const initialState = {
  src: '',
  isHovered: false,
  isPlaying: false,
  isEditMode: false,
  currentTime: 0,
  duration: 0,
  leftBound: 0,
};

interface PropsFromDispatch {
  deleteAudioMeta: Function;
  setActiveAudio: Function;
}

interface PropsFromState {
  activeAudio: any;
}

interface IncomingProps {
  uuid: string;
  album: string;
  artist: string;
  image: string;
  title: string;
  src: string;
  audioTrackIds: string[];
}

type Props = WithStyles<typeof styles> &
  IncomingProps &
  PropsFromDispatch &
  PropsFromState;
type State = Readonly<typeof initialState>;

class AudioTrack extends React.Component<Props, State> {
  readonly state: State = initialState;

  private audio: HTMLAudioElement;

  constructor(props: Props) {
    super(props);
    this.audio = new Audio(props.src);
  }

  private playAudio = () => {
    const id = this.props.uuid;
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  private pauseAudio = () => {
    const id = this.props.uuid;
    const event = Events.PAUSE;
    this.props.setActiveAudio({ id, event });
  };

  private skipPrev = () => {
    if (!this.isActiveAudio(this.props.uuid)) {
      return;
    }
    const id = getPrevTrack(this.props.uuid, this.props.audioTrackIds);
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  private skipNext = () => {
    if (!this.isActiveAudio(this.props.uuid)) {
      return;
    }
    const id = getNextTrack(this.props.uuid, this.props.audioTrackIds);
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  private isActiveAudio = (uuid: string): boolean => {
    if (!this.props.activeAudio) {
      return true;
    }
    return this.props.activeAudio.id === uuid;
  };

  private deleteAudioTrack = () => {
    this.audio.pause();
    this.audio.src = '';
    this.props.deleteAudioMeta(this.props.uuid);
  };

  private computeAudioState = () => {
    if (!this.isActiveAudio(this.props.uuid)) {
      this.audio.pause();
      return;
    }

    const event = this.props.activeAudio.event;
    switch (event) {
      case Events.PLAY:
        this.audio.play();
        break;
      case Events.PAUSE:
        this.audio.pause();
        break;
      default:
        break;
    }
  };

  private seekAudio = (seekedTime: number) => {
    this.audio.currentTime = seekedTime;
  };

  private leftBoundaryChange = (leftBound: number) => {
    console.log('leftBoundaryChange', leftBound);
    this.setState({ leftBound });
  };

  private rightBoundaryChange = (rightBound: number) => {
    console.log('rightBoundaryChange', rightBound);
  };

  public onMouseEnterEvent = e => {
    this.setState({ isHovered: true });
  };

  public onMouseLeaveEvent = e => {
    this.setState({ isHovered: false });
  };

  componentDidMount() {
    this.audio.addEventListener(HTML5AudioEvents.ENDED, () => {
      this.skipNext();
    });
    this.audio.addEventListener(HTML5AudioEvents.LOADED_METADATA, () => {
      this.setState({ duration: this.audio.duration });
    });
    this.audio.addEventListener(HTML5AudioEvents.TIME_UPDATE, () => {
      if (this.state.currentTime < this.state.leftBound) {
        this.pauseAudio();
        this.audio.currentTime = this.state.leftBound + 1;
        this.setState({ currentTime: this.state.leftBound });
      } else {
        this.setState({ currentTime: this.audio.currentTime });
      }
    });
  }

  render() {
    const { classes } = this.props;
    this.computeAudioState();

    return (
      <div
        className={classes.container}
        onMouseOver={this.onMouseEnterEvent}
        onMouseEnter={this.onMouseEnterEvent}
        onMouseLeave={this.onMouseLeaveEvent}
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
            <PlayerControls
              isActive={this.isActiveAudio(this.props.uuid)}
              isPlaying={this.audio.paused}
              onPlay={this.playAudio}
              onPause={this.pauseAudio}
              onSkipNext={this.skipNext}
              onSkipPrev={this.skipPrev}
            />
          </div>
          <CardMedia className={classes.cover} image={this.props.image} />
          <div className={deleteIconClasses(classes, this.state.isHovered)}>
            <DeleteForeverIcon onClick={() => this.deleteAudioTrack()} />
          </div>
        </Card>

        <AudioProgressBar
          value={this.state.currentTime}
          max={this.state.duration}
          onSeek={this.seekAudio}
          onLeftBoundaryChange={this.leftBoundaryChange}
          onRightBoundaryChange={this.rightBoundaryChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ activeAudio }) => ({ activeAudio });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteAudioMeta, setActiveAudio }, dispatch);
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioTrack);
export default withStyles(styles)(connectedComponent);

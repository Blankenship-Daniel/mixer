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
import { deleteAudioMeta, editAudioMeta } from '../../store/audioMeta/actions';
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

  // We won't know this value until the user moves the right handle,
  //  so we just set it arbitrarily high to begin with
  rightBound: Infinity,
};

interface PropsFromDispatch {
  deleteAudioMeta: Function;
  editAudioMeta: Function;
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
  private onEndedListener: EventListener;
  private onTimeUpdateListener: EventListener;
  private onLoadedMetaDataListener: EventListener;

  constructor(props: Props) {
    super(props);
    this.audio = new Audio(props.src);
  }

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

    const event: string = this.props.activeAudio.event;
    switch (event) {
      case Events.PLAY:
        return this.audio.play();
      case Events.PAUSE:
        return this.audio.pause();
    }
  };

  private onMouseEnterEvent = e => {
    this.setState({ isHovered: true });
  };

  private onMouseLeaveEvent = e => {
    this.setState({ isHovered: false });
  };

  //////////////////////////////
  // AUDIO PROGRESS BAR EVENTS
  //////////////////////////////

  private onLeftBoundaryChange = (leftBound: number) => {
    this.setState({ leftBound });
    this.props.editAudioMeta({
      uuid: this.props.uuid,
      customStartTime: leftBound,
      customEndTime: this.state.rightBound,
    });
  };

  private onRightBoundaryChange = (rightBound: number) => {
    this.setState({ rightBound });
    this.props.editAudioMeta({
      uuid: this.props.uuid,
      customStartTime: this.state.leftBound,
      customEndTime: rightBound,
    });
  };

  private onSeekAudio = (seekedTime: number) => {
    this.audio.currentTime = seekedTime;
  };

  //////////////////////////////
  // PLAYER CONTROLS EVENTS
  //////////////////////////////

  private onPauseAudio = () => {
    const id = this.props.uuid;
    const event = Events.PAUSE;
    this.props.setActiveAudio({ id, event });
  };

  private onPlayAudio = () => {
    const id = this.props.uuid;
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  private onSkipNext = () => {
    if (!this.isActiveAudio(this.props.uuid)) {
      return;
    }
    const id = getNextTrack(this.props.uuid, this.props.audioTrackIds);
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  private onSkipPrev = () => {
    if (!this.isActiveAudio(this.props.uuid)) {
      return;
    }
    const id = getPrevTrack(this.props.uuid, this.props.audioTrackIds);
    const event = Events.PLAY;
    this.props.setActiveAudio({ id, event });
  };

  //////////////////////////////
  // HTML5 AUDIO EVENTS
  //////////////////////////////

  private onEnded = () => {
    this.onSkipNext();
  };

  private onLoadedMetaData = () => {
    this.setState({ duration: this.audio.duration });
  };

  private onTimeUpdate = () => {
    if (
      this.state.currentTime < this.state.leftBound ||
      this.state.currentTime > this.state.rightBound
    ) {
      this.onPauseAudio();
      this.audio.currentTime = this.state.leftBound + 1;
      this.setState({ currentTime: this.state.leftBound });
    } else {
      this.setState({ currentTime: this.audio.currentTime });
    }
  };

  componentDidMount() {
    this.onEndedListener = this.onEnded.bind(this);
    this.onTimeUpdateListener = this.onTimeUpdate.bind(this);
    this.onLoadedMetaDataListener = this.onLoadedMetaData.bind(this);

    this.audio.addEventListener(HTML5AudioEvents.ENDED, this.onEndedListener);
    this.audio.addEventListener(
      HTML5AudioEvents.LOADED_METADATA,
      this.onLoadedMetaDataListener,
    );
    this.audio.addEventListener(
      HTML5AudioEvents.TIME_UPDATE,
      this.onTimeUpdateListener,
    );
  }

  componentWillUnmount() {
    this.audio.removeEventListener(
      HTML5AudioEvents.ENDED,
      this.onEndedListener,
    );
    this.audio.removeEventListener(
      HTML5AudioEvents.LOADED_METADATA,
      this.onLoadedMetaDataListener,
    );
    this.audio.removeEventListener(
      HTML5AudioEvents.TIME_UPDATE,
      this.onTimeUpdateListener,
    );
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
              onPlay={this.onPlayAudio}
              onPause={this.onPauseAudio}
              onSkipNext={this.onSkipNext}
              onSkipPrev={this.onSkipPrev}
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
          onSeek={this.onSeekAudio}
          onLeftBoundaryChange={this.onLeftBoundaryChange}
          onRightBoundaryChange={this.onRightBoundaryChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ activeAudio }) => ({ activeAudio });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { deleteAudioMeta, editAudioMeta, setActiveAudio },
    dispatch,
  );
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioTrack);
export default withStyles(styles)(connectedComponent);

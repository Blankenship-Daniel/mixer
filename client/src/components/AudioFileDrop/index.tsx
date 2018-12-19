import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles/styles';
import { dragAndDropClasses } from './styles/computed-classes';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { AudioMetaTag, CustomFile, MetaData } from './metadata';
import { sanitizeFiles } from './sanitize-files';
import { setAudioMeta } from '../../store/audioMeta/actions';
import { uploadFiles } from './upload-files';

const initialState = {
  isHovered: false,
  isHidden: false,
};

interface IncomingProps {
  children: React.ReactChildren;
}

interface PropsFromDispatch {
  setAudioMeta: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps & PropsFromDispatch;
type State = Readonly<typeof initialState>;

class AudioFileDrop extends React.Component<Props, State> {
  readonly state: State = initialState;

  private onDrop = async e => {
    this.setState({ isHidden: true, isHovered: false });
    const fileList: FileList = e.dataTransfer.files;
    const files: CustomFile[] = Array.from(fileList) as CustomFile[];
    const metaData: MetaData = new MetaData(sanitizeFiles(files));
    const audioMeta: AudioMetaTag[] = await metaData.getMetaData();
    uploadFiles(metaData.getFiles());
    this.props.setAudioMeta(audioMeta);
  };

  private onDragEnter = e => {
    this.setState({
      isHovered: true,
    });
  };

  private onDragLeave = e => {
    this.setState({
      isHovered: false,
    });
  };

  private preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  public onDropEvent = e => {
    this.preventDefaults(e);
    this.onDrop(e);
  };

  public onDragEnterEvent = e => {
    this.preventDefaults(e);
    this.onDragEnter(e);
  };

  public onDragLeaveEvent = e => {
    this.preventDefaults(e);
    this.onDragLeave(e);
  };

  public onDragOverEvent = e => {
    this.preventDefaults(e);
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={dragAndDropClasses(
          classes,
          this.state.isHovered,
          this.state.isHidden,
        )}
        onDrop={this.onDropEvent}
        onDragEnter={this.onDragEnterEvent}
        onDragLeave={this.onDragLeaveEvent}
        onDragOver={this.onDragOverEvent}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAudioMeta,
    },
    dispatch,
  );
};

export default withStyles(styles)(
  connect(
    undefined,
    mapDispatchToProps,
  )(AudioFileDrop),
);

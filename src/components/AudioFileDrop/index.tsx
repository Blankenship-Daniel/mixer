import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { AudioMetaTag, getMetadata } from './get-metadata/get-metadata';
import { sanitizeFiles } from './sanitize-files';
import { setAudioMeta } from '../../store/audioMeta/actions';

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

  private dragAndDropClasses = (classes): string => {
    return classNames(classes.audioFileDropContainer, {
      [classes.hover]: this.state.isHovered,
      [classes.hide]: this.state.isHidden,
    });
  };

  private onDrop = async e => {
    this.setState({ isHidden: true, isHovered: false });
    const files: File[] = Array.from(e.dataTransfer.files);
    const audioMeta: AudioMetaTag[] = await compose(
      getMetadata,
      sanitizeFiles,
    )(files);
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
        className={this.dragAndDropClasses(classes)}
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

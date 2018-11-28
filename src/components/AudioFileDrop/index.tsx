import * as React from 'react';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const initialState = {
  isHovered: false,
};

type Props = WithStyles<typeof styles>;
type State = Readonly<typeof initialState>;

class AudioFileDrop extends React.Component<Props, State> {
  readonly state: State = initialState;

  constructor(props) {
    super(props);
  }

  private onDrop(e) {
    this.preventDefaults(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    console.log('onDrop', files);
    this.setState({
      isHovered: false,
    });
  }

  private onDragEnter(e) {
    this.preventDefaults(e);
    this.setState({
      isHovered: true,
    });
  }

  private onDragLeave(e) {
    this.preventDefaults(e);
    this.setState({
      isHovered: false,
    });
  }

  private onDragOver(e) {
    this.preventDefaults(e);
  }

  private preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { classes } = this.props;
    const dragAndDropClasses = classNames(classes.fileDropContainer, {
      [classes.hover]: this.state.isHovered,
    });
    return (
      <div
        className={dragAndDropClasses}
        onDrop={e => this.onDrop(e)}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDragOver={e => this.onDragOver(e)}
      />
    );
  }
}

export default withStyles(styles)(AudioFileDrop);

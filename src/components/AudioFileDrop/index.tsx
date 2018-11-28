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

  private onDragOver(e) {
    console.log('onDragOver', this.state.isHovered);
  }

  private onDragEnter(e) {
    this.setState({
      isHovered: true,
    });
  }

  private onDragLeave(e) {
    this.setState({
      isHovered: false,
    });
  }

  render() {
    const { classes } = this.props;
    const dragAndDropClasses = classNames(classes.fileDropContainer, {
      [classes.hover]: this.state.isHovered,
    });
    return (
      <div
        className={dragAndDropClasses}
        onDragOver={e => this.onDragOver(e)}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
      />
    );
  }
}

export default withStyles(styles)(AudioFileDrop);

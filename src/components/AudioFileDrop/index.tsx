import * as React from 'react';
import { compose } from 'redux';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { getMetadata } from './get-metadata';
import { sanitizeFiles } from './sanitize-files';
import { preventDefaults } from './prevent-defaults';

const initialState = {
  isHovered: false,
};

type Props = WithStyles<typeof styles>;
type State = Readonly<typeof initialState>;

class AudioFileDrop extends React.Component<Props, State> {
  readonly state: State = initialState;

  private dragAndDropClasses(): string {
    const { classes } = this.props;
    return classNames(classes.audioFileDropContainer, {
      [classes.hover]: this.state.isHovered,
    });
  }

  private onDrop = async e => {
    const files: FileList = e.dataTransfer.files;
    const audioMeta: any[] = await compose(
      getMetadata,
      sanitizeFiles,
    )(files);

    console.log(audioMeta);

    this.setState({
      isHovered: false,
    });
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

  render() {
    return (
      <div
        className={this.dragAndDropClasses()}
        onDrop={e => {
          this.preventDefaults(e);
          this.onDrop(e);
        }}
        onDragEnter={e => {
          this.preventDefaults(e);
          this.onDragEnter(e);
        }}
        onDragLeave={e => {
          this.preventDefaults(e);
          this.onDragLeave(e);
        }}
        onDragOver={e => this.preventDefaults(e)}
      />
    );
  }
}

export default withStyles(styles)(AudioFileDrop);

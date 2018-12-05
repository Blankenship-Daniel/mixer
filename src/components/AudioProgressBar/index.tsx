import * as React from 'react';
import { styles } from './styles/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {
  foregroundBarClasses,
  backgroundBarClasses,
} from './styles/computed-classes';

interface IncomingProps {
  className: any;
  isEditMode: boolean;
  max: number;
  value: number;
  onSeek: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = {};

class AudioProgressBar extends React.Component<Props, State> {
  private seek = e => {
    this.props.onSeek(
      (e.clientX / e.target.parentElement.offsetWidth) * this.props.max,
    );
  };

  render() {
    const { classes, value, max, isEditMode } = this.props;
    const progress = (value / max) * 100;
    return (
      <div onClick={e => this.seek(e)} className={this.props.className}>
        <div className={classes.progressBar}>
          <div className={backgroundBarClasses(classes, isEditMode)} />
          <div
            style={{ width: `${progress}%` }}
            className={foregroundBarClasses(classes, isEditMode)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AudioProgressBar);

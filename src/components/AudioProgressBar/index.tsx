import * as React from 'react';
import { styles } from './styles/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { foregroundBarClasses, backgroundBarClasses } from './styles/classes';

interface IncomingProps {
  className: any;
  max: number;
  value: number;
  seek: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = {};

class AudioProgressBar extends React.Component<Props, State> {
  private seek = e => {
    this.props.seek((e.clientX / e.target.offsetWidth) * this.props.max);
  };

  render() {
    const { classes, value, max } = this.props;
    const progress = (value / max) * 100;
    return (
      <div onClick={e => this.seek(e)} className={this.props.className}>
        <div className={classes.progressBar}>
          <div className={backgroundBarClasses(classes)} />
          <div
            style={{ width: `${progress}%` }}
            className={foregroundBarClasses(classes)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AudioProgressBar);

import * as React from 'react';
import { styles } from './styles/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {
  foregroundBarClasses,
  backgroundBarClasses,
  leftHandleClasses,
  rightHandleClasses,
} from './styles/computed-classes';
import { Slider } from './sliders';
import { getLeftX, getRightX } from './handle-movement';

const initialState = {
  leftHandlePos: 0,
  rightHandlePos: 0,
  pointerDownLeft: false,
  pointerDownRight: false,
};

interface IncomingProps {
  max: number;
  value: number;
  onSeek: Function;
  onLeftBoundaryChange: Function;
  onRightBoundaryChange: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
type State = Readonly<typeof initialState>;

class AudioProgressBar extends React.Component<Props, State> {
  readonly state: State = initialState;

  private onSeekEvent = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSeek(
      (e.clientX / e.target.parentElement.offsetWidth) * this.props.max,
    );
  };

  private onPointerDownEvent = e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
  };

  private onPointerLeftMoveEvent = e => {
    if (this.state.pointerDownLeft) {
      this.setState({ leftHandlePos: getLeftX(e, this.state.rightHandlePos) });
    }
  };

  private onPointerRightMoveEvent = e => {
    if (this.state.pointerDownRight) {
      this.setState({ rightHandlePos: getRightX(e, this.state.leftHandlePos) });
    }
  };

  private onPointerUpEvent = e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
  };

  render() {
    const { classes, value, max } = this.props;
    const progress = (value / max) * 100;
    return (
      <div onClick={e => this.onSeekEvent(e)}>
        <div className={classes.progressBar}>
          <div className={backgroundBarClasses(classes)} />
          <div
            style={{ width: `${progress}%` }}
            className={foregroundBarClasses(classes)}
          />

          <div
            onPointerDown={e => {
              this.setState({ pointerDownLeft: true });
              this.onPointerDownEvent(e);
            }}
            onPointerMove={e => this.onPointerLeftMoveEvent(e)}
            onPointerUp={(e: any) => {
              this.setState({ pointerDownLeft: false });
              this.onPointerUpEvent(e);
              const leftBoundTime: number =
                (this.state.leftHandlePos /
                  e.target.parentElement.offsetWidth) *
                this.props.max;
              this.props.onLeftBoundaryChange(leftBoundTime);
            }}
            data-slider={Slider.LEFT_HANDLE}
            style={{ left: this.state.leftHandlePos }}
            className={leftHandleClasses(classes, this.state.pointerDownLeft)}
          />
          <div
            onPointerDown={e => {
              this.setState({ pointerDownRight: true });
              this.onPointerDownEvent(e);
            }}
            onPointerMove={e => this.onPointerRightMoveEvent(e)}
            onPointerUp={(e: any) => {
              this.setState({ pointerDownRight: false });
              this.onPointerUpEvent(e);
              const parentElWidth: number = e.target.parentElement.offsetWidth;
              const rightBoundTime: number =
                ((parentElWidth - this.state.rightHandlePos) / parentElWidth) *
                this.props.max;
              this.props.onRightBoundaryChange(rightBoundTime);
            }}
            data-slider={Slider.RIGHT_HANDLE}
            style={{ right: this.state.rightHandlePos }}
            className={rightHandleClasses(classes, this.state.pointerDownRight)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AudioProgressBar);

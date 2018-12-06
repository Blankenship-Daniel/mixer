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
    e.preventDefault();
    e.stopPropagation();
    if (this.state.pointerDownLeft) {
      const el = e.target;
      const clientRect: DOMRect = el.parentElement.getBoundingClientRect();
      const leftBoundary: number = 0;
      const rightBoundary: number = clientRect.width - el.offsetWidth;
      const x: number = e.clientX - el.offsetWidth;
      const rightX: number =
        rightBoundary - this.state.rightHandlePos - el.offsetWidth * 2;

      if (x > rightX) {
        this.setState({ leftHandlePos: rightX });
      } else if (x < leftBoundary) {
        this.setState({ leftHandlePos: leftBoundary });
      } else if (x > rightBoundary) {
        this.setState({ leftHandlePos: rightBoundary });
      } else {
        this.setState({ leftHandlePos: x });
      }
    }
  };

  private onPointerRightMoveEvent = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.pointerDownRight) {
      const el = e.target;
      const clientRect: DOMRect = el.parentElement.getBoundingClientRect();
      const leftBoundary: number = 0;
      const rightBoundary: number = clientRect.width - el.offsetWidth;
      const x: number = e.clientX - el.offsetWidth;
      const rightX: number = rightBoundary - x;
      const leftX: number = this.state.leftHandlePos + el.offsetWidth * 2;

      if (x < leftX) {
        this.setState({ rightHandlePos: rightBoundary - leftX });
      } else if (x < leftBoundary) {
        this.setState({ rightHandlePos: rightBoundary });
      } else if (x > rightBoundary) {
        this.setState({ rightHandlePos: leftBoundary });
      } else {
        this.setState({ rightHandlePos: rightX });
      }
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
            onPointerUp={e => {
              this.setState({ pointerDownLeft: false });
              this.onPointerUpEvent(e);
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
            onPointerUp={e => {
              this.setState({ pointerDownRight: false });
              this.onPointerUpEvent(e);
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

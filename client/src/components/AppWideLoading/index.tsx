import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

interface PropsFromState {
  appWideLoading: boolean;
}
type Props = WithStyles<typeof styles> & PropsFromState;
type State = {};

class AppWideLoading extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      this.props.appWideLoading && (
        <div className={classes.appWideLoading}>
          <div className={classes.progress}>
            <CircularProgress size={80} color="primary" />
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ appWideLoading }) => ({ appWideLoading });
const connectedComponent = connect(mapStateToProps)(AppWideLoading);
export default withStyles(styles)(connectedComponent);

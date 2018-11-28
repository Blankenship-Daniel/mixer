import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

type Props = WithStyles<typeof styles>;
type State = {};

class AudioTrack extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div draggable>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h5" variant="h5">
              Blaze On
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Phish
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AudioTrack);

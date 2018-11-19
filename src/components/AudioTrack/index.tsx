import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

class AudioTrack extends React.Component<WithStyles<typeof styles>, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
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
    );
  }
}

export default withStyles(styles)(AudioTrack);

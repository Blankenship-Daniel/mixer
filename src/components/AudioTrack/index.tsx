import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { styles } from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

interface IncomingProps {
  uuid: string;
  album: string;
  artist: string;
  image: string;
  title: string;
  src: string;
  delete: Function;
}

type Props = WithStyles<typeof styles> & IncomingProps;
interface State {
  src: string;
}

class AudioTrack extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <div draggable>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {this.props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.props.artist}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {this.props.album}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="Previous">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="Play/pause">
                <PlayArrowIcon
                  onClick={e => new Audio(this.props.src).play()}
                  className={classes.playIcon}
                />
              </IconButton>
              <IconButton aria-label="Next">
                <SkipNextIcon />
              </IconButton>
            </div>
          </div>
          <CardMedia className={classes.cover} image={this.props.image} />
          <DeleteForeverIcon
            className={classes.deleteIcon}
            onClick={() => this.props.delete(this.props.uuid)}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AudioTrack);

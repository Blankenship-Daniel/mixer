import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AudioTrack from '../AudioTrack';
import { AudioMetaTag } from '../AudioFileDrop/get-metadata/get-metadata';
import { deleteAudioMeta } from '../../store/audio/actions';

interface PropsFromState {
  audioMeta: AudioMetaTag[];
}

interface PropsFromDispatch {
  deleteAudioMeta: Function;
}

type Props = PropsFromState & PropsFromDispatch;
type State = {};

class AudioTrackList extends React.Component<Props, State> {
  private deleteAudioTrack = (uuid: string) => {
    this.props.deleteAudioMeta(uuid);
  };

  render() {
    const audioTracks = this.props.audioMeta.map(meta => (
      <AudioTrack
        uuid={meta.id}
        key={meta.id}
        title={meta.title}
        artist={meta.artist}
        album={meta.album}
        image={meta.imageDataUrl}
        src={meta.src}
        delete={this.deleteAudioTrack}
      />
    ));
    return <div>{audioTracks}</div>;
  }
}

const mapStateToProps = ({ audioMeta }) => ({ audioMeta });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteAudioMeta }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioTrackList);

import * as React from 'react';
import { connect } from 'react-redux';
import AudioTrack from '../AudioTrack';
import { AudioMetaTag } from '../AudioFileDrop/get-metadata/get-metadata';

interface PropsFromState {
  audioMeta: AudioMetaTag[];
}

type Props = PropsFromState;
type State = {};

class AudioTrackList extends React.Component<Props, State> {
  render() {
    const audioTrackIds = this.props.audioMeta.map(meta => meta.id);
    const audioTracks = this.props.audioMeta.map(meta => (
      <AudioTrack
        uuid={meta.id}
        key={meta.id}
        title={meta.title}
        artist={meta.artist}
        album={meta.album}
        image={meta.imageDataUrl}
        src={meta.src}
        audioTrackIds={audioTrackIds}
      />
    ));
    return <div>{audioTracks}</div>;
  }
}

const mapStateToProps = ({ audioMeta }) => ({ audioMeta });
export default connect(mapStateToProps)(AudioTrackList);

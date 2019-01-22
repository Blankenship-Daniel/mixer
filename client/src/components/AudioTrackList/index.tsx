import * as React from 'react';
import { connect } from 'react-redux';
import AudioTrack from '../AudioTrack';
import { AudioMetaTag } from '../AudioFileDrop/metadata';
import SubmitAudioButton from '../SubmitAudioButton';
import AudioFileDrop from '../AudioFileDrop';
import { AudioFileDropVariants } from '../AudioFileDrop/variants';
import { lang } from '../../config/lang/en';

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
        image={meta.imageSrc}
        src={meta.src}
        audioTrackIds={audioTrackIds}
      />
    ));
    return (
      <div>
        {audioTracks.length ? (
          <div>
            {audioTracks}
            <AudioFileDrop variant={AudioFileDropVariants.DRAWER}>
              {lang.dropZone}
            </AudioFileDrop>
            <SubmitAudioButton />
          </div>
        ) : (
          <AudioFileDrop variant={AudioFileDropVariants.FULL_SCREEN} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ audioMeta }) => ({ audioMeta });
export default connect(mapStateToProps)(AudioTrackList);

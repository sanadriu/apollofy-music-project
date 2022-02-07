import React from "react";
import styled from "styled-components";
import { AudioPlayerControlSprite, AudioPlayer } from "react-audio-player-pro";
import reactAudioPlayerProStyle from "react-audio-player-pro/dist/style.css";
import { useSelector } from "react-redux";

import { tracksSelector } from "../../../redux/tracks";

const AudioWrapper = styled(AudioPlayer)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  border: 2px solid lightgray;

  @media only screen and (max-width: 992px) {
    bottom: 4.3rem;
    width: 100vw;
  }
`;

const audioTrackList = [
  {
    // string - path to audio file, required
    src: "/path/to/audio/file",

    // React$Node - custom content instead of title, optional, deafult: <title> or <src>
    // content: <CustomContent />,

    // MediaMetadata - media meta data, see `mediaMetadata` above
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata
    // optional
    mediaMetadata: {
      title: "Lesser Faith",
      artist: "J. Syreus Bach",
      album: "Ability to Break ~ Energetic Tracks",
      artwork: [
        { src: "/path/to/image/64px/64px", sizes: "64x64", type: "image/png" },
        { src: "/path/to/image/128px/128px", sizes: "128x128", type: "image/png" },
      ],
    },
  },
  // other tracks here...
];

export function ExampleAudioPlayer() {
  const tracks = useSelector(tracksSelector);

  // console.log(tracks)

  return (
    <>
      <AudioPlayerControlSprite />
      <AudioWrapper
        // Array<TrackType> - list of track, see `audioTrackList` above, required
        trackList={audioTrackList}

        // string - wrapper's class name, optional, deafult: ''
        className="reproduction-bar"

        // callback function - called on did mount, optional, default: noop
        // onDidMount={console.log("autoplay not working")}

        // default player state, optional
        defaultState={{
          // boolean - is player muted, optional, default: false
          isMuted: false,

          // number - active song index, optional, default: 0
          activeIndex: 0,

          // boolean - is shuffle on, optional, default: false
          isShuffleOn: false,

          // boolean - is track list open, optional, default: true
          isTrackListOpen: false,

          // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'
          repeatingState: "none",
        }}
      />
    </>
  );
}

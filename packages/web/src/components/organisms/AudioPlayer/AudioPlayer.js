import React from "react";
import styled from "styled-components";
import { AudioPlayerControlSprite, AudioPlayer, PlayListPanel } from "react-audio-player-pro";
import reactAudioPlayerProStyle from "react-audio-player-pro/dist/style.css";
import { useSelector } from "react-redux";

import { tracksSelector } from "../../../redux/tracks";

const AudioWrapper = styled(AudioPlayer)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  border: 2px solid lightgray;
`;

export function ExampleAudioPlayer() {
  const tracks = useSelector(tracksSelector);

  const audioTrackList = [];
  let audioTrack;

  tracks?.list.map((track) => {
    audioTrack = {}

    audioTrack = {
      src: track.url || null,
      mediaMetadata: {
        title: track.title || null,
        artist: track.user.username || null,
        album: track.album || null,
        artwork: [
          { src: track.thumbnails.url_default || null, sizes: "64x64", type: "image/png" },
          { src: track.thumbnails.url_medium || null, sizes: "64x64", type: "image/png" },
        ],
      }
    };

    return audioTrackList.push(audioTrack)
  })

  return (
    <>
      <AudioPlayerControlSprite />
      <PlayListPanel />
      <AudioWrapper
        // Array<TrackType> - list of track, see `audioTrackList` above, required
        trackList={audioTrackList}

        // string - wrapper's class name, optional, deafult: ''
        className="reproduction-bar"

        // callback function - called on did mount, optional, default: noop
        onDidMount={console.log}

        // default player state, optional
        defaultState={{
          // boolean - is player muted, optional, default: false
          isMuted: false,

          // number - active song index, optional, default: 0
          activeIndex: 0,

          // boolean - is shuffle on, optional, default: false
          isShuffleOn: false,

          // boolean - is track list open, optional, default: true
          isTrackListOpen: true,

          // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'
          repeatingState: "none",
        }}
      />
    </>
  );
}

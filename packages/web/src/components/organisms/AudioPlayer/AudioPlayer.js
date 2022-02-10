import React, { useEffect } from "react";
import styled from "styled-components";
import { AudioPlayerControlSprite, AudioPlayer } from "react-audio-player-pro";
import reactAudioPlayerProStyle from "react-audio-player-pro/dist/style.css";
import { useSelector } from "react-redux";

import { tracksSelector } from "../../../redux/tracks";

const AudioWrapper = styled(AudioPlayer)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  button {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border: none;
  }

  @media only screen and (max-width: 992px) {
    bottom: 4.3rem;
    width: 100vw;
  }
`;

export function ExampleAudioPlayer() {
  const { list } = useSelector(tracksSelector);

  const createList = () => {
    return list.map((track) => ({
      src: track.url,
      mediaMetadata: {
        title: track?.title,
        artist: track?.user?.username,
        album: track?.album ? track.album : "",
        artwork: [
          { src: track?.thumbnails?.url_default, sizes: "64x64", type: "image/png" },
          { src: track?.thumbnails?.url_default, sizes: "128x128", type: "image/png" },
        ],
      },
    }));
  };

  // const audioTrackList = createList();

  // const audioTrackList = [
  //   {
  //     // string - path to audio file, required
  //     src: "/path/to/audio/file",
  //     mediaMetadata: {
  //       title: "Lesser Faith",
  //       artist: "J. Syreus Bach",
  //       album: "Ability to Break ~ Energetic Tracks",
  //       artwork: [
  //         { src: "/path/to/image/64px/64px", sizes: "64x64", type: "image/png" },
  //         { src: "/path/to/image/128px/128px", sizes: "128x128", type: "image/png" },
  //       ],
  //     },
  //   },
  //   // other tracks here...
  // ];

  return (
    <>
      <AudioPlayerControlSprite />
      <AudioWrapper
        // Array<TrackType> - list of track, see `audioTrackList` above, required
        trackList={createList()}
        // string - wrapper's class name, optional, deafult: ''
        className="reproduction-bar"
        // callback function - called on did mount, optional, default: noo
        // default player state, optional
        defaultState={{
          // boolean - is player muted, optional, default: false
          isMuted: false,

          // number - active song index, optional, default: 0
          activeIndex: 1,

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

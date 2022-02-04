// components/Player.js
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from "react-redux";

import { tracksSelector } from "../../../redux/tracks";

export const Player = () => {
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
      <AudioPlayer
        autoPlay
        src={audioTrackList[0].src}
        onPlay={e => console.log("onPlay")}
      // other props here
      />
    </>
  )
}
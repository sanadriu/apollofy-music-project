// components/Player.js
import React from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import styles from 'react-jinke-music-player/assets/index.module.css'
import Locale from 'react-jinke-music-player/lib/config/locale'
import { useSelector } from "react-redux";

import { tracksSelector } from "../../../redux/tracks";

const customLocale = {
  playModeText: {
    order: '',
    orderLoop: '',
    singleLoop: '',
    shufflePlay: ''
  },
  openText: '',
  closeText: '',
  emptyText: '',
  clickToPlayText: '',
  clickToPauseText: '',
  nextTrackText: '',
  previousTrackText: '',
  reloadText: '',
  volumeText: '',
  playListsText: '',
  toggleLyricText: '',
  toggleMiniModeText: '',
  destroyText: '',
  downloadText: '',
  lightThemeText: '',
  darkThemeText: '',
  switchThemeText: '',
  removeAudioListsText: '',
  controllerTitle: '',
  emptyLyricText: '',
  clickToDeleteText: (name) => ``,
  audioTitle: ''
  // audioTitle: (audioInfo) => ``
}

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
      <ReactJkMusicPlayer
        volumeFade={{ fadeIn: 500, fadeOut: 500 }}
        locale={Locale.en_US}
        audioLists={audioTrackList}
        clearPriorAudioLists
        theme="auto"
        styles={styles}
      />
    </>
  )
}
import { normalize, schema } from "normalizr";
import { track } from "./track-schema";

const playlist = new schema.Entity("playlists", {}, { idAttribute: "_id" });

const fullPlaylist = new schema.Entity(
  "playlists",
  {
    tracks: [track],
  },
  { idAttribute: "_id" },
);

export function normalizePlaylists(playlists) {
  return normalize(playlists, [playlist]);
}

export function normalizeFullPlaylists(playlists) {
  return normalize(playlists, [fullPlaylist]);
}

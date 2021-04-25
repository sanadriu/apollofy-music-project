import { normalize, schema } from "normalizr";

const genre = new schema.Entity("genres", {}, { idAttribute: "_id" });

export function normalizeGenres(genres) {
  return normalize(genres, [genre]);
}

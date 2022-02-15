import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import { useSearch } from "../../../hooks/useSearch";
import MiddleTitle from "../../atoms/headings/MiddleTitle";
import {
  SectionLayout,
  TracksList,
  TracksText,
} from "../../organisms/information/PopularTracks/PopularTracks";
import TrackDetail from "../TrackDetail";
import UserDetail from "../UserDetail";
import AlbumDetail from "../AlbumDetail";
import PlaylistDetail from "../PlaylistDetail";

const SearchButton = styled(IconButton)`
  height: 2rem;
  border-radius: 50%;
  &:hover {
    background-color: lightgray;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: none;
  padding-left: 1rem;
  outline: none;
  border-radius: 10rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Layout = styled.form`
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1.3rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const SearchIconStyled = styled(SearchIcon)`
  color: ${({ theme }) => theme.colors.text};
  border-radius: 100%;
  &:hover {
    background-color: inherit;
  }
`;

export default function SearchBar() {
  const [query, setQuery] = useState(null);

  const handleType = (value) => {
    setQuery(value);
  };

  const { data, refetch } = useSearch(query, 1);

  const SearchRequest = data?.data?.data === undefined ? null : data?.data?.data;

  function handleSubmit() {
    refetch();
  }

  return (
    <>
      <Layout
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <SearchButton
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <SearchIconStyled />
        </SearchButton>
        <SearchInput
          placeholder="Search for some music"
          onChange={(e) => handleType(e.target.value)}
        />
      </Layout>
      {SearchRequest && (
        <>
          <MiddleTitle>Includes &quot;{query}&quot;</MiddleTitle>
          <SectionLayout>
            {SearchRequest?.tracks?.length !== 0 ? (
              <>
                <TracksText>Tracks</TracksText>
                <TracksList>
                  {SearchRequest?.tracks?.map((track) => (
                    <TrackDetail key={track.id} track={track} />
                  ))}
                </TracksList>
              </>
            ) : (
              <TracksText>No tracks found</TracksText>
            )}
            {SearchRequest?.albums?.length !== 0 ? (
              <>
                <TracksText>Albums</TracksText>
                <TracksList>
                  {SearchRequest?.albums?.map((album) => (
                    <AlbumDetail key={album.id} album={album} />
                  ))}
                </TracksList>
              </>
            ) : (
              <TracksText>No albums found</TracksText>
            )}
            {SearchRequest?.playlists?.length !== 0 ? (
              <>
                <TracksText>Playlists</TracksText>
                <TracksList>
                  {SearchRequest?.playlists?.map((playlist) => (
                    <PlaylistDetail key={playlist.id} playlist={playlist} />
                  ))}
                </TracksList>
              </>
            ) : (
              <TracksText>No playlists found</TracksText>
            )}
            {SearchRequest?.users?.length !== 0 ? (
              <>
                <TracksText>Users</TracksText>
                <TracksList>
                  {SearchRequest?.users?.map((user) => (
                    <UserDetail key={user.id} user={user} />
                  ))}
                </TracksList>
              </>
            ) : (
              <TracksText>No users found</TracksText>
            )}
            <MiddleTitle>Discover our best playlists</MiddleTitle>
          </SectionLayout>
        </>
      )}
    </>
  );
}

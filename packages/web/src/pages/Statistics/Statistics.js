import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GroupsIcon from "@mui/icons-material/Groups";
import AlbumIcon from "@mui/icons-material/Album";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

import withLayout from "../../components/hoc/withLayout";
import { FlexColumn } from "../../components/atoms/FlexColumn/FlexColumn";
import albumsApi from "../../api/api-albums";
import { useAlbums } from "../../hooks/useAlbums";
import { useUsers } from "../../hooks/useUsers";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useTracks } from "../../hooks/useTracks";

const NavBar = styled.nav`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background-color: lightgrey;
  border-radius: 9999px;
`;

const ChartBody = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background-color: lightgray;
  padding: 1rem;
`;

const Statistics = () => {
  const [userChart, setUserChart] = useState(true);
  const [albumChart, setAlbumChart] = useState(false);
  const [songsChart, setSongsChart] = useState(false);
  const [playlistsChart, setPlaylistsChart] = useState(false);
  const [statsArray, setArray] = useState([]);
  const [likes, setLikes] = useState([]);

  const { data: albums } = useAlbums();
  const albumsData = albums?.data;

  const { data: playlists } = usePlaylists();
  const playlistData = playlists?.data?.data;

  const { data: users } = useUsers();
  const userData = users?.data;

  const { data: tracks } = useTracks();
  const tracksData = tracks?.data?.data;

  const createArray = (array) => {
    setArray([]);
    setLikes([]);
    if (array) {
      array.forEach((title) => {
        setArray((list) => [...list, title?.title || title.name]);
        setLikes((list) => [...list, title?.num_likes || title.num_followers]);
      });
    }
  };

  useEffect(() => {
    createArray(
      (albumChart && albumsData) ||
        (playlistsChart && playlistData) ||
        (userChart && userData) ||
        (songsChart && tracksData),
    );
  }, [albumChart, playlistsChart, songsChart, userChart]);

  console.log(statsArray);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          (userChart && "Most Popular Users") ||
          (albumChart && "Most Popular Albums") ||
          (songsChart && "Most Popular Songs") ||
          (playlistsChart && "Most followed Playlists"),
      },
    },
  };
  const labels = statsArray; // Name of 10 most popular users playlists or albums

  const data = {
    labels,
    datasets: [
      {
        label: "Likes",
        data: likes, // This is the array of number of followers or views
        backgroundColor:
          (albumChart && "#0770f7b0") ||
          (playlistsChart && "#00e106b3") ||
          (userChart && "#fffb00b5") ||
          (songsChart && "#6900ffc7"),
      },
    ],
  };
  return (
    <>
      <NavBar>
        <FlexColumn>
          <GroupsIcon fontSize="large" />
          <Button
            type="button"
            onClick={() => {
              setUserChart(true);
              setSongsChart(false);
              setAlbumChart(false);
              setPlaylistsChart(false);
            }}
          >
            <span>Users</span>
          </Button>
        </FlexColumn>
        <FlexColumn>
          <MusicNoteIcon fontSize="large" />
          <Button
            type="button"
            onClick={() => {
              setUserChart(false);
              setSongsChart(true);
              setAlbumChart(false);
              setPlaylistsChart(false);
            }}
          >
            <span>Songs</span>
          </Button>
        </FlexColumn>
        <FlexColumn>
          <AlbumIcon fontSize="large" />
          <Button
            type="button"
            onClick={() => {
              setUserChart(false);
              setSongsChart(false);
              setAlbumChart(true);
              setPlaylistsChart(false);
            }}
          >
            <span>Albums</span>
          </Button>
        </FlexColumn>
        <FlexColumn>
          <LibraryMusicIcon fontSize="large" />
          <Button
            type="button"
            onClick={() => {
              setUserChart(false);
              setSongsChart(false);
              setAlbumChart(false);
              setPlaylistsChart(true);
            }}
          >
            <span>Playlists</span>
          </Button>
        </FlexColumn>
      </NavBar>
      {statsArray && (
        <ChartBody>
          <Bar options={options} data={data} />
        </ChartBody>
      )}
    </>
  );
};

export default withLayout(Statistics);

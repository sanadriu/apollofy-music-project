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

import withLayout from "../../components/hoc/withLayout";
import { FlexColumn } from "../../components/atoms/FlexColumn/FlexColumn";

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
  const [chart, setChart] = useState("");

  const [statsArray, setArray] = useState([]);
  const [likes, setLikes] = useState([]);

  const { data: albums } = useAlbums(1, undefined, undefined, "num_likes");
  const albumsList = albums?.data?.data;

  const { data: playlists } = usePlaylists(1, undefined, undefined, "num_followers");
  const playlistsList = playlists?.data?.data;

  const { data: users } = useUsers(1, undefined, undefined, "num_followers");
  const usersList = users?.data?.data;

  const { data: tracks } = useTracks(1, undefined, undefined, "num_plays");
  const tracksList = tracks?.data?.data;

  const createArray = (array) => {
    setArray([]);
    setLikes([]);
    if (array) {
      array.forEach((title) => {
        setArray((list) => [...list, title?.title || title.name]);
        setLikes((list) => [...list, title?.num_plays || title.num_followers || title?.num_likes]);
      });
    }
  };

  useEffect(() => {
    createArray(
      (chart === "Albums" && albumsList) ||
        (chart === "Playlists" && playlistsList) ||
        (chart === "Users" && usersList) ||
        (chart === "Songs" && tracksList),
    );
  }, [chart]);

  console.log(albumsList, statsArray, likes);
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
          (chart === "Users" && "Most Popular Users") ||
          (chart === "Albums" && "Most Popular Albums") ||
          (chart === "Songs" && "Most Popular Songs") ||
          (chart === "Playlists" && "Most followed Playlists"),
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
          (chart === "User" && "#0770f7b0") ||
          (chart === "Playlists" && "#00e106b3") ||
          (chart === "Albums" && "#fffb00b5") ||
          (chart === "Songs" && "#6900ffc7"),
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
              setChart("Users");
            }}
          >
            <span>Users</span>
          </Button>
        </FlexColumn>
        <FlexColumn>
          <Button
            type="button"
            onClick={() => {
              setChart("Songs");
            }}
          >
            <MusicNoteIcon fontSize="large" />
            <span>Songs</span>
          </Button>
        </FlexColumn>
        <FlexColumn>
          <AlbumIcon fontSize="large" />
          <Button
            type="button"
            onClick={() => {
              setChart("Albums");
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
              setChart("Playlists");
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

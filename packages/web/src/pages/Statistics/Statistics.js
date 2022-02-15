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

import { useFetchAlbums } from "../../hooks/useAlbums";
import { useFetchUsers } from "../../hooks/useUsers";
import { useFetchPlaylists } from "../../hooks/usePlaylists";
import { useFetchTracks } from "../../hooks/useTracks";
import withLayout from "../../components/hoc/withLayout";
import FlexColumn from "../../components/atoms/layout/FlexColumn";

const NavBar = styled.nav`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background-color: lightgrey;
  border-radius: 9999px;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    margin-top: 5rem;
  }
`;

const NameSpan = styled.span`
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    font-size: smaller;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.smallMobile}) {
    display: none;
  }
`;

const ChartBody = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background-color: lightgray;
  padding: 1rem;
`;

const FlexCol = styled(FlexColumn)`
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: flex;
  }
`;

const Statistics = () => {
  const [chart, setChart] = useState("");

  const [statsArray, setArray] = useState([]);
  const [likes, setLikes] = useState([]);

  const { data: albums } = useFetchAlbums({ sort: "num_likes" });
  const albumsList = albums?.data?.data;

  const { data: playlists } = useFetchPlaylists({ sort: "num_followers" });
  const playlistsList = playlists?.data?.data;

  const { data: users } = useFetchUsers({ sort: "num_followers" });
  const usersList = users?.data?.data;

  const { data: tracks } = useFetchTracks({ sort: "num_plays" });
  const tracksList = tracks?.data?.data;

  function limit(string = "", max = 0) {
    return string.substring(0, max);
  }

  const createArray = (array) => {
    setArray([]);
    setLikes([]);
    if (array) {
      array.forEach((title) => {
        setArray((list) => [...list, limit(title?.title, 10) || limit(title?.name, 10)]);
        setLikes((list) => [...list, title?.num_plays || title.num_followers || title?.num_likes]);
      });
    }
  };

  useEffect(() => {
    createArray(usersList);
  }, [usersList]);

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
          (chart === "" && "Most Popular Users") ||
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
        <FlexCol>
          <Button
            type="button"
            onClick={() => {
              setChart("Users");
              createArray(usersList);
            }}
          >
            <GroupsIcon fontSize="large" />
            <NameSpan>Users</NameSpan>
          </Button>
        </FlexCol>
        <FlexCol>
          <Button
            type="button"
            onClick={() => {
              setChart("Songs");
              createArray(tracksList);
            }}
          >
            <MusicNoteIcon fontSize="large" />
            <NameSpan>Songs</NameSpan>
          </Button>
        </FlexCol>
        <FlexCol>
          <Button
            type="button"
            onClick={() => {
              setChart("Albums");
              createArray(albumsList);
            }}
          >
            <AlbumIcon fontSize="large" />
            <NameSpan>Albums</NameSpan>
          </Button>
        </FlexCol>
        <FlexCol>
          <Button
            type="button"
            onClick={() => {
              setChart("Playlists");
              createArray(playlistsList);
            }}
          >
            <LibraryMusicIcon fontSize="large" />
            <NameSpan>Playlists</NameSpan>
          </Button>
        </FlexCol>
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

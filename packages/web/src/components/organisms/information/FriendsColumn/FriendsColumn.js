import React, { useState } from "react";
import styled from "styled-components";
import { LinearProgress } from "@mui/material";

import { useFollowedUsers } from "../../../../hooks/useUsers";
import Button from "../../../atoms/buttons/Button";
import FlexColumn from "../../../atoms/layout/FlexColumn";
import HomeSmallText from "../../../atoms/body/HomeSmallText";
import RightSideBar from "../../../atoms/layout/RightSideBar";
import FriendInfo from "../../../molecules/FriendInfo";
import AddFriendsModal from "../../modals/AddFriendsModal";
import { useEffect } from "react";

const FriendsColumnLayout = styled(RightSideBar)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
  padding: 1rem;
`;

const ColumnFlexStart = styled(FlexColumn)`
  align-items: start;
  gap: 0.2rem;
  height: auto;
  min-height: 5rem;
  max-height: 25rem;
  overflow: auto;
  margin-bottom: 1rem;
`;

export default function FriendsColumn() {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const followedUsers = true;

  const { data: users, isSuccess } = useFollowedUsers(followedUsers);
  const friendsList = users?.data?.data;

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <FriendsColumnLayout>
      <ColumnFlexStart>
        {isLoading && <LinearProgress sx={{ width: "60%", margin: "2rem" }} color="inherit" />}
        {!isLoading &&
          isSuccess &&
          friendsList?.map((friend) => (
            <FriendInfo
              key={friend.id}
              id={friend.id}
              profilePicture={friend.thumbnails?.url_default}
              username={friend.username}
              firstName={friend.firstname}
              lastName={friend.lastname}
            />
          ))}
        {!isLoading && isSuccess && friendsList.length === 0 && (
          <HomeSmallText>You do not follow anyone yet</HomeSmallText>
        )}
      </ColumnFlexStart>
      <Button onClick={handleModal} btnColor="#B04AFF" type="block">
        Add Friends
      </Button>
      <AddFriendsModal isOpen={isOpen} handleModal={handleModal} />
    </FriendsColumnLayout>
  );
}

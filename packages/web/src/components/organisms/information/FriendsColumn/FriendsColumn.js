import React, { useState } from "react";
import styled from "styled-components";

import { useFollowedUsers } from "../../../../hooks/useUsers";
import Button from "../../../atoms/buttons/Button";
import FlexColumn from "../../../atoms/layout/FlexColumn";
import HomeSmallText from "../../../atoms/body/HomeSmallText";
import RightSideBar from "../../../atoms/layout/RightSideBar";
import FriendInfo from "../../../molecules/FriendInfo";
import AddFriendsModal from "../../modals/AddFriendsModal";

const FriendsColumnLayout = styled(RightSideBar)`
  height: auto;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  align-items: start;

  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

const ColumnFlexStart = styled(FlexColumn)`
  align-items: start;
  gap: 0.2rem;
`;

export default function FriendsColumn() {
  const [isOpen, setOpen] = useState(false);
  const followedUsers = true;

  const { data: users, isSuccess } = useFollowedUsers(followedUsers);
  const friendsList = users?.data?.data;

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <FriendsColumnLayout>
      <ColumnFlexStart>
        {isSuccess &&
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
        {isSuccess && friendsList.length === 0 && (
          <HomeSmallText>You do not follow anyone yet</HomeSmallText>
        )}
        <Button onClick={handleModal} btnColor="#B04AFF" type="block">
          Add Friends
        </Button>
        <AddFriendsModal isOpen={isOpen} handleModal={handleModal} />
      </ColumnFlexStart>
    </FriendsColumnLayout>
  );
}

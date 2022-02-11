import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { authSelector } from "../../../../redux/auth";
import Button from "../../../atoms/buttons/Button";
import FlexColumn from "../../../atoms/FlexColumn";
import HomeSmallText from "../../../atoms/HomeSmallText";
import RightSideBar from "../../../atoms/RightSideBar";
import FriendInfo from "../../../molecules/FriendInfo";
import AddFriendsModal from "../../modals/AddFriendsModal";

const FriendsColumnLayout = styled(RightSideBar)`
  height: auto;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

export default function FriendsColumn() {
  const { currentUser } = useSelector(authSelector);
  const [isOpen, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <FriendsColumnLayout>
      <FlexColumn>
        {currentUser?.followed_users && currentUser?.followed_users[0] ? (
          currentUser.followed_users.map((friend) => {
            <FriendInfo
              key={friend.id}
              profilePicture={friend.thumbnails?.url_default}
              name={friend.username}
            />;
          })
        ) : (
          <HomeSmallText>You do not follow anyone yet</HomeSmallText>
        )}
        <Button onClick={handleModal} btnColor="#B04AFF" type="block">
          Add Friends
        </Button>
        <AddFriendsModal isOpen={isOpen} handleModal={handleModal} />
      </FlexColumn>
    </FriendsColumnLayout>
  );
}

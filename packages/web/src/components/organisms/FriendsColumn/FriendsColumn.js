import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { authSelector } from "../../../redux/auth";

import { PrimaryButton } from "../../atoms/buttons/PrimaryButton";
import { FlexColumn } from "../../atoms/FlexColumn/FlexColumn";
import { HomeSmallText } from "../../atoms/HomeSmallText/HomeSmallText";
import { rightSideBar } from "../../atoms/RightSideBar/RightSideBar";
import FriendInfo from "../../molecules/FriendInfo/FriendInfo";

const FriendsColumnLayout = styled(rightSideBar)`
  height: auto;
`;

export default function FriendsColumn() {
  const { currentUser } = useSelector(authSelector);

  return (
    <FriendsColumnLayout>
      <FlexColumn>
        {currentUser.follows ? (
          currentUser.follows.map((friend) => {
            <FriendInfo
              key={friend.id}
              profilePicture={friend.profilePicture}
              name={friend.name}
              lastTrack={friend.lastTrack}
            />;
          })
        ) : (
          <HomeSmallText>You do not follow anyone yet</HomeSmallText>
        )}
        <PrimaryButton>Add Friends</PrimaryButton>
      </FlexColumn>
    </FriendsColumnLayout>
  );
}

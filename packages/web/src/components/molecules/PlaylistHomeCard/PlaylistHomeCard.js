import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { HomeSmallText } from "../../atoms/HomeSmallText/HomeSmallText";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { FlexColumn } from "../../atoms/FlexColumn/FlexColumn";

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: white;
  }
`;

export default function PlaylistHomeCard({ playlist }) {
  const Card = styled.div`
    padding: 1rem;
    border-radius: 1.3rem;
    height: 15rem;
    max-width: 12rem;
    background-color: ${playlist.color};
    border: 1px solid darkgray;
  `;
  return (
    <Card>
      <HomeSmallText>{playlist.tracks.length} Tracks</HomeSmallText>
      <FlexColumn>
        <CardLink to={`/playlists/${playlist.id}`}>
          <SmallText>{playlist.title}</SmallText>
        </CardLink>
        <HomeSmallText>{playlist.followed_by.length} listeners</HomeSmallText>
      </FlexColumn>
    </Card>
  );
}

PlaylistHomeCard.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_followers: PropTypes.number.isRequired,
    followed_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

PlaylistHomeCard.defaultProps = {
  playlist: {
    id: null,
    user: {},
    title: null,
    description: null,
    color: null,
    tracks: [],
    num_tracks: null,
    num_followers: null,
    followed_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SmallText from "../../atoms/SmallText";

const GenreTitle = styled(SmallText)`
  margin-top: auto;
  font-size: 1rem;
`;

const GenreDetail = ({ genre }) => {
  const GenreLayout = styled.div`
    cursor: pointer;
    height: 6rem;
    border-radius: 1.3rem;
    padding: 0.3rem;
    display: flex;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: center;
    background-image: linear-gradient(
        ${({ theme }) => theme.colors.body},
        ${({ theme }) => theme.colors.background}
      ),
      url(${genre.thumbnails.url_default});
    background-size: cover;

    &:hover {
      color: ${({ theme }) => theme.colors.body};
      background-image: url(${genre.thumbnails.url_default});
      background-blend-mode: overlay;
    }

    @media only screen and (max-width: 600px) {
      height: 3.5rem;
    }
  `;

  return (
    <GenreLayout>
      <GenreTitle>{genre.name}</GenreTitle>
    </GenreLayout>
  );
};

GenreDetail.propTypes = {
  genre: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

GenreDetail.defaultProps = {
  genre: {
    id: null,
    name: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};

export default GenreDetail;

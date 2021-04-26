import React from "react";
import { string, func, oneOf } from "prop-types";
import cn from "clsx";

import "../../styles/tailwind.css";
import "./Card.scss";

import Play from "../ButtonIcons/Play/Play";

function Card({
  id,
  title,
  subtitle,
  thumbnail,
  infoType,
  handleClick,
  ...props
}) {
  const imgClassNames = cn(
    {
      [`rounded-sm`]: infoType === "playlist",
      [`rounded-full`]: infoType === "user",
    },
    "Card__img",
  );

  const handleCardClick = () => {
    handleClick(id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleCardClick}
      onClick={handleCardClick}
      className="Card"
    >
      <div className="Card__wrapper">
        <div className="Card__header">
          <div className="Card__img-wrapper">
            {thumbnail && (
              <img className={imgClassNames} src={thumbnail} alt={title} />
            )}
            {!thumbnail && (
              <svg
                className={imgClassNames}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#F0F0F0"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
              </svg>
            )}
          </div>
          <div className="Card__btn-wrapper">
            <Play playing={1 < 2} handleClick={() => {}} />
          </div>
        </div>
        <div className="Card__content">
          <div className="inline-block w-full overflow-hidden">
            <p className="Card__title">{title}</p>
          </div>
          <p className="mt-0.5 overflow-hidden">{subtitle}</p>
        </div>
        <div className="Card__overlap" />
      </div>
    </div>
  );
}

Card.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  subtitle: string,
  thumbnail: string,
  handleClick: func.isRequired,
  infoType: oneOf(["user", "playlist"]),
};

Card.defaultProps = {
  subtitle: "",
  thumbnail: "",
  infoType: "user",
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.nav`
  width: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

export default function ControlBar() {
  return (
    <Bar>
      <Link to="/library">
        <svg
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Score Logo">
            <g id="Note">
              <ellipse
                id="Ellipse 3"
                cx="64.1112"
                cy="109.612"
                rx="23.1112"
                ry="24.3876"
                fill="black"
              />
              <ellipse
                id="Ellipse 4"
                cx="64.1112"
                cy="109.612"
                rx="23.1112"
                ry="24.3876"
                fill="black"
              />
              <rect
                id="Rectangle 1"
                x="80.1112"
                y="16.7519"
                width="7.11113"
                height="92.8605"
                rx="2"
                fill="black"
              />
              <path
                id="Polygon 4"
                d="M108.605 28.0884C110.793 29.2144 110.772 32.3496 108.57 33.4431L88.1519 43.579C86.1499 44.5729 83.8016 43.1054 83.8164 40.8696L83.9528 20.2974C83.9676 18.0616 86.335 16.6289 88.3237 17.6522L108.605 28.0884Z"
                fill="black"
              />
            </g>
          </g>
        </svg>
      </Link>
      <Link to="/">
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M62.5 125V87.5H87.5V125H118.75V75H137.5L75 18.75L12.5 75H31.25V125H62.5Z"
            fill="black"
          />
        </svg>
      </Link>
      <Link to="/search">
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.875 87.5H91.9375L90.1875 85.8125C96.3125 78.6875 100 69.4375 100 59.375C100 36.9375 81.8125 18.75 59.375 18.75C36.9375 18.75 18.75 36.9375 18.75 59.375C18.75 81.8125 36.9375 100 59.375 100C69.4375 100 78.6875 96.3125 85.8125 90.1875L87.5 91.9375V96.875L118.75 128.062L128.062 118.75L96.875 87.5V87.5ZM59.375 87.5C43.8125 87.5 31.25 74.9375 31.25 59.375C31.25 43.8125 43.8125 31.25 59.375 31.25C74.9375 31.25 87.5 43.8125 87.5 59.375C87.5 74.9375 74.9375 87.5 59.375 87.5Z"
            fill="black"
          />
        </svg>
      </Link>
      <Link to="/stats">
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.25 57.5H50V118.75H31.25V57.5ZM66.25 31.25H83.75V118.75H66.25V31.25ZM101.25 81.25H118.75V118.75H101.25V81.25Z"
            fill="black"
          />
        </svg>
      </Link>
    </Bar>
  );
}

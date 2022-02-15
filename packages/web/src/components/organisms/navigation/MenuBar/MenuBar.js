import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import defaultAvatar from "../../../../images/defaultAvatar.png";

import * as ROUTES from "../../../../routes";
import SmallText from "../../../atoms/body/SmallText";
import RightSideBar from "../../../atoms/layout/RightSideBar";
import { authSelector, signOut } from "../../../../store/auth";

const MenuLayout = styled(RightSideBar)`
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  z-index: 1;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    max-width: 4.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 9999px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  width: 2rem;
  margin-top: 0.2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: block;
  }
`;

const ProfilePicture = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: block;
    cursor: pointer;
  }
`;

const ProfileName = styled(SmallText)`
  margin-top: 0.4rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

const MenuLogo = styled(KeyboardArrowDownIcon)`
  color: ${({ theme }) => theme.colors.text};
`;

const BackArrow = styled(ArrowBackIosIcon)`
  display: none;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    margin-top: 1rem;
    display: block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    border-radius: 100%;
  }
`;

const CustomMenu = styled(MenuList)`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 1rem;
  gap: 0.3rem;
  width: 9rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

function MenuBar() {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logout = async () => {
    await dispatch(signOut());
    navigate(ROUTES.LOGIN);
    dispatch(signOut());
  };

  const editProfile = async () => {
    navigate(ROUTES.EDIT_PROFILE);
  };

  const showProfile = async () => {
    navigate(`${ROUTES.USER_PROFILE}/${currentUser.id}`);
  };

  const goHome = async () => {
    navigate("/");
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <BackArrow
        onClick={() => {
          goHome();
        }}
      />
      <MenuLayout>
        <ProfilePicture
          alt="Profile Picture"
          src={currentUser?.thumbnails?.url_default || defaultAvatar}
          onClick={() => handleToggle()}
        />
        <ProfileName>{currentUser?.username}</ProfileName>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => handleToggle()}
        >
          <MenuLogo />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom-start" ? "right top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                  <CustomMenu
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={(e) => handleListKeyDown(e)}
                  >
                    <MenuItem onClick={() => showProfile()}>Profile</MenuItem>
                    <MenuItem onClick={() => editProfile()}>My account</MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </CustomMenu>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </MenuLayout>
    </>
  );
}

export default MenuBar;

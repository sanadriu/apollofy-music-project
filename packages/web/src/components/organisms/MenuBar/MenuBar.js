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

import { SmallText } from "../../atoms/SmallText/SmallText";
import { rightSideBar } from "../../atoms/RightSideBar/RightSideBar";
import { authSelector, signOut } from "../../../redux/auth";
import * as ROUTES from "../../../routes";

const MenuLayout = styled(rightSideBar)`
  height: 3rem;
`;

const Button = styled.button`
  background-color: transparent;
  width: 2rem;
  margin-top: 0.2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfilePicture = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const ProfileName = styled(SmallText)`
  margin-top: 0.4rem;
`;

export default function MenuBar() {
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
    <MenuLayout>
      {/* <ProfilePicture
        alt="Profile Picture"
        src={
          currentUser?.thumbnails?.url_default
            ? currentUser.thumbnails.url_default
            : "https://res.cloudinary.com/stringifiers/image/upload/v1643731517/gidnkoxyrdltjkklfkcw.jpg"
        }
      />
      <ProfileName>{currentUser?.email}</ProfileName>
      /> */}
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={() => handleToggle()}
      >
        <KeyboardArrowDownIcon />
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
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={(e) => handleListKeyDown(e)}
                  sx={{ width: "18rem", borderRadius: "1.3rem" }}
                >
                  <MenuItem onClick={(e) => handleClose(e)}>Profile</MenuItem>
                  <MenuItem onClick={() => editProfile()}>My account</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </MenuLayout>
  );
}

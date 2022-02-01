import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { authSelector } from "../../../redux/auth/auth-selectors";
import { HomeSmallText } from "../../atoms/HomeSmallText/HomeSmallText";
import { rightSideBar } from "../../atoms/RightSideBar/RightSideBar";

const MenuLayout = styled(rightSideBar)`
  height: 2.5rem;
`;

const Button = styled.button`
  background-color: transparent;
  width: 2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfilePicture = styled.img`
  width: 2rem;
  border-radius: 50%;
`;

export default function MenuBar() {
  const { currentUser } = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <MenuLayout>
      <ProfilePicture
        alt="Profile Picture"
        src="../../../assets/images/President_Barack_Obama_Test.jpg"
      />
      <HomeSmallText>{currentUser.name}</HomeSmallText>
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
        placement="bottom-start"
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
                >
                  <MenuItem onClick={(e) => handleClose(e)}>Profile</MenuItem>
                  <MenuItem onClick={(e) => handleClose(e)}>My account</MenuItem>
                  <MenuItem onClick={(e) => handleClose(e)}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </MenuLayout>
  );
}

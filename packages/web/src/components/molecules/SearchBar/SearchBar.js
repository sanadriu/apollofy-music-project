import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchButton = styled(IconButton)`
  height: 2rem;
  border-radius: 50%;
  &:hover {
    background-color: lightgray;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 2rem;
  background-color: lightgray;
  border: none;
  padding-left: 1rem;
  outline: none;
`;

const Layout = styled.form`
  height: 3rem;
  padding: 0.5rem;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1.3rem;
  margin-top: 1rem;
  background-color: lightgray;
`;

const SearchIconStyled = styled(SearchIcon)`
  border-radius: 50%;
  &:hover {
    background-color: inherit;
  }
`;

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const handleType = (value) => {
    setSearch(value);
  };

  function handleSearch(e) {
    e.preventDefault();
  }
  return (
    <Layout>
      <SearchButton type="submit" onClick={(e) => handleSearch(e)}>
        <SearchIconStyled />
      </SearchButton>
      <SearchInput
        placeholder="Search for some music"
        onChange={(e) => handleType(e.target.value)}
      />
    </Layout>
  );
}

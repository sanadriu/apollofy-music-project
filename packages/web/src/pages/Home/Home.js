import React from "react";
import withLayout from "../../components/hoc/withLayout";

import SearchBar from "../../components/molecules/SearchBar/SearchBar";

function Home() {
  return <SearchBar />;
}

export default withLayout(Home);

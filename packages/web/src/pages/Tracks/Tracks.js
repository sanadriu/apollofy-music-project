import React from "react";

import withLayout from "../../components/hoc/withLayout";
import Tracks from "../../components/organisms/information/Tracks";

function TracksPage() {
  return <Tracks />;
}

export default withLayout(TracksPage);

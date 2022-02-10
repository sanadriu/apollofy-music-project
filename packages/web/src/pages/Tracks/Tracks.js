import React from "react";
import withLayout from "../../components/hoc/withLayout";
import Tracks from "../../components/organisms/Tracks";

function TracksPage() {
  return (
    <main>
      <section>
        <Tracks />
      </section>
    </main>
  );
}

export default withLayout(TracksPage);

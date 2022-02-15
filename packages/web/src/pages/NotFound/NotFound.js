import React from "react";

import withLayout from "../../components/hoc/withLayout";
import MiddleTitle from "../../components/atoms/headings/MiddleTitle";

function NotFound() {
  return (
    <main>
      <section>
        <MiddleTitle>Page not found</MiddleTitle>
      </section>
    </main>
  );
}

export default withLayout(NotFound);

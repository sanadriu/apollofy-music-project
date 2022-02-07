import React from "react";
import { MiddleTitle } from "../../components/atoms/MiddleTitle/MiddleTitle";

import withLayout from "../../components/hoc/withLayout";

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

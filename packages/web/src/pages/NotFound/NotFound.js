import React from "react";

import withLayout from "../../components/hoc/withLayout";

function NotFound() {

  return (
    <main className="p-4">
      <section className="p-4">
        <h1 className="text-xl">Page not found</h1>
      </section>
    </main>
  );
}

export default withLayout(NotFound);

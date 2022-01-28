import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <main className="p-4">
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )}
        <button type="button" onClick={logout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default Home;

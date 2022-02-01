import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  );
};

export default withRouter;
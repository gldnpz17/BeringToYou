import { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { IdentityContext } from "../../app";

const RequireAuthenticationRoute = ({ children, ...props }) => {
  const identityContext = useContext(IdentityContext);
  const location = useLocation();

  if (identityContext?.identity) {
    return (
      <Route {...props}>
        {(() => {
          if (identityContext?.identity?.isAuthenticated) {
            return (children);
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/admin/auth/login',
                  state: { redirect: location.pathname }
                }}
              />
            );
          }
        })()}
      </Route>
    );
  };

  return null;
};

export default RequireAuthenticationRoute;
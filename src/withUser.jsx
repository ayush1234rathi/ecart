import React, { useContext } from "react";
import { userContext } from "./providers/UserProvider";

function withUser(IncomingComponent) {
  return function OutgoingComponent(props) {
    const { user, setUser } = useContext(userContext);
    return <IncomingComponent {...props} user={user} setUser={setUser} />;
  };
}

export default withUser;

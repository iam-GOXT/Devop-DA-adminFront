import { createContext, useState, useEffect } from "react";
import { getRequest } from "../utils/axios";

export const userContext = createContext();

const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const res = await getRequest({ url: `da/admin/` });
      console.log("Current user: ", res.data.data);
      setUserDetails(res.data.data);
    }
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={[userDetails, setUserDetails]}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserDetailsProvider;

// import { createContext, useState } from 'react';

// export const userContext = createContext();

// const UserDetailsProvider = (props) => {

//     const [userDetails, setUserDetails] = useState({});
//     console.log(`This is the user details: ${userDetails}`)

//     return (
//         <userContext.Provider value={[userDetails, setUserDetails]}>
//             {props.children}
//         </userContext.Provider>
//     );
// };

// export default UserDetailsProvider;

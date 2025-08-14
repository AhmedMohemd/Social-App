import axios from "axios";
import { createContext, useState } from "react";
export let UserContext = createContext();

export function UserContextProvider(props) {
  let [user, setUser] = useState(null);

  async function getUserData() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    if (data.message === "success") {
      setUser(data.user);
    }
  }

  return (
    <UserContext.Provider value={{ getUserData, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

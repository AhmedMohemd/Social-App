import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Component/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import PostsDetails from "./Pages/PostsDetails/PostsDetails";
import { UserContextProvider } from "./Component/Context/UserContextProvider";
import { GuradRouting } from "./Component/GuradRouting/GuradRouting";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import Register from './Pages/Register/Register';
export default function App() {
  let Rootes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <GuradRouting>
              <Home />
            </GuradRouting>
          ),
        },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register/> },
        {
          path: "Profile",
          element: (
            <GuradRouting>
              <Profile />
            </GuradRouting>
          ),
        },
        {
          path: "EditProfile",
          element: (
            <GuradRouting>
              <EditProfile />
            </GuradRouting>
          ),
        },
        {
          path: "PostsDetails/:id",
          element: (
            <GuradRouting>
              <PostsDetails />
            </GuradRouting>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  let queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={Rootes} />
          <Toaster />
        </UserContextProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </div>
  );
}

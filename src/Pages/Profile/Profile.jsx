import axios from "axios";
import React, { useContext } from "react";
import { BeatLoader } from "react-spinners";
import imgPhoto from "../../assets/user-img.png";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../Component/Context/UserContextProvider";
import PostOptions from "../../Component/PostOptions/PostOptions";
import { Link } from "react-router-dom";
import CreateComment from "../../Component/CreateComment/CreateComment";
import CreatePost from "../../Component/CreatePost/CreatePost";

export default function Profile() {
  let { user } = useContext(UserContext);
  async function getMyPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["myPosts"],
    queryFn: getMyPosts,
  });
  let postsList = data?.data?.posts;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-3/4 mx-auto">
        <h2 className="text-red-500 text-center mt-10">
          {error?.response?.data?.erroR}
        </h2>
      </div>
    );
  }
  return (
    <div className="w-3/4 mx-auto">
      <div className="bg-gray-200 rounded-3xl p-6 flex items-center gap-6 mb-8">
        <img
          src={user?.photo}
          alt={user?.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
       <CreatePost refetch={refetch} />
      <h2 className="text-2xl font-bold mb-5">My Posts</h2>
      {postsList?.length === 0 ? (
        <p className="text-center">You dont created any posts yet</p>
      ) : (
        postsList?.map((post) => {
          let {
            _id,
            body,
            image,
            user: { name, photo },
            createdAt,
            comments,
          } = post;

          return (
            <div key={_id} className="item my-5 bg-gray-100 rounded-3xl p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={photo}
                    alt={name}
                  />
                  <div className="font-medium dark:text-white">
                    <div>{name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(createdAt).toLocaleDateString()} -{" "}
                      {new Date(createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <PostOptions postId={_id} refetch={refetch} />
              </div>
              <p className="my-3">{body}</p>
              {image && (
                <img src={image} className="w-full rounded" alt={body} />
              )}
              <div className="itemFooter mt-3">
                <div className="flex justify-between">
                  <h2>{comments.length} comments</h2>
                  <Link to={"/PostsDetails/" + _id} className="text-blue-700">
                    {" "}
                    sea post Details{" "}
                  </Link>
                </div>
                <CreateComment postId={_id} refetch={refetch} />
                {comments.length > 0 && (
                  <div className="bg-gray-300 mt-4 p-5 rounded-4xl">
                    <div className="avatarItem">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            // comments[comments.length - 1]?.commentCreator
                            //   .photo
                            imgPhoto
                          }
                          alt=""
                        />
                        <div className="font-medium dark:text-white">
                          <div>
                            {comments[comments.length - 1].commentCreator.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(
                              comments[comments.length - 1].createdAt
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              comments[comments.length - 1].createdAt
                            ).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <h2>{comments[comments.length - 1].content}</h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

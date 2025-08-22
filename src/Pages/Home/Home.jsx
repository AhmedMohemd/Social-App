import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import imgPhoto from "../../assets/react.svg";
import userPhoto from "../../assets/user-img.png";
import { BeatLoader } from "react-spinners";
import CreatePost from "../../Component/CreatePost/CreatePost";
import PostOptions from "../../Component/PostOptions/PostOptions";
import { UserContext } from "../../Component/Context/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import CommentOptions from "./../../Component/CommentOptions/CommentOptions";
import CreateComment from "../../Component/CreateComment/CreateComment";
export default function Home() {
  let { user } = useContext(UserContext);

  let { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  let postsList = data?.data.posts;
  async function getAllPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  if (isError) {
    return (
      <div className="w-3/4 mx-auto">
        <h2 className="text-red-500 text-center mt-10">
          {error?.response?.data?.error}
        </h2>
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto">
      <CreatePost refetch={refetch} />
      {isLoading
        ? Array.from({ length: 5 }).map(() => (
            <div className="fixed top-0 start-0 w-full h-full bg-white flex justify-center items-center">
              <BeatLoader />
            </div>
          ))
        : postsList?.map((post) => {
            let {
              _id,
              body,
              image,
              user: { name, photo },
              createdAt,
              comments,
            } = post;
            let userPosIdt = post.user._id;
            let userLoginId = user?._id;
            return (
              <div key={_id} className="item my-5 bg-gray-100 rounded-3xl p-3">
                <div className="itemBody">
                  <div className="flex justify-between items-center ">
                    {" "}
                    <div className="flex items-center gap-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={photo ? photo : imgPhoto}
                        alt=""
                      />
                      <div className="font-medium dark:text-white">
                        <div>{name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(createdAt).toLocaleDateString()} -{" "}
                          {new Date(createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    {userPosIdt == userLoginId && (
                     <PostOptions postId={_id} refetch={refetch} />
                    )}
                  </div>

                  <p className="my-3">{body}</p>
                  <img
                    src={image ? image : imgPhoto}
                    className="w-full rounded"
                    alt={body}
                  />
                </div>
                <div className="itemFooter mt-3">
                  <div className="flex justify-between">
                    <h2>{comments.length} comments</h2>
                    <Link to={"/PostsDetails/" + _id} className="text-blue-700">
                      {" "}
                      sea post Details{" "}
                    </Link>
                  </div>
                  <CreateComment postId={_id} refetch={refetch} />

                  {/* ============================================================== */}
                  {comments.length > 0 && (
                    <div className=" bg-gray-300 mt-4  p-5 rounded-4xl">
                      <div className="avatarItem">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            // src={comments[comments.length - 1].commentCreator.photo}
                            src={userPhoto}
                            alt=""
                          />
                          <div className="font-medium dark:text-white">
                            <div>
                              {
                                comments[comments.length - 1].commentCreator
                                  .name
                              }
                            </div>
                            {/* ================ */}
                            {/* ================ */}
                            {/* ================ */}
                            {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(
                                comments[
                                  comments.length - 1
                                ].commentCreator.createdAt
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                comments[
                                  comments.length - 1
                                ].commentCreator.createdAt
                              ).toLocaleTimeString()}
                            </div> */}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {comments.length > 0 &&
                              comments[comments.length - 1].createdAt ? (
                                <>
                                  {new Date(
                                    Date.parse(
                                      comments[comments.length - 1].createdAt
                                    )
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    Date.parse(
                                      comments[comments.length - 1].createdAt
                                    )
                                  ).toLocaleTimeString()}
                                </>
                              ) : (
                                "No date available"
                              )}
                              <CommentOptions />
                            </div>

                            {/* ================ */}
                            {/* ================ */}
                            {/* ================ */}
                          </div>
                        </div>
                        <h2>{comments[comments.length - 1].content}</h2>
                      </div>
                    </div>
                  )}
                  {/* ============================================================== */}
                </div>
              </div>
            );
          })}
    </div>
  );
}

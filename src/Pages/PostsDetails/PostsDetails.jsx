import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgPhoto from "../../assets/user-img.png";
import { BeatLoader } from "react-spinners";

export default function PostsDetails() {
  let { id } = useParams();
  let [post, setPost] = useState(null);
  useEffect(() => {
    getPostDetails();
  }, []);
  async function getPostDetails() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setPost(data.post);
    console.log(data);
  }
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader />
      </div>
    );
  }
  return (
    <div>
      <div className="item my-5 bg-gray-100 rounded-3xl p-3">
        <div className="itemBody">
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={post.user.photo}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div>{post.user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()} -
                {new Date(post.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>

          <p className="my-3">{post.body}</p>
          <img src={post.image} className="w-full rounded" alt={post.body} />
        </div>
        <div className="itemFooter mt-3">
          <div className="flex justify-between">
            <h2>{post.comments.length} comments</h2>
          </div>
          {/* ============================================================== */}
          {post.comments.map((comment) => {
            return (
              <div className=" bg-gray-300 mt-4  p-5 rounded-4xl">
                <div className="avatarItem">
                  <div class="flex items-center gap-4">
                    <img class="w-10 h-10 rounded-full" src={imgPhoto} alt="" />
                    <div class="font-medium dark:text-white">
                      <div>{comment.commentCreator.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()} -{" "}
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <h2>{comment.content}</h2>
                </div>
              </div>
            );
          })}
          {/* ============================================================== */}
        </div>
      </div>
    </div>
  );
}

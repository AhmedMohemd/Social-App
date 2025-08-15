import axios from "axios";
import { useParams } from "react-router-dom";
import imgPhoto from "../../assets/user-img.png";
import { BeatLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

export default function PostsDetails() {
  let { id } = useParams();
 let {data,isLoading} = useQuery({
    queryKey: ["postDetails" + id],
    queryFn: getPostDetails,
 })
   async function getPostDetails() {
  return await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  
  }
  let post = data?.data.post;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="item bg-gray-100 mx-auto w-3/4 rounded-3xl p-3">
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

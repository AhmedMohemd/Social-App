import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../Context/UserContextProvider";
export default function CreateComment({ postId, refetch }) {
  let { user } = useContext(UserContext);
  let { handleSubmit, register, reset } = useForm();
  async function handleCreateComment(value) {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: value.content,
        post: postId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data?.message === "success") {
      toast.success("Comment created");
      reset();
      refetch();
    } else {
      toast.error("Failed to create comment");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleCreateComment)}
      className=" bg-gray-100 rounded-2xl p-3 flex items-center justify-between"
    >
      {/* ==========================  */}
      <div className="flex items-center  w-full my-3">
        <img
          className="w-10 h-10 rounded-full"
          src={user?.photo}
          alt={user?.name}
        />

        <div className="w-4/4 mx-3">
          <input
            {...register("content", { required: true })}
            type="text"
            id="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your comment..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Create
      </button>
    </form>
  );
}

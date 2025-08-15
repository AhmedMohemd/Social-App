import React, { useContext, useRef } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  let { user } = useContext(UserContext);
  let { handleSubmit, register } = useForm();
  let imageInput = useRef();
  async function handleCreatePost(value) {
    console.log(value);
    console.log(imageInput.current.files[0]);
    let formData = new FormData();
    formData.append("body", value.body);
    formData.append("image", imageInput.current.files[0]);

    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    if (data?.message === "success") {
      toast.success("Post created successfully");
    }
    else {
      toast.error("Failed to create post");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="mb-10 py-4 bg-gray-100 rounded-2xl p-3"
    >
      <h2>Post Something</h2>
      <hr />
      <div className=" flex items-center justify-between my-5 ">
        <img
          className="w-10 h-10 rounded-full"
          src={user?.photo}
          alt={user?.name}
        />
        <div className="w-3/4 mx-3">
          <input
            {...register("body")}
            type="text"
            id="body"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="body"
          />
        </div>
        <label htmlFor="chooseFile">
          <i className="fa-solid fa-camera-retro fa-2xl"></i>
        </label>
        <input ref={imageInput} type="file" hidden id="chooseFile" name="" />
      </div>
      <button
        type="submit"
        class="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Create Post
      </button>
    </form>
  );
}

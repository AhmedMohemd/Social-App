import React from "react";
import img404 from "../../assets/images.jpeg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="container text-center mt-5 ">
        <img src={img404} className="w-dvh mx-auto" alt="error" />
        <div className="link my-3 ">
          <Link to="/" className="text-blue-800">Go to Home Page</Link>
        </div>
                  <i class="fa-solid fa-hand-point-up d-block mx-auto mt-2"></i>

      </div>
    </>
  );
}

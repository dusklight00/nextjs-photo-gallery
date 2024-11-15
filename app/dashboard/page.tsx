"use client";

import React, { useState, useEffect } from "react";
import instance from "../axios";
import { BASE_URL } from "../axios";
import { useToast } from "../components/Toast";

const AddImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { showToast, ToastContainer } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        showToast("Only image files are allowed!", "error");
        return;
      }

      try {
        const formData = new FormData();
        const username = localStorage.getItem("userId");
        formData.append("file", file);
        formData.append("username", username || "");

        const response = await instance.post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
        // setIsModalOpen(false);
        showToast("Image uploaded successfully!", "success");
        window.location.reload();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={() => setIsModalOpen(true)}
      >
        Add Image
      </button>

      {isModalOpen && (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2d2e2e] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
            <input type="file" onChange={handleFileChange} />
            <p className="text-sm text-gray-400 mt-2">
              You can upload only files that are images (e.g., .jpg, .png,
              .gif).
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface UserDetails {
  user: {
    username: string;
    email: string;
  };
}

const Dashboard = () => {
  const accountDetails = {
    username: "john_doe",
    email: "john_doe@example.com",
  };

  // const images = [
  //   { url: "https://via.placeholder.com/150", title: "Image 1" },
  //   { url: "https://via.placeholder.com/150", title: "Image 2" },
  //   { url: "https://via.placeholder.com/150", title: "Image 3" },
  //   { url: "https://via.placeholder.com/150", title: "Image 4" },
  // ];

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [images, setImages] = useState<{ user_id: string; key: string }[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("username");
        const response = await instance.get(`/user?username=${userId}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userId = localStorage.getItem("username");
        const response = await instance.get(`/images?username=${userId}`);
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 p-4 bg-[#ffffff06] shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Account Details</h2>
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile Photo"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <p className="text-lg">
              <strong>Username:</strong> {userDetails?.user.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userDetails?.user.email}
            </p>
          </div>
        </div>
        <AddImage />
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Back to Home
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            window.location.href = "/";
          }}
          className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Logout
        </button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Image Collection</h2>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-[#ffffff13]"
            >
              <button className="absolute top-2 right-2 py-1 px-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Delete
              </button>
              <img
                src={`${BASE_URL}/api/fileupload?key=${image.key}`}
                // alt={image.title}
                className="w-full h-48 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import style from "./UserImage.module.css";
import React, { useState } from "react";
import axios from "axios";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/Vehibuy/upload";

const UserImage = () => {
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
  const userId = loggedUser.response.id;
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleImageUpload = async (selectedFile) => {
    if (!selectedFile) {
      setError("Por favor, seleccione una imagen.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("El archivo seleccionado no es una imagen vÃ¡lida.");
      return;
    }

    return selectedFile;
  };

  const handleButton = async (event) => {
    event.preventDefault();

    const inputElement = document.getElementById("imageInput");
    const file = await handleImageUpload(inputElement.files[0]);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jsnxe58v");
    formData.append("folder", `user_Profileimg_${userId}`);

    try {
      const response = await axios.post(cloudinaryUploadUrl, formData);
      if (response.status === 200) {
        setImageUrl(response.data.secure_url);
        setError("Imagen subida con existo");
        localStorage.setItem("userImage", response.data.secure_url);
        const { data } = await axios.put(`http://localhost:3001/user/${userId}`, {image: response.data.secure_url});
      }
    } catch (error) {
      setError("Error al subir la imagen a Cloudinary");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        className={style.buttonImage}
      />
      <button onClick={handleButton} className={style.buttonImage}>
        Upload
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default UserImage;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBack } from "../../../assets/svgs";
import { createProductSuccess, FillInputsFixErrors, uploadImageFail, uploadImageSuccess } from "../../NotiStack";
import validationProductsCreate from "./validation/validationProductsCreate";
import style from "./CreateProduct.module.css"


export default function CreateProduct() {

  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [input, setInput] = useState({
    name: "",
    image: [],
    brand: "",
    model: "",
    state: "",
    price: "",
    color: "",
    description: "",
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    brand: "",
    model: "",
    state: "",
    price: "",
    color: "",
    description: "",
  });

  const [isImageSelected, setIsImageSelected] = useState(false);

  function handleFileChange(e, inputId) {
    const fileNameSpan = document.getElementById(`fileName${inputId}`);
    if (e.target.files.length > 0) {
      fileNameSpan.textContent = e.target.files[0].name;
    } else {
      fileNameSpan.textContent = "";
    }
  }

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    // The form is validated and the local error status is updated with the corresponding validation error messages.
    setError(
      validationProductsCreate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  // Function to check for errors in the error state
  const hasErrors = () => {
    for (const key in error) {
      if (error[key] !== "") {
        // There is a non-empty error message
        return true;
      }
    }
    // No non-empty error messages found
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a copy of the current input object to send to the server
      let updatedInput = { ...input };

      console.log(updatedInput);

      const { data } = await axios.post(
        `/car/create/`,
        updatedInput
      );
      console.log(data);
      createProductSuccess();
      navigate("/admin/dashboard");
    } catch (error) {
      FillInputsFixErrors()
    }
  };

  //api countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("https://restcountries.com/v3.1/all"); // Endpoint para obtener todos los países
        const countryNames = data.map((country) => country.name.common);
        // Ordena los países alfabéticamente de A-Z
        countryNames.sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);



  //----------------------------------------------------------Cloudinary---------------------------------------------------------------------------------------

  const [errors, setErrors] = useState(null);
  const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/Vehibuy/upload";


  const handleImageUpload = async (selectedFile) => {
    setErrors(null);


    if (!selectedFile) {
      setErrors("Please, select an image.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setErrors("The selected file is not a valid image.");
      return;
    }


    return selectedFile;
  };

  const handleButton = async (event) => {
    event.preventDefault();

    const formDataArray = [];

    for (let i = 1; i <= 5; i++) {
      const inputElement = document.getElementById(`imageInput${i}`);
      if (inputElement.files[0]) {
        const file = await handleImageUpload(inputElement.files[0]);
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "jsnxe58v");
          formData.append("folder", `${input.name}${input.brand}_car`);
          formDataArray.push(formData);
        }
      }
    }

    try {
      const uploadPromises = formDataArray.map((formData) =>
        axios.post(cloudinaryUploadUrl, formData)
      );

      const responses = await Promise.all(uploadPromises);

      const imageUrls = responses.map((response) => response.data.secure_url);

      setInput({
        ...input,
        image: imageUrls,
      });
      setErrors('Images uploaded successfully');
      uploadImageSuccess()
    } catch (error) {
      uploadImageFail()
      setErrors("Error uploading images to Cloudinary");
    }
  }

  const handleInputChange = () => {
    console.log("algo cambio");
  }

  //----------------------------------------------------------Cloudinary---------------------------------------------------------------------------------------

  console.log(input, "Informacion del JSON");

  return (
    <>

      <div className={style.goback}>
        <Link to='/admin/dashboard'>
          <ButtonBack />
        </Link>
      </div>
      <div className={style.login}>
        <div className={style.register_form}>
          <form onSubmit={handleSubmit} className={style.form_in}>
            <h1 className={style.title_register}>Create</h1>

            <label htmlFor="name" className={style.label_name}>
              Name: <br />
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                className={style.input}
                maxLength={20}
              />
              {/* Show error message if exists*/}
              {error.name && <p className={style.errors}>{error.name}</p>}
            </label>

            <label htmlFor="brand" className={style.label_lastName}>
              Brand: <br />
              <input
                type="text"
                id="brand"
                name="brand"
                value={input.brand}
                onChange={handleChange}
                className={style.input}
                maxLength={20}
              />
              {/* Show error message if exists*/}
              {error.brand && <p className={style.errors}>{error.brand}</p>}
            </label>

            <label htmlFor="model" className={style.label_name}>
              Model: <br />
              <input
                type="text"
                id="model"
                name="model"
                pattern="\d+"
                value={input.model}
                onChange={handleChange}
                className={style.input}
                maxLength={4}
              />
              {/* Show error message if exists*/}
              {error.model && <p className={style.errors}>{error.model}</p>}
            </label>


            <label className={style.label_lastName}>
              State: <br />
              <select
                className={style.input_country}
                id="state"
                name="state"
                onChange={handleChange}
              >
                <option hidden></option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
              {/* Show error message if exists*/}
              {error.state && <p className={style.errors}>{error.state}</p>}
            </label>


            <label htmlFor="price" className={style.label_name}>
              Price: <br />
              <input
                type="text"
                id="price"
                name="price"
                value={input.price}
                onChange={handleChange}
                className={style.input}
                maxLength={10}
              />
              {/* Show error message if exists*/}
              {error.price && <p className={style.errors}>{error.price}</p>}
            </label>


            <label className={style.label_country}>
              Location: <br />
              <select
                className={style.input_country}
                id="location"
                name="location"
                onChange={(e) => handleChange(e)}
              >
                <option hidden></option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>


            <label htmlFor="color" className={style.label_name}>
              Color: <br />
              <input
                type="text"
                id="color"
                name="color"
                value={input.color}
                onChange={handleChange}
                className={style.input}
                maxLength={20}
              />
              {/* Show error message if exists*/}
              {error.color && <p className={style.errors}>{error.color}</p>}
            </label>

            <label htmlFor="description" className={style.label_lastName}>
              Description: <br />
              <input
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                className={style.input}
                minLength={10}
                maxLength={300}
              />
              {/* Show error message if exists*/}
              {error.description && <p className={style.errors}>{error.description}</p>}
            </label>

            <input
              className={style.input_image}
              type="file"
              accept="image/*"
              id="imageInput1"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, 1)}
            />
            <label htmlFor="imageInput1" className={style.btn_image}>
              Select image 1
              <span id="fileName1"></span>
            </label>

            <input
              className={style.input_image}
              type="file"
              accept="image/*"
              id="imageInput2"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, 2)}
            />
            <label htmlFor="imageInput2" className={style.btn_image}>
              Select image 2
              <span id="fileName2"></span>
            </label>

            <input
              className={style.input_image}
              type="file"
              accept="image/*"
              id="imageInput3"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, 3)}
            />
            <label htmlFor="imageInput3" className={style.btn_image}>
              Select image 3
              <span id="fileName3"></span>
            </label>

            <input
              className={style.input_image}
              type="file"
              accept="image/*"
              id="imageInput4"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, 4)}
            />
            <label htmlFor="imageInput4" className={style.btn_image}>
              Select image 4
              <span id="fileName4"></span>
            </label>

            <input
              className={style.input_image}
              type="file"
              accept="image/*"
              id="imageInput5"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, 5)}
            />
            <label htmlFor="imageInput5" className={style.btn_image}>
              Select image 5
              <span id="fileName5"></span>
            </label>

            <button className={style.btn_image} onClick={handleButton}>Upload</button>
            {errors && <span>{errors}</span>}
            <button
              type="submit"
              className={style.btn_register}
              disabled={hasErrors()}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  )
};
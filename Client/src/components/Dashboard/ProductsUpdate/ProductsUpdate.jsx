import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBack } from "../../../assets/svgs";
import { modificationUserSuccess } from "../../NotiStack";
import validationProductsUpdate from "./validation/validationProductsUpdate";
import style from "./ProductsUpdate.module.css"
import { useParams } from "react-router-dom";

export default function ProductsUpdate() {

  const {id} = useParams();

  console.log(id, "edit");

  const navigate = useNavigate();

  const [countries, setCountries] = useState([])

  const [input, setInput] = useState({
    name: "",
    image: "",
    brand: "",
    model: "",
    state: "",
    price: "",
    location: "",
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
    location: "",
    color: "",
    description: "",
  });


  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    // The form is validated and the local error status is updated with the corresponding validation error messages.
    setError(
      validationProductsUpdate({
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
      console.log(updatedInput, "Soy la informacion de car");
      const { data } = await axios.put(
        `http://localhost:3001/car/edit/${id}`,
        updatedInput
      );
      modificationUserSuccess();
      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        `The request could not be completed because of the following error: ${error.message}`
      );
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

  return (
    <div className={style.login}>
    <Link to={"/admin/dashboard"}>
      <ButtonBack />
    </Link>
      <div className={style.register_form}>
        <form onSubmit={handleSubmit} className={style.form_in}>
        <h1 className={style.title_register}>Update</h1>

        <label htmlFor="name" className={style.label_name}>
            Name: <br />
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              className={style.input}
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
              value={input.model}
              onChange={handleChange}
              className={style.input}
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
            />
          {/* Show error message if exists*/}
          {error.price && <p className={style.errors}>{error.price}</p>}
          </label>

          <label htmlFor="location" className={style.label_lastName}>
            Location: <br />
            <input
              type="text"
              id="location"
              name="location"
              value={input.location}
              onChange={handleChange}
              className={style.input}
              />
            {/* Show error message if exists*/}
            {error.location && <p className={style.errors}>{error.location}</p>}
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
              />
            {/* Show error message if exists*/}
            {error.description && <p className={style.errors}>{error.description}</p>}
          </label>

          <button
            type="submit"
            className={style.btn_register}
            disabled={hasErrors()}
          >
            Save
          </button>

        </form>
      </div>
    </div>
  )
};
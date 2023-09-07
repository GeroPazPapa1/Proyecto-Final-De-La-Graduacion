import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import validate from "./validate";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { OpenEye, ClosedEye, Google } from "./svgs.jsx";
import handleGoogleSignin from "./googleSignIn";
import axios from "axios";
import { ButtonBack } from "../../assets/svgs";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    age: "",
    country: "",
    email: "",
    password: "",
  });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    lastName: false,
    age: false,
    country: false,
    email: false,
    password: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    // Setea para renderizar errores
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
    // Setea para que solo actue el error en el campo seleccionado
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  }

  const handleGoogleSignin = async () => {};

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(errors);
    console.log(input);
    if (
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      input.email &&
      input.password &&
      input.name &&
      input.lastName &&
      input.country &&
      input.age
    ) {
      try {
        const response = await axios.post("http://localhost:3001/user/create", {
          email: input.email,
          password: input.password,
          name: input.name,
          lastName: input.lastName,
          country: input.country,
          age: input.age,
          status: "user",
        });
        Swal.fire({
          title: "Succcess",
          text: "Account created successfully, please check your email and follow the verification instructions",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is already an account registered with this email",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      setInput({
        name: "",
        lastName: "",
        age: "",
        country: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields and fix any validation errors",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    validate(input);
  }, [dispatch]);

  //api countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all"); // Endpoint para obtener todos los países
        const countryNames = response.data.map(
          (country) => country.name.common
        );
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
    <div className={styles.login}>
      <Link to={"/home"}>
        <ButtonBack />
      </Link>
      <div className={styles.register_form}>
        <form
          className={styles.form_in}
          onSubmit={(e) => handleSubmitRegister(e)}
        >
          <h1 className={styles.title_register}>Register</h1>
          <p className={styles.welcome_register}>
            Create an account to get started.
          </p>
          <label className={styles.label_name}>
            Name
            <br />
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label className={styles.label_lastName}>
            Last Name
            <br />
            <input
              className={styles.input}
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label className={styles.label_age}>
            Age
            <br />
            <input
              className={styles.input}
              type="number"
              id="age"
              name="age"
              min={18}
              max={150}
              onChange={(e) => handleChange(e)}
            />
            {touchedFields.age && errors.age && (
              <p className={styles.errors}>{errors.age}</p>
            )}
          </label>
          <label className={styles.label_country}>
            Country
            <br />
            <select
              className={styles.input_country}
              id="country"
              name="country"
              onChange={(e) => handleChange(e)}
            >
              <option hidden>Select your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label_email}>
            E-mail
            <br />
            <input
              className={`${styles.input} ${styles.input_email}`}
              type="email"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            {touchedFields.email && errors.email && (
              <p className={styles.errors}>{errors.email}</p>
            )}
          </label>
          <label className={styles.label_password}>
            Password
            <br />
            <input
              className={`${styles.input} ${styles.input_password}`}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              minLength={6}
              maxLength={20}
              onChange={(e) => handleChange(e)}
            />
            <div className={styles.btn_hideandshow}>
              <button
                type="button"
                className={styles.show_hide_password}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ClosedEye /> : <OpenEye />}
              </button>
            </div>
            {touchedFields.password && errors.password && (
              <p className={styles.errors}>{errors.password}</p>
            )}
          </label>
          <button type="submit" className={`${styles.btn_register}`}>
            Register
          </button>
        </form>
        <div className={styles.auth}>
          <label className={styles.or}>Or</label>
          <button className={styles.btn_google} onClick={handleGoogleSignin}>
            <Google />
            <p className={styles.p_google}>Continue with Google</p>
          </button>
          <label>
            Already have an account?{" "}
            <Link to="/login" className={styles.tologin}>
              Log In
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
}

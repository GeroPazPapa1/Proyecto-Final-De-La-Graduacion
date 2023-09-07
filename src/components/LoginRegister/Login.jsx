import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import validate from "./validate";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { setUserId, setUserType } from "../../Redux/actions";
import axios from "axios";
import { OpenEye, ClosedEye, Google } from "./svgs.jsx";
import { ButtonBack } from "../../assets/svgs";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    lastname: false,
    birth: false,
    country: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      const token = await user.getIdToken(true);
      const response = await axios.post(
        "http://localhost:3001/user/google",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del backend:", response.data);
      const userId = response.data.id;
      const userType = response.data.type;
      dispatch(setUserId(userId));
      dispatch(setUserType(userType));
      const { access } = response.data;
      setAccess(true);
      access && navigate("/home");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Already have a user account with this email",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
    // Setea para renderizar errores
    setErrors(validate({
      ...input,
      [name]: value,
    }));
    // Setea para que solo actue el error en el campo seleccionado
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  }

  async function handleSubmitLogin(e) {
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
      input.password
    ) {
      try {
        const response = await axios.post("http://localhost:3001/user", {
          email: input.email,
          password: input.password,
        });
        Swal.fire({
          title: "Succcess",
          text: "Signed In successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        const userId = response.data.id;
        const userType = response.data.type;
        dispatch(setUserId(userId));
        dispatch(setUserType(userType));
        const { access } = response.data;
        setAccess(true);
        access && navigate("/home");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Wrong email or password",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      setInput({
        email: "",
        password: "",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Put your email and password",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  }
  useEffect(() => {
    validate(input);
  }, [dispatch]);

  useEffect(() => {
    !access && navigate("/login");
  }, [access]);
  return (
    <div className={styles.login}>
      <Link to={"/home"}><ButtonBack /></Link>
      <div className={styles.login_form}>
        <form className={styles.form_in} onSubmit={(e) => handleSubmitLogin(e)}>
          <h1 className={styles.title_login}>Log In</h1>
          <p className={styles.welcome_login}>
            Welcome back! Sign In to view our awesome prestige cars.
          </p>
          <label className={styles.label}>E-mail</label>
          <input
            className={styles.input}
            value={input.email}
            type="email"
            id="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {touchedFields.email && errors.email && <p className={styles.errors}>{errors.email}</p>}
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            value={input.password}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            minLength={8}
            maxLength={20}
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.btn_hideandshow}>
            <button type='button' className={styles.show_hide_password} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <ClosedEye />
                :
                <OpenEye />
              }
            </button>
          </div>
          {touchedFields.password && errors.password && (
            <p className={styles.errors}>{errors.password}</p>
          )}
          <Link to="forgotpassword" className={styles.forgot_password}>
            Forgot password?
          </Link>
          <button className={styles.btn_login}>Log In</button>
        </form>
        <div className={styles.auth}>
          <label className={styles.or}>
            <span>Or</span>
          </label>
          <button className={styles.btn_google} onClick={handleGoogleSignin}>
            <Google />
            <p className={styles.p_google}>Continue with Google</p>
          </button>
          <label>
            Don't have an account?{" "}
            <Link to="/register" className={styles.toregister}>
              Register
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import validate from './validate'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { OpenEye, ClosedEye, Google } from './svgs.jsx'
import handleGoogleSignin from './googleSignIn'
import { register } from '../../Redux/actions'
import axios from "axios";
import { ButtonBack } from '../../assets/svgs';


export default function Register() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [showPassword, setShowPassword] = useState(false)
    const [input, setInput] = useState({
        name: '',
        lastName: '',
        age: '',
        country: '',
        email: '',
        password: '',
    })
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

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        // Verifica si hay errores de validación y si todos los campos están llenos
        const isFormValid = input.name && input.lastName && input.age && input.country && input.email && input.password;
        if (errors === 0 && isFormValid) {
            try {
                const createUserResponse = dispatch(register(input))
                if (createUserResponse.status === 200) {
                    // Muestra un Swal success si la creación es exitosa
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'Your account has been created successfully!',
                    });
                    setInput({
                        name: '',
                        lastName: '',
                        age: '',
                        country: '',
                        email: '',
                        password: '',
                    })
                } else {
                    // Muestra un Swal error si la creación falla
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Error',
                        text: 'An error occurred while creating your account. Please try again later.',
                    });
                }
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                // Muestra un Swal error si hay un error en la solicitud
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: 'An error occurred while creating your account. Please try again later.',
                });
            }
        } else {
            // Muestra un Swal algunos campos no están llenos o hay errores de validación
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill all required fields and fix any validation errors.',
            });
        }
    };

    useEffect(() => {
        validate(input)
    }, [dispatch]);

    //api countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all'); // Endpoint para obtener todos los países
                const countryNames = response.data.map((country) => country.name.common);
                // Ordena los países alfabéticamente de A-Z
                countryNames.sort((a, b) => a.localeCompare(b));
                setCountries(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    return (
        <div className={styles.login}>
            <Link to={"/home"}><ButtonBack /></Link>
            <div className={styles.register_form}>
                <form className={styles.form_in} onSubmit={(e) => handleSubmitRegister(e)}>
                    <h1 className={styles.title_register}>Register</h1>
                    <p className={styles.welcome_register}>
                        Create an account to get started.
                    </p>
                    <label className={styles.label_name}>Name<br />
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name='name'
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label className={styles.label_lastName}>Last Name<br />
                        <input
                            className={styles.input}
                            type="text"
                            id="lastName"
                            name='lastName'
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label className={styles.label_age}>Age<br />
                        <input
                            className={styles.input}
                            type="number"
                            id="age"
                            name='age'
                            min={18}
                            max={150}
                            onChange={(e) => handleChange(e)}
                        />
                        {touchedFields.age && errors.age && <p className={styles.errors}>{errors.age}</p>}
                    </label>
                    <label className={styles.label_country}>Country<br />
                        <select
                            className={styles.input_country}
                            id="country"
                            name="country"
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden >Select your country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.label_email}>E-mail<br />
                        <input
                            className={`${styles.input} ${styles.input_email}`}
                            type="email"
                            id="email"
                            name='email'
                            onChange={(e) => handleChange(e)}
                        />
                        {touchedFields.email && errors.email && <p className={styles.errors}>{errors.email}</p>}
                    </label>
                    <label className={styles.label_password}>Password<br />
                        <input
                            className={`${styles.input} ${styles.input_password}`}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name='password'
                            minLength={6}
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
                        {touchedFields.password && errors.password && <p className={styles.errors}>{errors.password}</p>}
                    </label>
                    <button type='submit' className={`${styles.btn_register}`}  >
                        Register
                    </button>
                </form>
                <div className={styles.auth}>
                    <label className={styles.or}>
                        Or
                    </label>
                    <button
                        className={styles.btn_google}
                        onClick={handleGoogleSignin}
                    >
                        <Google />
                        <p className={styles.p_google}>Continue with Google</p>
                    </button>
                    <label>
                        Already have an account? <Link to='/login' className={styles.tologin}>Log In</Link>
                    </label>
                </div>
            </div>
        </div>
    );
}

import style from "./FormUserModification.module.css"
import React from "react";
import { useState } from "react";
import validation from "../Validation/validationModification";
import axios from "axios";

export default function FormUserModification ({id}) {

  const [input, setInput] = useState({
    id,
    name: "",
    lastName: "",
    age: 0,
    tel: "",
    country: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    lastName: "",
    age: 0,
    tel: "",
    country: "",
    email: "",
    password: "",
    image: "",
  });
  
  // Local state for the response in case of success
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
    // The form is validated and the local error status is updated with the corresponding validation error messages.
    setError(validation({ 
      ...input, 
      [event.target.name]: event.target.value 
    }))
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      // Create a copy of the current input object to send to the server
      let updatedInput = { ...input };
      const { data } = await axios.put(`http://localhost:3001/user/${id}`, updatedInput);
      // Stores the response in the 'response' state
      setResponse(data);
    } catch (error) {
      alert(`The request could not be completed because of the following error: ${error.message}`); 
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" value={input.name} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
      </div>

      <div>
        <label htmlFor="lastName">LastName: </label>
        <input type="text" id="lastName" name="lastName" value={input.lastName} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.lastName && <p style={{ color: "red" }}>{error.lastName}</p>}
      </div>

      <div>
        <label htmlFor="age">Age: </label>
        <input type="text" id="age" name="age" value={input.age} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.age && <p style={{ color: "red" }}>{error.age}</p>}
      </div>

      <div>
        <label htmlFor="tel">Phone: </label>
        <input type="text" id="tel" name="tel" value={input.tel} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.tel && <p style={{ color: "red" }}>{error.tel}</p>}
      </div>

      <div>
        <label htmlFor="country">Country: </label>
        <input type="text" id="country" name="country" value={input.country} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.country && <p style={{ color: "red" }}>{error.country}</p>}
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" name="email" value={input.email} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" name="password" value={input.password} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}
      </div>

      <div>
        <label htmlFor="image">Image: </label>
        <input type="text" id="image" name="image" value={input.image} onChange={handleChange} />
        {/* Show error message if exists*/}
        {error.image && <p style={{ color: "red" }}>{error.image}</p>}
      </div>

      <button type="submit">
        Modify
      </button>

      {/* Show the answer if it exists*/}
      {response && 
        <div>
          <p>Successfully modified user!</p>
        </div>
      }
    </form>
  )
}
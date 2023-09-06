import React from "react";
import { useState } from "react";
import style from "./Favorites.module.css";
import { connect, useSelector, useDispatch } from "react-redux";
import Card from "../Home/Card/Card";
import { ButtonBack } from "../../assets/svgs";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites); // ACLARACION
  const dispatch = useDispatch();
  console.log(favorites);
  const [booleano, setBooleano] = useState(false);

  return (
    <div>
      <Link to={"/home"}>
        <ButtonBack />
      </Link>
      <h2 className={style.favorites_title}>Autos Favoritos</h2>
      <div className={style.container}>
        {favorites?.map((char) => (
          <Card
            key={char.id}
            id={char.id}
            name={char.name}
            price={char.price}
            image={char.image}
            location={char.location}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonBack } from "../../assets/svgs";
import Card from "../Home/Card/Card";
import style from "./Favorites.module.css";


export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [booleano, setBooleano] = useState(false);

  return (
    <div>
      <Link to={"/home"}>
        <ButtonBack />
      </Link>
      <h2 className={`${style.favorites_title} ${style.title}`}>
        Tus Favoritos
      </h2>
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
import React from "react";
import { useSelector } from "react-redux";
import { ButtonBack } from "../../assets/svgs";
import Card from "../Home/Card/Card";
import style from "./Favorites.module.css";
import NOTFOUND from "./Icons/NOTFOUND.png";

export default function Favorites() {

  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <div className={style.coverImage}></div>
      <div className={style.buttonBackContainer}>
          <ButtonBack />
      </div>
      <h2 className={`${style.favorites_title} ${style.title}`}>
        Your Favorites
      </h2>
      <div className={style.container}>
        {favorites.length === 0 ? (
          <div className={style.containerNF}>
            <div className={style.containerNFP}>
              <div>
                <img src={NOTFOUND} alt="NotFound..." />
              </div>
              <dir>
                <p>You don't have Favorites</p>
                <span>Add all the cars you want!</span>
              </dir>
            </div>
          </div>
        ) : (
          favorites.map((char) => (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              state={char.state}
              price={char.price}
              image={char.image}
              location={char.location}
            />
          ))
        )}
      </div>
    </div>
  );
}


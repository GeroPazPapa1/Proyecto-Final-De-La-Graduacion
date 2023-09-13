import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";
import GERO from "./IMG/GERO.webp";
import AIMAR from "./IMG/AIMAR.webp";
import DANIEL from "./IMG/DANIEL.webp";
import MICHE from "./IMG/MICHE.webp";
import CRISTIAN from "./IMG/CRISTIAN.webp";
import HENRY from "./IMG/HENRY.png";

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <div className={styles.titleCont}>
                <div className={styles.title}>
                    <h3>ABOUT US</h3>
                    <h1>The Team of Luxury <br />Passionate Behind Vehibuy</h1>
                </div>
            </div>
            <div className={styles.description}>
                <p>We are a group of seven passionate people united by a dream: to transform the luxury car buying experience. <br /> Our story begins with the vision of creating a luxury e-commerce that offers car lovers the opportunity to <br />access an exclusive selection of exceptional vehicles.</p>
            </div>
            <div className={styles.phrase}>
                <div>
                    <h3>
                        "Beauty, elegance and perfection are in the simplicity of things... <br />if something is very complicated, move away from these concepts."
                    </h3>
                    <p>
                        - Cesare Pavese
                    </p>
                </div>
            </div>
            <div className={styles.members}>
                <h2>Members</h2>
            </div>
            <div className={styles.contPhotons}>
                <div className={styles.cards}>
                    <div>
                        <Link>
                            <img className={styles.img} src={GERO} alt={GERO} />
                        </Link>
                    </div>
                    <div className={styles.name}>Geronimo Paz Papa</div>
                    <div className={styles.country}>Argentina</div>
                    <div className={styles.fullS}>Full Stack Developer</div>
                </div>
                <div className={styles.cards}>
                    <div>
                        <Link to={"https://www.linkedin.com/in/aimar-mendoza/"} target="_blank">
                            <img className={styles.img} src={AIMAR} alt={AIMAR} />
                        </Link>
                    </div>
                    <div className={styles.name}>Aimar Mendoza</div>
                    <div className={styles.country}>Colombia</div>
                    <div className={styles.fullS}>Full Stack Developer</div>
                </div>
                <div className={styles.cards}>
                    <div>
                        <Link>
                            <img className={styles.img} src={DANIEL} alt={DANIEL} />
                        </Link>
                    </div>
                    <div className={styles.name}>Daniel Botache</div>
                    <div className={styles.country}>Colombia</div>
                    <div className={styles.fullS}>Full Stack Developer</div>
                </div>
                <div className={styles.cards}>
                    <div>
                        <Link to={"https://www.linkedin.com/in/valentino-micheloni"} target="_blank">
                            <img className={styles.img} src={MICHE} alt={MICHE} />
                        </Link>
                    </div>
                    <div className={styles.name}>Valentino Micheloni</div>
                    <div className={styles.country}>Argentina</div>
                    <div className={styles.fullS}>Full Stack Developer</div>
                </div>
                <div className={styles.cards}>
                    <div>
                        <Link to={"https://www.linkedin.com/in/cristian-iannizzotto-47a5b9269/"} target="_blank">
                            <img className={styles.img} src={CRISTIAN} alt={CRISTIAN} />
                        </Link>
                    </div>
                    <div className={styles.name}>Cristian Lannizzotto</div>
                    <div className={styles.country}>Argentina</div>
                    <div className={styles.fullS}>Full Stack Developer</div>
                </div>
            </div>
            <div className={styles.students}>
                <>
                    <p>Students of </p> <img src={HENRY} alt={HENRY}/>
                </>
            </div>
        </div>
    )
}
import React from 'react'
import LOGO_NV from "./Icons/LOGO_NV.png"
import styles from "./Footer.module.css"
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <div className={styles.containerLeft}>
                    <div>
                        <img className={styles.logo} src={LOGO_NV} alt="Logo..." />
                    </div>
                    <div>
                        <span><p>Elegance Motors</p>Elevating Driving Luxury. Discover a curated selection of exquisite luxury cars that redefine elegance and performance. Explore the epitome of automotive refinement with Elegance Motors.</span>
                    </div>
                </div>
                <div className={styles.containerList}>
                    <p>Our Service</p>
                    <ul>
                        <Link to={"/"}>
                            <li>About Us</li>
                        </Link>
                        <Link to={"/login"}>
                            <li>Login</li>
                        </Link>
                        <Link to={"/home"}>
                            <li>Search your car</li>
                        </Link>
                        <Link>
                            <li>Post your Car</li>
                        </Link>
                    </ul>
                </div>
                <div className={styles.containerList}>
                    <p>Company</p>
                    <ul>
                        <li><b>Tel: </b>+54 3498 437601</li>
                        <li><b>Email: </b>vehibuy@vehibuy.com</li>
                        <li><b>WhatsApp: </b>+54 3498 437601</li>
                        <li><b>Youtube: </b>VehiBuy</li>
                    </ul>
                </div>
                <div className={styles.containerList}>
                    <p>Follow the <br /> developers</p>
                    <ul>
                        <li>Github</li>
                        <li>LinkeIn</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
            <div className={styles.containerSecond}>
                <div>
                    <p>Copyrigth ® 2023 | Elegance Motors</p>
                </div>
            </div>
        </div>
    )
}
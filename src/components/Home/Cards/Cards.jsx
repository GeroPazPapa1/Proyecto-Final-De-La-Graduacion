import React, { useEffect, useState } from 'react';
import styles from "./Cards.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
    applyFilters,
    cardsLoadedTrue,
    getAllCars
} from '../../../Redux/actions';
import Card from '../Card/Card';
import LOADING from "./Icons/LOADING.svg";
import NOTFOUND from "./Icons/NOTFOUND.svg";

export default function Cards() {
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const carsForPage = 12; // Carros por página

    const carsLoadeds = useSelector((state) => state.carsLoaded);
    const pageFiltereds = useSelector((state) => state.pageFiltered);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!carsLoadeds) {
            const fetchCars = async () => {
                await dispatch(getAllCars());
                await dispatch(applyFilters("originCars"));
                dispatch(cardsLoadedTrue());
            };
            fetchCars();
        }
    }, [carsLoadeds, dispatch])

    useEffect(() => {
        setCurrentPage(1); // Reiniciar la página cuando cambian los datos filtrados
    }, [pageFiltereds])

    if (!carsLoadeds) {
        return (
            <div className={styles.loading}>
                <img className={styles.img} src={LOADING} alt="Loading..." />
            </div>
        );
    }

    if (pageFiltereds.length === 0) {
        return (
            <div className={styles.container2}>
                <div className={styles.containerNF}>
                    <div>
                      <img src={NOTFOUND} alt="NotFound..." />
                    </div>
                    <div>
                        <p>Not Found</p> 
                        <span>Check the spelling of the word</span>
                    </div>
                </div>
            </div>
        );
    }


    const totalPages = Math.ceil(pageFiltereds.length / carsForPage); // Total de páginas
    const indexOfLastCar = currentPage * carsForPage;
    const indexOfFirstCar = indexOfLastCar - carsForPage;
    const currentCar = pageFiltereds.slice(indexOfFirstCar, indexOfLastCar);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className={styles.containerDiv}>
            <div className={styles.container}>
                {currentCar?.map((car) => (
                    <Card
                        key={car.id}
                        id={car.id}
                        name={car.name}
                        price={car.price}
                        state={car.state}
                        image={car.image}
                        location={car.location}
                    />
                ))}
            </div>

            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ˂ Prev
                </button>
                <span>
                    <span style={{ fontWeight: 'bold', fontFamily: "'Inter', sans-serif'" }}>{currentPage}</span>
                    <span> to </span>
                    <span style={{ fontWeight: 'bold', fontFamily: "'Inter', sans-serif'" }}>{totalPages}</span>
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next ˃
                </button>
            </div>
        </div>
    );
}
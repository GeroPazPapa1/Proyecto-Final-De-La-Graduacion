import React from "react";
import styles from "./Product.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { applyFilters, deleteUserWithID, editPutCar, getAllCars } from "../../../Redux/actions";
import TRASH from "../Email/Icons/TRASH.svg";
import EDIT from "../Email/Icons/EDIT.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Email(props) {
    const { id, name, brand, color, model, price, location, state, onCheckboxChange, isChecked } = props;

    const dispatch = useDispatch();
    
    const handleDeletedEmail = async (id) => {
            Swal.fire({
            title: "¿Are you sure?",
            text: `You are about to delete ${name} from the database`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserWithID(id));
                dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    // const handlePutCar = (id) => {
    //     Swal.fire({
    //         title: "Select options",
    //         icon: "question",
    //         html:
    //             '<br>' +
    //             '<input id="input-name" class="swal2-input" type="text" placeholder="Name">' +
    //             '<input id="input-brand" class="swal2-input" type="text" placeholder="Brand">' +
    //             '<input id="input-color" class="swal2-input" type="text" placeholder="Color">' +
    //             '<input id="input-model" class="swal2-input" type="number" placeholder="Model">' +
    //             '<input id="input-price" class="swal2-input" type="number" placeholder="Price">' +
    //             '<input id="input-location" class="swal2-input" type="text" placeholder="Location">' +
    //             '<select id="select-state" class="swal2-select">' +
    //             '<option value="New">New</option>' +
    //             '<option value="Used">Used</option>' +
    //             '</select>' +
    //             '<input id="input-description" class="swal2-input" type="text" placeholder="Description">',
    //         showCancelButton: true,
    //         cancelButtonText: "Cancel",
    //         confirmButtonText: "Accept",
    //         preConfirm: () => {
    //             const selectedName = document.getElementById('input-name').value;
    //             const selectedBrand = document.getElementById('input-brand').value;
    //             const selectedColor = document.getElementById('input-color').value;
    //             const selectedModel = document.getElementById('input-model').value;
    //             const selectedPrice = document.getElementById('input-price').value;
    //             const selectedLocation = document.getElementById('input-location').value;
    //             const selectedState = document.getElementById('select-state').value;
    //             const selectedDescription = document.getElementById('input-description').value;
    //             return {
    //                 name: selectedName,
    //                 brand: selectedBrand,
    //                 color: selectedColor,
    //                 model: selectedModel,
    //                 price: selectedPrice,
    //                 location: selectedLocation,
    //                 state: selectedState,
    //                 description: selectedDescription,
    //             };
    //         }
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             let objeto = {}
    //             if (result.value.name){
    //                 objeto.name = result.value.name
    //             }
    //             if (result.value.brand){
    //                 objeto.brand = result.value.brand
    //             }
    //             if (result.value.color){
    //                 objeto.color = result.value.color
    //             }
    //             if (result.value.model){
    //                 objeto.model = result.value.model
    //             }
    //             if (result.value.price){
    //                 objeto.price = result.value.price
    //             }
    //             if (result.value.location){
    //                 objeto.location = result.value.location
    //             }
    //             if (result.value.state){
    //                 objeto.state = result.value.state
    //             }
    //             if (result.value.description){
    //                 objeto.description = result.value.description
    //             }
    //             // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
                
    //             await dispatch(editPutCar(objeto, id));
    //             await dispatch(getAllCars());
    //             // await dispatch(applyFilters("originCars"));
    //         }
    //     });
    // };

    return (
        <div className={styles.emailContainer}>
            <input 
            type="checkbox" 
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}>
            </input>
            <div className={styles.emailItem}>{name}</div>
            <div className={styles.emailItem}>{brand}</div>
            <div className={styles.emailItem}>{color}</div>
            <div className={styles.emailItem}>{model}</div>
            <div className={styles.emailItem}>{price}</div>
            <div className={styles.emailItem}>{location}</div>
            <div className={styles.emailItem}>{state}</div>
            <div className={styles.emailItem}>
                <>
                    <button className={styles.delete} >
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Delete user" />
                    </button>
                    <Link to={`/admin/dashboard/product/${id}`} className={styles.edit}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Edit user" />
                    </Link>
                </>
            </div>
        </div>
    );
}


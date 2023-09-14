import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "../Product/Product";
import styles from "./Products.module.css";
import { cardsLoadedTrue, applyFilters, getAllCars, editPutUser, getDashboard } from "../../../Redux/actions";
import EDIT from "../Email/Icons/EDIT.svg";
import TRASH from "../Email/Icons/TRASH.svg";
import Swal from "sweetalert2";
import Filters from "../Filters/Filters";

export default function DashBoardProducts() {

    const pageFilteredDb = useSelector((state) => state.pageFiltered);
    const carsLoadeds = useSelector((state) => state.carsLoaded);
    const dispatch = useDispatch();
    const [productSelection, setProductSelection] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const selectedProducts = Object.keys(productSelection).filter((key) => productSelection[key]);
    const selectedProductsObjects = selectedProducts.map((emailId) => {
        return { id: emailId };
    });
    const aux = selectedProductsObjects.length;

    useEffect(() => {
        if (!carsLoadeds) {
            const fetchCars = async () => {
                await dispatch(cardsLoadedTrue());
                await dispatch(getAllCars());
                await dispatch(applyFilters("originCars"));
            };
            fetchCars();
        }
    }, [carsLoadeds, dispatch])

    console.log(pageFilteredDb);

//     const handleCheckboxActionEdit = async () => {
//         Swal.fire({
//             title: "Select options",
//             icon: "question",
//             html: '<select id="select-status" class="swal2-select">' +
//                 '<option value="admin">Admin</option>' +
//                 '<option value="user">User</option>' +
//                 '</select>' +
//                 '<select id="select-ban" class="swal2-select">' +
//                 '<option value=true>Banned</option>' +
//                 '<option value=false>Not Banned</option>' +
//                 '</select>',
//             showCancelButton: true,
//             confirmButtonText: "Accept",
//             cancelButtonText: "Cancel",
//             preConfirm: () => {
//                 const selectedStatus = document.getElementById('select-status').value;
//                 const selectedBan = document.getElementById('select-ban').value;
//                 return {
//                     type: selectedStatus,
//                     ban: selectedBan
//                 };
//             }
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const { type, ban } = result.value;
//                 // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
//                 console.log("Type seleccionado:", status);
//                 console.log("Ban seleccionado:", ban);
//                 for (const id in emailSelection) {
//                 await dispatch(editPutUser(id, type, ban));}
//                 await dispatch(getDashboard());
//                 await dispatch(applyFilterDb("originEmails"));
//             }
//         });
//     };

// const handleCheckboxActionDelete = async () => {
//     Swal.fire({
//     title: "¿Are you sure?",
//     text: `You are about to delete ${name} from the database`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Accept",
//     cancelButtonText: "Cancel",
// }).then((result) => {
//     if (result.isConfirmed) {
//         for (const id in emailSelection) {
//         dispatch(deleteUserWithID(id));}
//         dispatch(applyFilterDb("originEmails"));
//     }
// });
// };

const handleCheckboxChange = (id) => {
// Actualiza el estado de selección cuando se cambia el checkbox
setProductSelection((prevState) => ({
  ...prevState,
  [id]: !prevState[id],
}));
};

const handleSelectAllChange = () => {
  setSelectAll(!selectAll);
  pageFilteredDb.forEach((email) => {
    console.log(email.id, "emailid en checkbox");

    setProductSelection((prevState) => ({
      ...prevState,
      [email.id]: !selectAll,
    }));
  });
    
      
};


 




    return (
        <div>
                <div className={styles.filtersEdit}>
                    <Filters/>
                    <button className={aux<2 ? styles.deleteDisabled : styles.delete} disabled={aux<2}>
                       <img className={styles.img} src={TRASH} alt="Icon..." title="Eliminar usuario" />
                    </button>
                    <button className={aux<2 ? styles.editDisabled : styles.edit} disabled={aux<2}>
                       <img className={styles.img} src={EDIT} alt="Icon..." title="Editar usuario" />
                    </button>
                </div>
            <div className={styles.emailContainer}>
                <input 
                type="checkbox" 
                checked={selectAll}
                onChange= {handleSelectAllChange}
                >
                </input>
                <div className={styles.emailItem}>Name</div>
                <div className={styles.emailItem}>Brand</div>
                <div className={styles.emailItem}>Color</div>
                <div className={styles.emailItem}>Model</div>
                <div className={styles.emailItem}>Price</div>
                <div className={styles.emailItem}>Location</div>
                <div className={styles.emailItem}>State</div>
                <div className={styles.emailItem}>Actions</div>
            </div>
            <div>
                {pageFilteredDb?.map((email) => (
                    <Product
                        key={email.id}
                        id={email.id}
                        name={email.name}
                        brand={email.brand}
                        color={email.color}
                        model={email.model}
                        price={email.price}
                        location={email.location}
                        state={email.state} 
                        isChecked={productSelection[email.id] || false}
                        onCheckboxChange={handleCheckboxChange}
                        />
                ))
                }
            </div>
        </div>
    )
};

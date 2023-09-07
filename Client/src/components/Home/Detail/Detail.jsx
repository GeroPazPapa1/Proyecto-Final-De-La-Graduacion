import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDetail, resetDetail, addToCart, deleteProduct } from '../../../Redux/actions';
import styles from './Detail.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { LocationSvg, ButtonBack } from '../../../assets/svgs'
import { CarRemovedFromCart, CarAddedToCart } from '../../NotiStack';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    const cartList = useSelector((state) => state.cartList);
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstImageBordered, setFirstImageBordered] = useState(false)
    const mainSliderRef = useRef(null);
    const secondSliderRef = useRef(null);

    const handleRemoveFromCart = () => {
        dispatch(deleteProduct(id));
        CarRemovedFromCart()
    }

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(resetDetail());
        };
    }, [id, dispatch]);

    const isInCart = () => {
        return cartList.some((product) => product.id === id);
    };

    const handleAddToCart = () => {
        if (!isInCart()) {
            dispatch(addToCart(detail));
            CarAddedToCart()
        }
    };

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    };

    const handleThumbnailClick = (index) => {
        mainSliderRef.current.slickGoTo(index);
        setSelectedImage(index);
    };

    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 2000,
        beforeChange: (current, next) => {
            if (current === 4 && next === 0) {
                mainSliderRef.current.slickGoTo(next);
            }
            mainSliderRef.current.slickGoTo(next);
        },
        afterChange: (index) => {
            setSelectedImage(index);
        },
    };

    return (
        <div className={styles.detail}>
            <Link to={"/home"}><ButtonBack/></Link>
            <div className={styles.detail_card}>
                <div className={`${styles.carrousel_img} ${styles.custom_carrousel}`}>
                    <div ref={secondSliderRef} className={styles.selected_imgs}>
                        {detail.image &&
                            detail.image.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img className={index === selectedImage ? styles.selected_image : styles.carrousel_img2} src={img} alt={`Image ${index}`} />
                                </div>
                            ))}
                    </div>
                </div>
                <div className={`${styles.carrousel_img} ${styles.custom_carrousel}`}>
                    <Slider {...settings} ref={mainSliderRef} initialSlide={selectedImage} className={styles.border_img}>
                        {detail.image &&
                            detail.image.map((img, index) => (
                                <div key={index} >
                                    <img className={styles.carrousel_img1} src={img} alt={`Image ${index}`} />
                                </div>
                            ))}
                    </Slider>
                </div>
                <div className={styles.detail_info}>
                    <h1 className={`${styles.h1_detail} ${styles.detail_name}`}>{detail.name && detail.name}<br />
                        <span className={`${styles.h1_detail} ${styles.detail_brand}`}>{detail.brand && detail.brand} {detail.model && detail.model}</span> <br />
                        <span className={`${styles.h1_detail} ${styles.detail_state}`}>{detail.state && detail.state}</span>
                        <div className={styles.locationcolor}>
                            <h1 className={`${styles.h1_detail} ${styles.detail_location}`}>
                                <Link
                                    // Link para buscar el location en google maps
                                    to={`https://www.google.com/maps/search/${encodeURIComponent(detail.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linktolocation}
                                >
                                    <LocationSvg />
                                    {detail.location && detail.location}
                                </Link></h1>
                            <h1 className={`${styles.h1_detail} ${styles.detail_color}`}>Color: {detail.color && detail.color}</h1>
                        </div>
                    </h1>
                    <h1 className={`${styles.h1_detail} ${styles.detail_price}`}>$ {formatPrice(detail.price)} USD</h1>
                    {isInCart() ? (
                        <div className={styles.div_removegocart}>
                            <Link to="/cart"><button className={styles.btn_gocart}>Go to cart</button></Link>
                            <button className={styles.btn_removecart} onClick={handleRemoveFromCart}>
                                Remove from cart
                            </button>
                        </div>
                    ) : (
                        <button className={styles.btn_addcart} onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    )}
                </div>
                <div className={styles.description_car}>
                    <h1 className={`${styles.h1_detail} ${styles.detail_description}`}>Description:<p> {detail.description && detail.description}</p></h1>
                </div>
            </div>
        </div >
    )
}
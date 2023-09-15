import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postReview, getReviews, resetReview, deleteReview, updateReview } from '../../../../Redux/actions';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineStar, AiFillStar, AiFillEdit } from 'react-icons/ai'
import { postReviewNoti, deleteReviewNoti, updateReviewNoti, errorReviewNoti } from '../../../NotiStack';
import styles from './Review.module.css'

const Review = () => {
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
  const detail = useSelector((state) => state.detail);
  const reviews = useSelector((state) => state.reviews)
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState()
  const [rating, setRating] = useState(0);
  const [data, setData] = useState({
    rating: "",
    title: "",
    review: "",
    carId: "",
    userId: ""
  });
  const [newData, setNewData] = useState({})
  const idUser = loggedUser?.response?.id
  const idCar = detail.id

  const validate = () => {
    if (!data.rating) {
      setError({ rating: 'The rating cannot be empty' });
    } else if (isNaN(data.rating) || data.rating < 1 || data.rating > 5) {
      setError({ rating: 'Rating must be a number between 1 and 5' });
    }

    if (!data.title) {
      setError({ title: 'The title cannot be empty' });
    } else if (data.title.length > 20) {
      setError({ title: 'The title must not exceed 20 characters' });
    }

    if (!data.review) {
      setError({ review: 'The review cannot be empty' });
    }
  };


  useEffect(() => {
    const checkUserReview = async () => {
      const hasUserReviewed = await reviews.some((review) => review.User.id === idUser);

      if (hasUserReviewed) {
        setError({ userId: 'You have already published a review.' });
      }
    };

    checkUserReview();
  }, [reviews, idUser])

  useEffect(() => {
    dispatch(getReviews(idCar))
  }, [idCar])

  useEffect(() => {
    if (idCar && idUser) {
      setData({
        ...data,
        carId: idCar,
        userId: idUser
      })
    }
  }, [idCar, idUser])

  const handleRating = (event, ratingValue) => {
    event.preventDefault();
    setRating(ratingValue);
  }

  const handleChange = (event) => {
    setData({
      ...data,
      rating: rating,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    validate()
    console.log(error)
    if (error) {
      errorReviewNoti()
      setData({
        rating: "",
        title: "",
        review: "",
        carId: idCar,
        userId: idUser,
      });
      setRating(0);
    } else if (!error) {
      await dispatch(postReview(data));
      await dispatch(resetReview());
      await dispatch(getReviews(idCar));
      setData({
        rating: "",
        title: "",
        review: "",
        carId: idCar,
        userId: idUser,
      });
      setRating(0);
      postReviewNoti();
    }
  }

  const handleDelete = async (id) => {
    await dispatch(deleteReview(id))
    await dispatch(resetReview())
    await dispatch(getReviews(idCar))
    deleteReviewNoti()
    setError()
  }

  const handleDeleteConfirmation = (id) => {
    setShowConfirmation(id);
  };

  const handleConfirmationYes = async (id) => {
    setShowConfirmation(false);
    handleDelete(id)
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  const handleUpdate = (review) => {
    setEditingReview(review);
  }

  const handleUpdateChange = (event, id) => {
    setNewData(prevData => ({
      ...prevData,
      rating: rating,
      id: id,
      [event.target.name]: event.target.value,
    }));
  }

  const handleUpdateSubmit = async () => {
    await dispatch(resetReview())
    await dispatch(updateReview(newData))
    await dispatch(getReviews(idCar))
    setEditingReview(null);
    setNewData({})
    updateReviewNoti()
  }

  return (
    <div className={styles.detail_review}>
      <div className={styles.formReview}>
        {idUser && <form className={styles.form} onSubmit={handleSubmit}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <div className={styles.radio_star} key={i}>
                <input
                  className={styles.input}
                  type="radio"
                  id={`star${i}`}
                  name="rating"
                  value={ratingValue}
                  checked={rating === ratingValue}
                  onClick={(event) => handleRating(event, ratingValue)}
                  style={{ display: 'none' }}
                />
                <label
                  className={styles.star_label}
                  htmlFor={`star${i}`}
                  onClick={(event) => handleRating(event, ratingValue)}>{i + 1 <= rating ? <AiFillStar /> : <AiOutlineStar />}</label>
              </div>
            );
          })} {error && <span>{error.rating}</span>} <br />
          <div>
            <input className={styles.input} type="text" name='title' onChange={handleChange} value={data.title} placeholder='Title:' />
            {error && <span>{error.title}</span>}
            <textarea className={styles.textarea} name="review" value={data.review} onChange={handleChange} placeholder='Review:' cols="5" rows="3"></textarea>
            {error && <span>{error.rating}</span>}
          </div>
          <button type="submit" className={styles.btn_submit}>Submit Review</button>
        </form>}
      </div> <br />
      <div className={styles.Review_Seccion}>
        <span className={styles.Review_Title}>Review:</span><br />
        <span className={styles.loader}></span>
        <div>
          {reviews && [...reviews].reverse().map((review, index) => (
            <div key={index}>
              {editingReview === review.id ? (
                <form className={styles.form} onSubmit={() => handleUpdateSubmit()}>
                  {[...Array(5)].map((start, i) => {
                    const ratingValue = i + 1;
                    return (
                      <div className={styles.radio_star} key={i}>
                        <input
                          type="radio"
                          id={`star${i}`}
                          name="rating"
                          value={ratingValue}
                          className={styles.input}
                          checked={rating === ratingValue}
                          onChange={(event) => handleRating(event, ratingValue)}
                          style={{ display: 'none' }}
                        />
                        <label
                          className={styles.star_label}
                          htmlFor={`star${i}`}
                          onClick={(event) => handleRating(event, ratingValue)} placeholder={review.rating} >{i < rating ? <AiFillStar /> : <AiOutlineStar />}</label>
                      </div>
                    );
                  })}
                  <input className={styles.input} type="text" name="title" value={newData.title} onChange={(event) => handleUpdateChange(event, review.id)} placeholder={review.title} />
                  <input className={styles.input} type="text" name="review" value={newData.review} onChange={(event) => handleUpdateChange(event, review.id)} placeholder={review.review} />
                  <button type="submit" className={styles.btn_update_review}>Update Review</button>
                </form>
              ) : (
                <div className={styles.review_render}>
                  {idUser === review.User.id && <button className={styles.btn_edit} onClick={() => handleUpdate(review.id)}>Edit Review <AiFillEdit /></button>}
                  <img src={review.User.image} alt="imgprofile" className={styles.image} />
                  {review.User && <span className={styles.name}>{`${review.User.name} ${review.User.lastName}`}</span>} <br />
                  {[...Array(review.rating)].map((star, i) => {
                    return (
                      <label className={styles.star_label} key={i} >{i + 1 <= review.rating ? <AiFillStar /> : <AiOutlineStar />}</label>
                    );
                  })}
                  <br />
                  <span className={styles.title}>{review.title}</span><br />
                  <span className={styles.review}>{review.review}</span><br />
                  {idUser === review.User.id && <button className={styles.btn_delete} onClick={() => handleDeleteConfirmation(review.id)}>Delete</button>}
                  <hr />
                </div>
              )}
              {showConfirmation === review.id && (
                <Alert className={styles.alert} variant="warning">
                  <h3 >Are you sure to delete this review? This action cannot be undone!</h3>
                  <Button variant="secondary" className={styles.btn_no} onClick={handleConfirmationNo} >
                    No
                  </Button>
                  <Button variant="danger" className={styles.btn_yes} onClick={() => handleConfirmationYes(review.id)} >
                    Yes
                  </Button>
                </Alert>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Review;
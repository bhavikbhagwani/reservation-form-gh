import React from 'react'
import styles from './Modal.module.css'
import {useEffect} from 'react'

const Modal = ({showModal, onClose, values, resetResevForm}) => {

    const {name, email, phone, numberOfPeople, date, time, place, comm, nameError, emailError, phoneNumberError, numPeopleError, dateError, timeError, placeError, finalError} = values
    
    useEffect(() => {
        if (showModal) {
            // Get the width of the scrollbar
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            // Apply padding to body to account for scrollbar width
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    }, [showModal]);

    const newReservation = () => {
        onClose()
        resetResevForm()

    }

    return (
    <>
    {showModal && 
    <div className=''>
        <div className={styles.modal_container}>
            <div className={styles.heading}>
                <h1>Reservation Completed</h1> 
            </div>
            
            <div className={styles.details_box}>
                <h2>Reservation details:</h2>

                <h4>Name of the reserver: {name}</h4>
                <h4>Email of the reserver: {email}</h4>
                <h4>Phone number of the reserver: {phone}</h4>
                <h4>Number of People for Reservation: {numberOfPeople}</h4>
                <h4>Date of reservation: {date}</h4>
                <h4>Time of reservation: {time}</h4>
                <h4>Place of sitting: {place}</h4>
                <h4>Any other comments: {comm === "" ? "no comments" : comm}</h4>

            </div>

            
            
            <div className={styles.modal_btns}>
                <button onClick={onClose}>Close</button>
                <button onClick={newReservation}>New Reservation</button>
            </div>
        </div>
    </div>
    }
    </>
    
  )
}

export default Modal
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import styles from './ResForm.module.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser'
import { IoMdInformationCircleOutline } from "react-icons/io";


const ResForm = ({values, valueSetters, onOpen, resetResevForm, showModal}) => {

    const {name, email, phone, numberOfPeople, date, time, place, comm, nameError, emailError, phoneNumberError, numPeopleError, dateError, timeError, placeError, finalError} = values
    const {setName, setEmail, setPhone, setNumberOfPeople, setDate, setTime, setPlace, setComments, setNameError, setEmailError, setphoneNumberError, setnumPeopleError, setDateError, setTimeError, setPlaceError, setFinalError} = valueSetters

  



    const updateName = (event) => {
      const nameValue = event.target.value
      setName(nameValue)
      
      let nameErrorMessage = "";

      if (nameValue === "") {
        nameErrorMessage = "Name is empty. Please enter a name";
      } else if (nameValue.length > 20) {
        nameErrorMessage = "Name is too long";
      } else if (/\d/.test(nameValue)){
        nameErrorMessage = "Name should not contain numbers"
      }
      setNameError(nameErrorMessage);
      
    }
  
    const updateEmail = (event) => {
      const emailValue = event.target.value
      setEmail(emailValue)
      
      let emailErrorMessage = "";

      if (emailValue === "") {
        emailErrorMessage = "Email is empty. Please enter an email";
      } else if (emailValue.length > 50) {
        emailErrorMessage = "Email is too long";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
        emailErrorMessage = "Email is not valid. Try again"

      
      setEmailError(emailErrorMessage);
    };
  
    const updatePhoneNumber = (event) => {
      const phoneValue = event.target.value
      setPhone(phoneValue);

      let phoneNumberErrorMessage = "";

      if (phoneValue === ""){
        phoneNumberErrorMessage = "Phone number is empty. Please enter a phone number"
      } else if (!/^\+[\d\s]+$/.test(phoneValue)){
        phoneNumberErrorMessage = "Phone number should only contain a '+' and a phone number. For example: +34 666 666 666 "
      }
      setphoneNumberError(phoneNumberErrorMessage);




    };
  
    const updateNumberOfPeople = (event) => {
      const numPeopleValue = event.target.value
      setNumberOfPeople(numPeopleValue)

      let numPeopleErrorMessage = ""
      
      if (numPeopleValue === ""){
        numPeopleErrorMessage = "Number of people is empty or not valid. Please enter a valid number of people"
      } else if (numPeopleValue > 30){
        numPeopleErrorMessage = "Number of people should not exceed 20"
      } else if (numPeopleValue <= 0){
        numPeopleErrorMessage = "Number of people should not be less than or equal to 0. Please enter a valid number of people"
      }
      setnumPeopleError(numPeopleErrorMessage);

    }

    const getTodayDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear()
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')

      return `${dd}-${mm}-${yyyy}`
    }

    const checkDate = (dateValue) => {
      const selectedDate = new Date(dateValue)
      const today = new Date()
      today.setHours(0,0,0,0)

      return selectedDate < today;
    }
  
    const updateDate = (event) => {
      const dateValue = event.target.value
      setDate(dateValue);

      let dateErrorMessage = ""

      if (dateValue === ""){
        dateErrorMessage = "Date is empty or not complete. Please enter a valid date of reservation"
      } else if (checkDate(dateValue)){
        dateErrorMessage = "Date is not valid. Please enter a valid date of reservation"
      }
      

      setDateError(dateErrorMessage)

    };
  
    const updateTime = (event) => {
      const timeValue = event.target.value;
      setTime(timeValue);
    
      let timeErrorMessage = "";
    
      if (timeValue === "") {
        timeErrorMessage = "Time is empty or not complete. Please enter a valid time of reservation.";
      } else {
        const [hours, minutes] = timeValue.split(":").map(Number);
    
        // Get the current date and time
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
    
        // Calculate the time 2 hours ahead of the current time
        const twoHoursLater = new Date();
        twoHoursLater.setHours(currentHours + 2, currentMinutes, 0, 0);
    
        // Create a Date object for the selected time
        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0, 0);
    
        if (selectedTime < twoHoursLater) {
          timeErrorMessage = "Time must be at least 2 hours later than the current time. Please enter a valid time of reservation.";
        } else if (hours < 11 || (hours === 11 && minutes < 0)) {
          timeErrorMessage = "Time cannot be earlier than 11:00. Please enter a valid time of reservation.";
        } else if (hours > 23 || (hours === 23 && minutes > 0)) {
          timeErrorMessage = "Time cannot be later than 23:00. Please enter a valid time of reservation.";
        }
      }
    
      setTimeError(timeErrorMessage);
    };
  
    const updatePlace = (event) => {


      const placeValue = event
      setPlace(placeValue);

      


    };
  
    const updateComments = (event) => {
      setComments(event.target.value);
    };

    const checkNoErrorMessages = () => {
      if (nameError === "" && emailError === "" && phoneNumberError === "" && numPeopleError === ""
        && dateError === "" && timeError === "" && placeError === "") {
        return true; // Returns true if all error messages are empty
      }
      return false; // Returns false if any error message is not empty
    }

    const checkAllValuesFilled = () => {
      if (name === "" && email === "" && phone === "" && numberOfPeople === ""
        || date === "" && time === "" && place === ""){
        return false
      }
      return true
    }


    const sendEmailToMyself = (event) => {
        emailjs.sendForm('service_r9dmcyl', 'template_uy6yawe', event.target, 'Xu9C-u3lLfyexah2C')

        
    }

    const sendEmailToUser = (event) => {
        emailjs.sendForm('service_r9dmcyl','template_oluap5d',event.target,'Xu9C-u3lLfyexah2C')
    }




    const handleSubmit = (event) => {
      event.preventDefault();

      

      if (checkAllValuesFilled() && checkNoErrorMessages()){
        
        onOpen()
        setFinalError("")


        //sendEmailToMyself(event)
        //sendEmailToUser(event)

      }else{
        setFinalError("Some values have not been entered or have not been entered correctly. Please fill in the reservation form and try again ")
      }

    }
  
  

  return (
    <div className={`${styles.box} ${showModal ? styles.disabledForm : ''}`}>
        <div className={styles.heading}>
          <h1>Reservation for: {name} </h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label className={styles.label}>Name:</label>
            <input onChange={updateName}  type="text" autoComplete='off' name='name_from' id='nameFrom'className={styles.input} value={name} placeholder='Enter name'/>
            <ErrorMessage errorContents={nameError} errorType='normal'></ErrorMessage>
            
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Email: </label>
            <input onChange={updateEmail} type="text" autoComplete='off' name='email_from' id='emailFrom'className={styles.input} value={email} placeholder='Enter email'/>
            <ErrorMessage errorContents={emailError} errorType='normal'></ErrorMessage>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label_phone}>Phone Number (including country code):</label>
            <input type='text' onChange={updatePhoneNumber} autoComplete='off' name='phone_from' id='phoneFrom'className={styles.input} value={phone} placeholder='e.g. +34 666 666 666 '/>
            <ErrorMessage errorContents={phoneNumberError} errorType='normal'></ErrorMessage>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>How many people: </label>
            <input type='number' onChange={updateNumberOfPeople} autoComplete='off' name='num_people_from' id='numPeopleFrom'className={styles.input} value={numberOfPeople}/>
            <ErrorMessage errorContents={numPeopleError} errorType='normal'></ErrorMessage>
          </div>
          <div className={styles.input_group}>
              <label className={styles.label}>Select Date: </label>
              <input onChange={updateDate} type="date" name='date_from' id='Date' className={styles.input} value={date} />
              <ErrorMessage errorContents={dateError} errorType='normal'></ErrorMessage>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Time of Reservation:</label>
            <input onChange={updateTime} type='time'  name='time_from' id='Time'className={styles.input} value={time}/>
            <ErrorMessage errorContents={timeError} errorType='normal'></ErrorMessage>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Select place of sitting: </label>
            <div className={styles.radioButtonsContainer}>
              <div className={styles.radioButton}>
                <input checked={place==="inside"} onChange={() => updatePlace("inside")}  id='radio2' className={styles.radioButtonInput} type='radio' value="inside" />
                <label htmlFor="radio2" className={styles.radioButtonLabel}>
                  <span className={styles.radioButtonCustom}></span>
                  Inside
                </label>
              </div>
              <div className={styles.radioButton}>
                <input checked={place==="outside"} onChange={() => updatePlace("outside")}  id='radio3' className={styles.radioButtonInput} type='radio' value="outside" />
                <label htmlFor="radio3" className={styles.radioButtonLabel}>
                  <span className={styles.radioButtonCustom}></span>
                  Outisde
                </label>
              </div>
              <div className={styles.radioButton}>
                <input checked={place==="any"} onChange={() => updatePlace("any")}  id='radio1' className={styles.radioButtonInput} type='radio' value="any" />
                <label htmlFor="radio1" className={styles.radioButtonLabel}>
                  <span className={styles.radioButtonCustom}></span>
                  Any
                </label>
              </div>
            </div>
        
          </div>

          <input type="hidden" name="place_from" value={place}/>

          <div className={styles.input_group}>
            <label className={styles.label}>Other Comments: </label>
            <textarea onChange={(event)=>updateComments(event)} name="textarea" id={styles.textarea} required="" value={comm} placeholder='Enter any additional comments (optional)'></textarea>
          </div>

          <div className={styles.btn_container}>
            <button className={styles.btn} type='button' onClick={resetResevForm}>Reset</button>
            <button className={styles.btn} type='submit'>Reserve</button>
          </div>
          <ErrorMessage errorContents={finalError} errorType="final" />

          



          
          
        </form>
      </div>
  )
}

export default ResForm
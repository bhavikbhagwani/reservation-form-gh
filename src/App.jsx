import { useState } from 'react'
import './App.css'
import ResForm from './components/ResForm/ResForm'
import Modal from './components/Modal/Modal'

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [place, setPlace] = useState("any")
  const [comm, setComments] = useState("")

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneNumberError, setphoneNumberError] = useState("")
  const [numPeopleError, setnumPeopleError] = useState("")
  const [dateError, setDateError] = useState("")
  const [timeError, setTimeError] = useState("")
  const [placeError, setPlaceError] = useState("")

  const [finalError, setFinalError] = useState("")

  const values = {name, email, phone, numberOfPeople, date, time, place, comm, nameError, emailError, phoneNumberError, numPeopleError, dateError, timeError, placeError, finalError}
  const valueSetters = {setName, setEmail, setPhone, setNumberOfPeople, setDate, setTime, setPlace, setComments, setNameError, setEmailError, setphoneNumberError, setnumPeopleError, setDateError, setTimeError, setPlaceError, setFinalError }

  const [showModal, setShowModal] = useState(false)

  const onOpen = () => {
    setShowModal(true)
  }

  const onClose = () => {
    setShowModal(false)
  }

  const resetResevForm = () => {
  
    setName("");
    setEmail("");
    setPhone("");
    setNumberOfPeople("")
    setDate("");
    setTime("");
    setPlace("any");
    setComments("");

  }

  return (
    <>
    <div className='full_container'>
      <ResForm values={values} valueSetters = {valueSetters} onOpen = {onOpen} resetResevForm = {resetResevForm}></ResForm>
    </div>
    <Modal
    showModal={showModal} 
    onClose = {onClose}
    values={values}
    resetResevForm = {resetResevForm}

    ></Modal>
    </>
  )
}

export default App

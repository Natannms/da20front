import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Requests from '../../request/requests';
import SuccessAlert from '../../components/Alerts/SuccessAlert';

const EditPhone = () => {
    const requests = new Requests()
    const [selectedPhoneNumber, SetSelectedPhoneNumber] = useState({})
    const [number, setNumber] = useState('')

    const [showAlert, setShowAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState(false)

    const location = useLocation();
    const contactToProps = location;

    async function updatePhoneNumber(e) {
        e.preventDefault()
        try {
            const data = await requests.updateNumber(selectedPhoneNumber.id, number)
            setAlertMessage(data.message)
            setShowAlert('success')
            setNumber('')
        } catch (error) {
            setAlertMessage(error.message)
            setShowAlert('error')
        }
    }

    async function  deleteNumber() {
        requests.deleteNumberPhone(contactToProps.state.phone.id)
    }
    function getPhoneToLocalStorage() {
        setNumber(contactToProps.state.phone.number);
        SetSelectedPhoneNumber(contactToProps.state.phone)
    }

    function handleChangeNumber(e) {
        setNumber(e.target.value)
    }

    useEffect(() => {
        getPhoneToLocalStorage()
    }, [ ])
    return (
        <div class="w-full h-full p-10">

            {showAlert === 'success' && <SuccessAlert msg={alertMessage} />}

            {showAlert === 'error' && <SuccessAlert msg={alertMessage} />}

            <form onSubmit={(e) => updatePhoneNumber(e)} class=" rounded px-8 pt-6 pb-8 mb-4 w-96 mt-10">
                <Link to="/" className='flex gap-4 items-center mb-10 text-orange-400'>
                    <AiOutlineArrowLeft size={30} color="orange" /> Voltar
                </Link>
                <h1 className='text-white text-4xl'>Edite o Telefone </h1>
                <h2 className="text-gray-300 text-2xl mt-10">{number}</h2>
                <div class="mb-4 pt-10">
                    <label class="block text-gray-300 text-sm font-bold mb-2" for="phones">
                        Telefone
                    </label>
                    <span class="flex gap-4">
                        <input value={number} onChange={(e) => handleChangeNumber(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="phones" type="text" />
                    </span>
                </div>

                <div class="flex items-center justify-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10" type="submit">
                        Alterar
                    </button>
                </div>
                <div class="flex items-center justify-end">
                    <div onClick={deleteNumber} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10 text-center">
                        Excluir
                    </div>
                </div>
            </form>
        </div>
    );

}
export default EditPhone;

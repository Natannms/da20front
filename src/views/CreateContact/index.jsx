import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Requests from '../../request/requests';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
const CreateContact = () => {
    const requests = new Requests()

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [number, setNumber] = useState('')

    const [showAlert, setShowAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState(false)
    function handleChangeName(event){
        setName(event.target.value)
    }
    function handleChangeAge(event){
        setAge(event.target.value)
    }
    function handleChangeNumber(event){
        setNumber(event.target.value)
    }


    async function createContact(e) {
        e.preventDefault()
        try {
            const data = await requests.createContact(name, age, number)
            console.log(data);
            setAlertMessage(data.message)
            setShowAlert('success')
            setName('')
            setAge('')
            setNumber('')
        } catch (error) {
            console.log(error);
            setAlertMessage(error.message)
            setShowAlert('error')
        }
    }
    return (
        <div class="w-full h-full p-10">

            {showAlert === 'success' && <SuccessAlert msg={alertMessage} />}

            {showAlert === 'error' && <SuccessAlert msg={alertMessage} />}

            <form onSubmit={(e)=>createContact(e)} class=" rounded px-8 pt-6 pb-8 mb-4 w-96 mt-10">
                <Link to="/" className='flex gap-4 items-center mb-10 text-orange-400'>
                    <AiOutlineArrowLeft size={30} color="orange" /> Voltar
                </Link>
                <h1 className='text-white text-4xl'>Crie um novo contato</h1>
                <div class="mb-4 pt-10">
                    <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
                        Nome
                    </label>
                    <input value={name} onChange={handleChangeName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Jhon Doe" />
                </div>
                <div class="mb-4 pt-10">
                    <label class="block text-gray-300 text-sm font-bold mb-2" for="age">
                        Idade
                    </label>
                    <input value={age} onChange={(e)=>handleChangeAge(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="age" type="number" />
                </div>
                <div class="mb-4 pt-10">
                    <label class="block text-gray-300 text-sm font-bold mb-2" for="phones">
                        Telefone
                    </label>
                    <span class="flex gap-4">
                        <input value={number} onChange={(e)=>handleChangeNumber(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="phones" type="text" />
                    </span>
                    <div className="flex w-full flex-col mt-10 text-orange-100">
                        <small className=""> Adicione um numero de telefone.</small>
                        <small className="">Você poderá adicionar mais números futuramente.</small>
                    </div>
                </div>

                <div class="flex items-center justify-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );

}
export default CreateContact;

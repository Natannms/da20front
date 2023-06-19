import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import Requests from '../../request/requests';
import SuccessAlert from '../../components/Alerts/SuccessAlert';

const EditContact = () => {
    const requests = new Requests()

    const [selectedContact, setSelectedContact] = useState({})
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phones, setPhones] = useState([0, 1, 2, 3])
    const [newNumber, setNewNumber] = useState('')
    const [showAlert, setShowAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const location = useLocation();
    const contactToProps = location;

    async function updateContact(e) {
        e.preventDefault()
        try {
            const data = await requests.updateContact(selectedContact.id, name, age)
            console.log(data.data);
            setAlertMessage(data.message)
            setShowAlert('success')
        } catch (error) {
            console.log(error);
            setAlertMessage(error.message)
            setShowAlert('error')
        }
    }
    async function CreateNewNumber(e) {
        e.preventDefault()
        console.log(selectedContact);
        try {
            const data = await requests.createNumber(selectedContact.id, newNumber)
            setAlertMessage(data.message)
            setShowAlert('success')
        } catch (error) {
            setAlertMessage(error.message)
            setShowAlert('error')
        }
    }

    async function getContact() {
        console.log(contactToProps.state)

        if (!contactToProps.state.name && !contactToProps.state.age && !contactToProps.state.Phones) {
            setShowAlert('error')
            setAlertMessage('Não foi possivel obter dados da pagina anterior. por favor volte e selecione !')
        }

        setName(contactToProps.state.name)
        setAge(contactToProps.state.age)
        setPhones(contactToProps.state.Phones)
        setSelectedContact(contactToProps.state)
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeAge(e) {
        setAge(e.target.value)
    }
    function handleChangeNewNumber(e) {
        setNewNumber(e.target.value)
    }
    useEffect(() => {
        getContact()
    }, [])

    return (
        <div className='w-full h-full p-10 flex'>
            <div class="w-full">

                {showAlert === 'success' && <SuccessAlert msg={alertMessage} />}

                {showAlert === 'error' && <SuccessAlert msg={alertMessage} />}

                <form onSubmit={(e) => updateContact(e)} class=" rounded px-8 pt-6 pb-8 mb-4 w-96 mt-10">
                    <Link to="/" className='flex gap-4 items-center mb-10 text-orange-400'>
                        <AiOutlineArrowLeft size={30} color="orange" /> Voltar
                    </Link>
                    <h1 className='text-white text-4xl'>Editar Contato</h1>
                    <div class="mb-4 pt-10">
                        <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
                            Nome:
                        </label>
                        <span class="flex gap-4">
                            <input value={name} onChange={(e) => handleChangeName(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
                        </span>
                    </div>
                    <div class="mb-4 pt-10">
                        <label class="block text-gray-300 text-sm font-bold mb-2" for="age">
                            Idade:
                        </label>
                        <span class="flex gap-4">
                            <input value={age} onChange={(e) => handleChangeAge(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="age" type="number" max={60} min={7} />
                        </span>
                    </div>

                    <div class="flex items-center justify-end">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10" type="submit">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full">
                <div className="w-full pt-20">
                    <h2 className='text-bold mb-10'>Telefones</h2>

                    <div className="phonesBox w-full">
                        {phones.map(item => {
                            return (
                                <Link key={item.id} className="badge bg-orange-500 p-4 flex gap-8 justify-center items-center"
                                    to="/edit-phone"
                                    state={{ phone: item }}
                                >
                                    <p className='font-bold text-white'>{item.number}</p>
                                    <AiOutlineEdit size={20} color='white'
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full pt-10">
                    <h2 className='text-bold mb-10'>Adicionar novo telefone</h2>

                    <form onSubmit={(e)=>CreateNewNumber(e)} className="flex flex-col">
                        <div class="mb-4 pt-14">
                            <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
                                Novo numero:
                            </label>
                            <span class="flex gap-4">
                                <input value={newNumber} onChange={(e) => handleChangeNewNumber(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="newNumber" type="text" />
                            </span>
                        </div>

                        <div class="flex items-center justify-end">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10" type="submit">
                                Adicionar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default EditContact;

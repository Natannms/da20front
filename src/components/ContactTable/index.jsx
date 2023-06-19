import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactTable = ({ contacts, deleteContact }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Idade</th>
                        <th>Quantidade de telefones</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => {
                        return (
                            <tr key={contact.id} className="hover">
                                <td>
                                    <Link
                                    to='/edit-contact'
                                    state={contact}
                                    className='flex gap-4 btn btn-sm w-10 bg-orange-400 hover:bg-orange-700'>
                                        <AiOutlineEdit size={32} color='black' />
                                    </Link>
                                </td>
                                <td>{contact.name}</td>
                                <td>{contact.age}</td>
                                <td className='flex gap-2 flex-wrap'>
                                    {contact.Phones.map(phone => {
                                        return <div className='btn btn-sm bg-gray-700' key={phone.id} >{phone.number}  </div>
                                    })}
                                </td>
                                <td>
                                    <div className="btn btn-sm btn-error hover:bg-red-950" onClick={()=>deleteContact(contact.id)}>
                                        <FaTrash color='white' />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );

}
export default ContactTable;

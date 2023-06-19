import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Requests from '../../request/requests';
const NarBar = ({getContactList}) => {
    const [keyword, setKeyword] = useState('');
    const request =  new Requests()
    function handleChangeSearch(e) {

        setKeyword(e.target.value)
    }

    function search(e){
        e.preventDefault()
        getContactList(keyword)
    }
    return (
        <div className="bg-gray-600 flex justify-between items-center flex-wrap px-4 py-2">
            <div className="">
                <p className="btn btn-ghost normal-case text-xl">Meus Contatos</p>
            </div>
            <form onSubmit={(e)=>search(e)} className="search flex gap-4" >
                <input  class="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='Buscar...' onChange={handleChangeSearch} value={keyword}/>
                <button className='btn bg-orange-400 text-white w-48 ' type='submit'>Buscar</button>
            </form>
            <div className="flex-none">
                <Link className="btn btn-success" to="/create-contact">
                    CRIAR CONTATO
                </Link>
            </div>
        </div>
    );
}
export default NarBar;

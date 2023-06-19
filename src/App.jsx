import { useEffect, useState } from 'react';
import Requests from './request/requests';
import ContactTable from './components/ContactTable'

import NarBar from './components/NavBar';
import SuccessAlert from './components/Alerts/SuccessAlert';
function App() {
  const requests = new Requests()

  const [contacts, setContacts] = useState([])
  const [showAlert, setShowAlert] = useState('')
  const [alertMessage, setAlertMessage] = useState(false)

  async function getContactList(keyword) {
    try {
      const data = await requests.getContacts(keyword)
      setContacts(data)
    } catch (error) {
      setAlertMessage(error.message)
      setShowAlert('error')
    }
  }

  async function deleteContact(contact_id) {
    try {
      await requests.deleteContact(contact_id)
      window.location.reload()
    } catch (error) {
      setAlertMessage(error.message)
      setShowAlert('error')
    }
  }

  useEffect(()=>{
    getContactList()
  },[])

  return (
    <div className="App">
      <NarBar getContactList={getContactList} />
      {showAlert === 'success' && <SuccessAlert msg={alertMessage} />}

      {showAlert === 'error' && <SuccessAlert msg={alertMessage} />}
      <ContactTable contacts={contacts} deleteContact={deleteContact}/>
    </div>
  );
}

export default App;

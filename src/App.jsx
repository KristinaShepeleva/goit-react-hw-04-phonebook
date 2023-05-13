
import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from 'components/Container/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')));
  const [filter, setFilter] = useState('');


useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (contacts.find(contact => contact.name === name)) {
      toast(`${name} is already in contacts`);
      return false;
    }
    if (contacts.find(contact => contact.number === number)) {
      toast(`${number} is already in contacts`);
      return false;
    }
    setContacts(prevState => [newContact, ...prevState].sort((first, second) => first.name.localeCompare(second.name)));
    return true;
  };


  const handleFilter = evn => {
      setFilter(evn.currentTarget.value)
  }

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

    const visibleContacts = contacts.filter(element =>
      element.name.toUpperCase().includes(filter.toUpperCase())
    );

       return (
      <Container>
        <h1>Phonebook</h1> 
         <ToastContainer 
autoClose={3000} />
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        { contacts.length > 1 && (<Filter value={filter} onChange={handleFilter} />)}
        {contacts.length > 0 ? (
      
        <ContactList
            contacts={visibleContacts}
            onDelete={deleteContact}
          /> 
        ): (<p>Your phonebook is empty.</p>)}
       
    </Container>
  )
}

export default App;

import { Component } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from 'components/Container/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
state = {
    contacts: [],
    filter: '',
  };
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContact = JSON.parse(contacts);

    if (parsContact) {
      this.setState({ contacts: parsContact });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
     
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      toast(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      toast(`${name} is already in contacts.`);
    }
    
    else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts].sort((first, second) => first.name.localeCompare(second.name)),
      }));
    }
  };


  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = evn => {  
  this.setState({ filter: evn.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
   
    const filterValue = filter.toUpperCase();
    const visibleContacts = contacts.filter(element =>
      element.name.toUpperCase().includes(filterValue)
    );

    return (
      <Container>
        <h1>Phonebook</h1> 
         <ToastContainer position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        { contacts.length > 1 && (<Filter value={filter} onChange={this.handleFilter} />)}
        {contacts.length > 0 ? (
      
        <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          /> 
        ): (<p>Your phonebook is empty.</p>)}
       
    </Container>
  )
}


}


export default App;

import 'modern-normalize/modern-normalize.css';
import { Component } from 'react';
import SectionTitle from './Section/SectionTitle';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './app.module.css';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: [...contacts] });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  onChangeFilterValue = event => {
    // const filterValue = event.target.value;
    // console.log('filterValue', filterValue);

    this.setState({
      filter: event.target.value,
    });
  };
  compareContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase().trim();
    // console.log('normalizeFilter: ', normalizeFilter);
    // console.log(contacts);
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });
  };
  addContact = data => {
    const { name } = data;
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} - this contact already in contact list`);
      return;
    } else {
      const contact = { ...data, id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    // this.state.contacts.find()
  };
  render() {
    // console.log('contacts', this.state.contacts);
    return (
      <div className={s.wrap}>
        <SectionTitle title="Phonebook">
          {/* в инфо приходит наш стейт с формы после сабмита и записываеться в параметр дата */}
          <ContactsForm catchSubmitInfo={this.addContact} />
        </SectionTitle>
        <SectionTitle title="Contacts">
          <Filter
            filterValue={this.state.filter}
            catchFilterInfo={this.onChangeFilterValue}
          />
          {this.state.contacts.length ? (
            <ContactList
              contacts={this.compareContacts()}
              contactOnDelete={this.deleteContacts}
            />
          ) : (
            <p>Your phonebook is empty</p>
          )}
        </SectionTitle>
      </div>
    );
  }
}
export default App;

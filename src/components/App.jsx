import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('my-contacts');
    return contacts ? JSON.parse(contacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name} ${number} is already exist`);
      return;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevContacts, newContact];
    });
  };

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(item => {
      return (
        item.name.toLowerCase() === normalizedName &&
        item.number.toLowerCase() === number
      );
    });

    return Boolean(dublicate);
  };

  const onFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.includes(filter)
    );
  };

  const onDelete = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  return (
    <>
      <h1 style={{ padding: 20 }}>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2 style={{ padding: 20 }}>Contacts</h2>
      <Filter filter={filter} filterItem={onFilterChange} />
      <Contacts filteredContacts={filteredContacts} deleteItem={onDelete} />
    </>
  );
};

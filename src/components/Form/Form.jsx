import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './form.module.css';

const INITIAL_VALUE = {
  name: '',
  number: '',
};

const Form = ({ onSubmit }) => {
  const [value, setValue] = useState({ ...INITIAL_VALUE });

  const handleInput = ({ currentTarget: { name, value } }) => {
    setValue(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit({ ...value });
    reset();
  };

  const reset = () => {
    setValue({ ...INITIAL_VALUE });
  };

  const { name, number } = value;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleInput}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              className={styles.input}
              required
            />
          </label>
          <button type="submit" className={styles.btn}>
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

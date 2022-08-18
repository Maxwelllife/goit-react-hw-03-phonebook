import { Component } from 'react';
import s from './ContactsForm.module.css';
import PropTypes from 'prop-types';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };
  onHandleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.catchSubmitInfo(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            className={s.inputName}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onHandleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.inputNumber}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.onHandleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};

export default ContactsForm;

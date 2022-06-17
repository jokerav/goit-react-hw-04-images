import PropTypes from 'prop-types';
import s from '../styles.module.css';
import { useState } from 'react';
const Searchbar = ({ getInput }) => {
  const [input, SetInput] = useState('');

  const onChange = e => {
    const { value } = e.currentTarget;
    SetInput(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getInput(input.toLocaleLowerCase().trim());
  };
  return (
    <header onSubmit={onSubmit} className={s.Searchbar}>
      <form className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          onChange={onChange}
          value={input}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;

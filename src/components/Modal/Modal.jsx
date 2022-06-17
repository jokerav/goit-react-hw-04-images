import PropTypes from 'prop-types';
import s from '../styles.module.css';
import { useEffect } from 'react';
export const Modal = ({ img, closeModal }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };
  const handleClick = event => {
    if (event.target.nodeName !== 'IMG') {
      closeModal();
    }
  };
  useEffect(
    (() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClick);
      };
    },
    [])
  );

  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('click', handleClick);
  //   };
  // }, []);

  return (
    <div className={s.Overlay}>
      <div className={s.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

import axios from 'axios';
import { MutatingDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import s from './styles.module.css';
import Button from './Button/button';
import { useState } from 'react';
import { useEffect } from 'react';
export const App = () => {
  const [request, setRequest] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setimages] = useState([]);
  const [isModalOpen, setModal] = useState(false);
  const [link, setLink] = useState('');

  const getInput = input => setRequest(input);

  async function getImages() {
    const searchRequest = `https://pixabay.com/api/?q=${request}&page=${page}&key=25937561-4be56ebc67dabae3f5d5abc9c&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(searchRequest);
      return response.data;
    } catch (error) {
      return error.toJSON();
    }
  }
  useEffect(() => {
    setPage(1);
  }, [request]);
  useEffect(() => {
    setLoading(true);
    if (request !== '') {
      getImages().then(responce => {
        let newImages = [];
        responce.hits.forEach(image => {
          const { id, webformatURL, largeImageURL } = image;
          const img = { id, webformatURL, largeImageURL };
          newImages.push(img);
        });

        if (page === 1) {
          setimages([...newImages]);
        } else {
          setimages(images => [...images, ...newImages]);
        }
        setLoading(false);
      });
    }
  }, [page, request]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      setLink(e.target.attributes.data.nodeValue);
      setModal(true);
    }
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className={s.App}>
      <Searchbar getInput={getInput} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onLoadMore={onLoadMore}
          onImageClick={onImageClick}
        />
      )}
      {images.length > 0 && <Button onLoadMore={onLoadMore} />}
      {isLoading && (
        <MutatingDots
          height="100"
          width="100"
          color="grey"
          ariaLabel="loading"
        />
      )}
      {isModalOpen && <Modal img={link} closeModal={closeModal} />}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { list, longList, shortList } from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);

  const prevSlide = () => {
    const newPerson = currentPerson - 1;
    if (newPerson < 0) {
      setCurrentPerson((prevPerson) => prevPerson + people.length - 1);
    } else {
      setCurrentPerson(newPerson);
    }
  };

  const nextSlide = () => {
    const newPerson = currentPerson + 1;
    if (newPerson > people.length - 1) {
      setCurrentPerson((prevPerson) => prevPerson % (people.length - 1));
    } else {
      setCurrentPerson(newPerson);
    }
  };

  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className='slide'
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img className='person-img' src={image} alt={name} />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button className='next' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;

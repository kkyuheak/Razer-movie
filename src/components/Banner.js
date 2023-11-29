import React, { useEffect, useState } from "react";
import { instance } from "../api";
import "./Banner.css";
import styled from "styled-components";
import Moviemodal from "./Moviemodal/Moviemodal";

const Banner = ({ movie }) => {
  const [movieList, setMovieList] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [slidePosition, setSlidePosition] = useState(0);
  const [btnShow, setBtnShow] = useState(false);
  const [rightBtnShow, setRightBtnShow] = useState(false);

  useEffect(() => {
    findMovieList();
  }, []);

  useEffect(() => {
    handleBtnShow();
  }, [slidePosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRightBtnShow(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const findMovieList = async () => {
    const response = await instance.get(movie);
    setMovieList(response.data.results);
  };

  const bannerClick = (movie) => {
    setBannerMovie(movie);
    setModalOpen(true);
    console.log(bannerMovie);
  };

  const handlePrevClick = () => {
    setSlidePosition((prevPosition) => prevPosition - 1);
  };

  const handleNextClick = () => {
    setSlidePosition((prevPosition) => {
      if (prevPosition === 5) {
        return 0;
      }
      return prevPosition + 1;
    });
  };

  const handleBtnShow = () => {
    if (slidePosition === 0) {
      setBtnShow(false);
    } else {
      setBtnShow(true);
    }
  };

  return (
    <Container>
      <div
        className={btnShow ? "prev-btn show-btn" : "prev-btn"}
        onClick={handlePrevClick}
      >
        <p>{"<"}</p>
      </div>
      <MovieWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {movieList.map((movie) => {
          return (
            <MovieListItem key={movie.id} slideposition={slidePosition}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                onClick={(e) => {
                  bannerClick(movie);
                  e.preventDefault();
                }}
              />
            </MovieListItem>
          );
        })}
      </MovieWrapper>
      <div
        className={rightBtnShow ? "next-btn show-btn" : "next-btn"}
        onClick={handleNextClick}
      >
        <p>{">"}</p>
      </div>

      {modalOpen ? (
        <Moviemodal
          selectedMovieId={bannerMovie.id}
          setModalOpen={setModalOpen}
        />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const MovieWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  list-style: none;
  overflow: hidden;
  position: relative;
`;

const MovieListItem = styled.li`
  transform: translateX(${(props) => props.slideposition * -430}px);
  transition: all 0.4s;

  img {
    width: 150px;
    height: 210px;
    display: block;
    border-radius: 3px;
    cursor: pointer;
  }
  img:hover {
    border: 2px solid rgb(89, 174, 166);
  }

  @media screen and (max-width: 1400px) {
    img {
      width: 140px;
      height: 200px;
    }
  }

  @media screen and (max-width: 768px) {
    img {
      width: 130px;
      height: 180px;
    }
  }
`;

export default Banner;

import React, { useEffect, useState } from "react";
import { instance } from "../api";
import "./Banner.css";
import styled from "styled-components";
import Moviemodal from "./Moviemodal/Moviemodal";

const Banner = ({ movie }) => {
  const [movieList, setMovieList] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    findMovieList();
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

  // const movieVideo = async () => {
  //   const res = await instance.get("movie/507089/videos");
  //   console.log(res);
  // };

  // movieVideo();

  // console.log(movieList);

  return (
    <div>
      <MovieWrapper>
        {movieList.map((movie) => {
          return (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                onClick={(e) => {
                  bannerClick(movie);
                  e.preventDefault();
                }}
              />
            </li>
          );
        })}
      </MovieWrapper>
      {modalOpen ? <Moviemodal selectedMovieId={bannerMovie.id} /> : null}
    </div>
  );
};

const MovieWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  list-style: none;
  overflow-y: hidden;
  margin-bottom: 50px;

  img {
    width: 155px;
    height: 220px;
    display: block;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export default Banner;

import React, { useEffect, useState } from "react";
import { instance } from "../../api";
import "./Moviemodal.css";

const Moviemodal = ({ selectedMovieId }) => {
  const [detailMovie, setDetailMovie] = useState({});

  console.log(selectedMovieId);

  useEffect(() => {
    movieDetail();
  }, [selectedMovieId]);

  const movieDetail = async () => {
    const response = await instance.get(`movie/${selectedMovieId}`);
    setDetailMovie(response.data);
    console.log(response);
  };

  return (
    <div className="movie-modal">
      <div className="modal-img">
        <img
          src={`https://image.tmdb.org/t/p/original/${detailMovie.backdrop_path}`}
          alt={detailMovie.backdrop_path}
        />
      </div>
      <div className="modal-detail">
        <p className="detail-title">{detailMovie.title}</p>
        <p className="detail-overview">{detailMovie.overview}</p>
        <p>개봉일 : {detailMovie.release_date}</p>
      </div>
    </div>
  );
};

export default Moviemodal;

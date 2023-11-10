import React, { useEffect, useState } from "react";
import { instance } from "../../api";
import "./Moviemodal.css";

const Moviemodal = ({ selectedMovieId, setModalOpen }) => {
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

  window.addEventListener("click", () => {
    setModalOpen(false);
  });

  return (
    <div className="modal">
      <div className="movie-modal">
        {detailMovie.backdrop_path ? (
          <div
            className="modal-wrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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
            <div
              className="modal-close"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <img src="images/close.png" alt="close-icon" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Moviemodal;

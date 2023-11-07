import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Banner from "../../components/Banner";
import { instance } from "../../api";
import YouTube from "react-youtube";

const MainPage = () => {
  const nowPlaying = "movie/now_playing";
  const popularPlaying = "movie/popular";
  const topRatedMovie = "movie/top_rated";

  const [getMovie, setGetMovie] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [videoKey, setVideoKey] = useState("");
  const [detailVideo, setDetailVideo] = useState({});

  useEffect(() => {
    const popMovieList = async () => {
      try {
        const response = await instance.get(nowPlaying);
        console.log(response.data.results);
        setGetMovie(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    popMovieList();
  }, []);

  useEffect(() => {
    if (getMovie.length > 0) {
      const randomId = Math.floor(Math.random() * getMovie.length);
      const randomMovieId = getMovie[randomId].id;
      console.log(randomMovieId);
      setMovieId(randomMovieId);
    }
  }, [getMovie]);

  useEffect(() => {
    const fetchDetailMovie = async () => {
      if (movieId) {
        try {
          const response = await instance.get(`movie/${movieId}`);
          console.log("detail", response);
          setDetailVideo(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchDetailMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchVideoKey = async () => {
      if (movieId) {
        try {
          const response = await instance.get(`movie/${movieId}/videos`);
          if (response.data.results && response.data.results.length > 0) {
            console.log("hi");
            console.log(response.data.results);
            setVideoKey(response.data.results[0].key);
          } else {
            console.log("no-key");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchVideoKey();
  }, [movieId]);

  return (
    <div>
      <div className="main-banner">
        <div className="main-youtube">
          {videoKey ? (
            <>
              <h1 className="main-title">{detailVideo.title}</h1>
              <p className="video-overview">{detailVideo.overview}</p>

              <YouTube
                className="main-video"
                videoId={`${videoKey}`}
                opts={{
                  width: "1000",
                  height: "400",
                  playerVars: {
                    autoplay: 1,
                    mute: 1,
                    rel: 0,
                    modestbranding: 1,
                    loop: 1,
                    controls: 0,
                    disablekb: 1,
                  },
                }}
                onReady={(e) => {
                  e.target.mute();
                }}
              />
            </>
          ) : null}
        </div>
        <h1 className="banner-title">상영중인 영화</h1>
        <Banner movie={nowPlaying} />
        <h1 className="banner-title">인기있는 영화</h1>
        <Banner movie={popularPlaying} />
        <h1 className="banner-title">평점 높은 영화</h1>
        <Banner movie={topRatedMovie} />
      </div>
    </div>
  );
};

export default MainPage;

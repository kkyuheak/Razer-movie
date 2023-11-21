import React, { useEffect, useState } from "react";
import { instance } from "../../api";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TvPage.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TvPage = () => {
  const [tvList, setTvList] = useState([]);
  const [topRatedTvList, setTopRatedTvList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTvList();
    getTopRatedTvList();
  }, []);

  const getTvList = async () => {
    const response = await instance.get(`trending/tv/week`);
    setTvList(response.data.results);
  };

  const getTopRatedTvList = async () => {
    const res = await instance.get("tv/top_rated");
    console.log(res);
    setTopRatedTvList(res.data.results);
  };

  return (
    <Container>
      <h1 className="tv-title">TV 프로그램</h1>

      <Swiper
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={true}
      >
        {tvList.map((tv) => {
          return (
            <SwiperSlide key={tv.id}>
              <Wrapper>
                <img
                  src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`}
                  alt={tv.name}
                  className="main-img"
                  onClick={() => {
                    navigate(`/tvprogram/${tv.id}`);
                  }}
                />
                <p className="tv-name">{tv.name}</p>
              </Wrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <h1 className="tv-title">평점 높은 TV프로그램</h1>

      <div>
        <TvBanner>
          {topRatedTvList.map((tvList) => {
            return (
              <li key={tvList.id}>
                <TopTvImg
                  src={`https://image.tmdb.org/t/p/original${tvList.poster_path}`}
                  alt={tvList.name}
                  onClick={() => {
                    navigate(`/tvprogram/${tvList.id}`);
                  }}
                />
              </li>
            );
          })}
        </TvBanner>
      </div>
    </Container>
  );
};

export default TvPage;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 1000px;
  height: 400px;
  margin: 0 auto;
  position: reletive;
  cursor: pointer;
`;

const TvBanner = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  overflow-y: hidden;
`;

const TopTvImg = styled.img`
  width: 155px;
  height: 225px;
  display: block;
  cursor: pointer;

  &:hover {
    border: 2px solid rgb(19, 204, 6);
  }
`;

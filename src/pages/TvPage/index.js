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
import axios from "axios";

const TvPage = () => {
  const [tvList, setTvList] = useState([]);
  const [topRatedTvList, setTopRatedTvList] = useState([]);
  const [moreCount, setMoreCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getTvList();
    getTopRatedTvList();
  }, []);

  useEffect(() => {
    getMoreTvList();
  }, [moreCount]);

  const getTvList = async () => {
    const response = await instance.get(`trending/tv/week`);
    setTvList(response.data.results);
  };

  const getTopRatedTvList = async () => {
    const res = await instance.get("tv/top_rated");
    console.log(res);
    setTopRatedTvList(res.data.results);
  };

  const getMoreTvList = async () => {
    const res = await instance.get(`tv/top_rated?page=${moreCount}`);
    console.log(res);
    const a = [...topRatedTvList, ...res.data.results];
    setTopRatedTvList(a);
    console.log(topRatedTvList);
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

      <TvBanner>
        {topRatedTvList.map((tvList) => {
          return (
            <TvItem key={tvList.id}>
              <TopTvImg
                src={`https://image.tmdb.org/t/p/original${tvList.poster_path}`}
                alt={tvList.name}
                onClick={() => {
                  navigate(`/tvprogram/${tvList.id}`);
                }}
              />
              <p className="tv-list-title">{tvList.name}</p>
            </TvItem>
          );
        })}
      </TvBanner>
      <MoreBtn
        onClick={() => {
          setMoreCount(moreCount + 1);
        }}
      >
        더 보기
      </MoreBtn>
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
  max-width: 830px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
`;

const TvItem = styled.li`
  width: 150px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const TopTvImg = styled.img`
  width: 150px;
  height: 200px;
  display: block;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  &:hover {
    border: 2px solid rgb(19, 204, 6);
  }
`;

const MoreBtn = styled.button`
  width: 250px;
  height: 40px;
  background-color: rgb(19, 204, 6);
  border-radius: 10px;
  color: #000;
  border: none;
  cursor: pointer;
  display: block;
  margin: 20px auto;
`;

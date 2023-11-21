import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api";
import styled from "styled-components";
import "./TvDetailPage.css";

const TvDetailPage = () => {
  let { tvid } = useParams();
  const [tvDetail, setTvDetail] = useState({});
  console.log(tvid);

  useEffect(() => {
    getDetailTv();
  }, [tvid]);

  const getDetailTv = async () => {
    const res = await instance.get(`tv/${tvid}`);
    setTvDetail(res.data);
    console.log(res);
  };

  return (
    <div>
      {tvDetail.backdrop_path ? (
        <TvImage mainimg={tvDetail.backdrop_path}>
          <Poster
            src={`https://image.tmdb.org/t/p/original/${tvDetail.poster_path}`}
            alt={tvDetail.name}
          />
          <DetailWrapper>
            <h1 className="tv-detail-title">{tvDetail.name}</h1>
            <p className="episode">
              에피소드 : {tvDetail.number_of_episodes}화
            </p>
            <p>개요</p>
            <OverView>{tvDetail.overview}</OverView>
            <p>평점 : {tvDetail.vote_average.toFixed(1)}점</p>
          </DetailWrapper>
        </TvImage>
      ) : null}
      <div className="detail-producer">
        {tvDetail.created_by ? <h3>제작자</h3> : null}

        <div className="producer-profile">
          {tvDetail.created_by
            ? tvDetail.created_by.map((producer) => {
                return (
                  <div key={producer.id} className="profile">
                    <Poster
                      src={`https://image.tmdb.org/t/p/original/${producer.profile_path}`}
                    />
                    <p>{producer.name}</p>
                  </div>
                );
              })
            : null}
        </div>
        <p>첫 방영: {tvDetail.first_air_date}</p>
        <p>시즌 : {tvDetail.seasons ? tvDetail.seasons.length : 0}개 시즌</p>
      </div>
    </div>
  );
};

export default TvDetailPage;

const TvImage = styled.div`
  background-image: url(${(props) =>
    props.mainimg
      ? `https://image.tmdb.org/t/p/original/${props.mainimg}`
      : null});
  max-width: 100vw;
  height: 450px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  position: reletive;

  &::before {
    content: "";
    width: 100%;
    height: 450px;
    position: absolute;
    top: 36px;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Poster = styled.img`
  width: 150px;
  height: 225px;
  z-index: 8;
`;

const DetailWrapper = styled.div`
  max-height: 200px;
  z-index: 8;
  position: reletive;
  color: #fff;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-around;
`;

const OverView = styled.p`
  width: 800px;
  font-size: 12px;
  margin: 5px 0;
`;

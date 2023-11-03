import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "e5bb122ccbccf92a8a00db36c3c5cada",
    language: "ko-KR",
  },
});

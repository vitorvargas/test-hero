import axios from "axios";
import { getMd5 } from "../utils";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com",
});

instance.interceptors.request.use((config) => {
  const ts = new Date().getTime();

  if (!config.params) {
    config.params = {};
  }

  const hash = getMd5(
    `${ts}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLICK_KEY}`
  );

  config.params.ts = ts;
  config.params.hash = hash;
  config.params.apikey = process.env.REACT_APP_MARVEL_PUBLICK_KEY

  return config;
});

export default instance;

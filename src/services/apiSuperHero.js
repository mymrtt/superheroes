// Libs
import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com';
export const API_URL = process.env.REACT_APP_SUPERHERO_API_URL;

export const getAllHeroes = (heroId) => axios({
  url: `${cors}/${API_URL}/${heroId}`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'originWhitelist': [],
    'requireHeader': ['origin', 'x-requested-with'],
    'removeHeaders': ['cookie', 'cookie2']
	},
});

export const getHeroByName = (heroName) => axios({
  url: `${cors}/${API_URL}/search/${heroName}`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'originWhitelist': [],
    'requireHeader': ['origin', 'x-requested-with'],
    'removeHeaders': ['cookie', 'cookie2']
	},
});
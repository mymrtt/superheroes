// Libs
import axios from 'axios'

// const cors = 'https://cors-anywhere.herokuapp.com'
const cors = 'https://cors.bridged.cc'
export const API_URL = 'https://superheroapi.com/api/3508522622561545'

export const getAllHeroes = (heroId) => axios({
  url: `${cors}/${API_URL}/${heroId}`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'X-Requested-With',
	},
});

export const getHeroByName = (heroName) => axios({
  url: `${cors}/${API_URL}/search/${heroName}`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'GET',
    'Access-Control-Allow-Methods': 'X-Requested-With',
	},
});
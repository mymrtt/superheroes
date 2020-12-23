import axios from 'axios'

export const API_URL = process.env.REACT_APP_BACK_API_URL

export const createUser = (user) => axios({
  url: `${API_URL}/classes/_User`,
  method: 'post',
  headers: {
    'X-Parse-Application-Id': process.env.REACT_APP_BACK_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_BACK_REST_API_KEY,
		'X-Parse-Revocable-Session': 1,
		'Content-Type': 'application/json',
  },
  data: user,
});

export const login = (email, password) => axios({
	url: `${API_URL}/login?email=${email}&password=${password}`,
	method: 'get',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_BACK_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_BACK_REST_API_KEY,
		'X-Parse-Revocable-Session': 1,
	},
});

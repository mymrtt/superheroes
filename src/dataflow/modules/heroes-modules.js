// Action Type
const ADD_HERO = 'superHeroes/ADD/ADD_HERO';
const SEARCH_HERO = 'superHeroes/SEARCH/SEARCH_HERO';
const FAV_HERO = 'superHeros/FAV/FAV_HERO';
const UNFAV_HERO = 'superHeros/UNFAV/UNFAV_HERO';

const initialState = {
  listSearch: [],
  listFavorites: [],
};

// Reducers
export default function Reducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_HERO:
      return Object.assign({}, state, {
        listSearch: [
          ...action.info
        ]
      });
    case FAV_HERO:
      return Object.assign({}, state, {
        listFavorites: [
          ...state.listFavorites, action.info
        ]
      });
    case UNFAV_HERO:
      return {
        ...state,
        listFavorites: state.listFavorites.filter(item => item !== action.info),
      };
    default: return state;
  }
}

// Action Creator
export const addHero = info => ({
  type: ADD_HERO,
  info,
});

export const searchHero = info => ({
  type: SEARCH_HERO,
  info,
});

export const favHero = info => ({
  type: FAV_HERO,
  info,
});

export const unfavHero = info => ({
  type: UNFAV_HERO,
  info,
})
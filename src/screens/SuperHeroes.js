// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Components
import Card from '../components/Card';
import Input from '../components/Input';

import Layout from '../components/layout';

// // Images
import searchIcon from '../assets/search.svg';
import loaderIcon from '../assets/loader.svg';

// Services
import { getAllHeroes, getHeroByName } from '../services/apiSuperHero';

// Redux
import { searchHero, unfavHero, favHero } from '../dataflow/modules/heroes-modules';

const mapStateToProps = (state) => ({
  listSearch: state.heroes.listSearch,
  listFavorites: state.heroes.listFavorites,
})

const mapDispatchToProps = (dispatch) => ({
  searchHero: (info) => dispatch(searchHero(info)),
  favHero: (info) => dispatch(favHero(info)),
  unfavHero: (info) => dispatch(unfavHero(info)),
});

// Styles
const Container = styled.div`
  width: 80%;
  display: flex;

  @media(max-width: 768px) {
    position: ${(props) => props.favsMob && 'relative'};
  }

  @media(max-width: 648px) {
    width: 100%;
    height: -webkit-fill-available;
  } 
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(max-width: 768px) {
    padding-top: ${(props) => props.favsMob && '5rem'};
    display: flex;
    flex-direction: column;
  }
`;

const ContainerTitle = styled.div`
  margin-top: ${(props) => props.favs && '3rem'};
  margin: ${(props) => props.favs ? '3rem 2rem' : '2rem'};
  width: 30%;
  max-width: 30%;
  height: fit-content;

  @media(max-width: 1024px) {
    width: 45%;
  }

  @media(max-width: 768px) {
    margin: 0;
    padding: 0 3rem;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media(max-width: 648px) {
    margin-left: 0;
    margin-bottom: 1rem;
    height: 10rem;
    min-height: 10rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const ContainerSearch = styled.div`
  margin-top: 2rem;
  padding: 0;
  width: 100%;
  border: 1px solid #842219;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  border-radius: 20px;

  @media(max-width: 768px) {
    width: 60%;
  }

  @media(max-width: 648px) {
    width: 100%;
    min-height: 3rem;
  }
`;

const SearchIcon = styled.img`
  margin-right: .5rem;
  margin-left: .5rem;
  cursor: pointer;
`;

const ContainerList = styled.div`
  margin-top: 3rem;
  width: 90%;
  max-width: 90%;
  height: 90vh;
  display: inline-grid;
  justify-items: center;
  align-items: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1px;

  @media(max-width: 1024px) {
    padding: 0 5rem;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
  }

  @media(max-width: 768px) {
    padding: 0 3rem;
    max-width: 100%;
    justify-content: center;
  }

  @media(max-width: 375px) {
    padding: 0 1.55rem;
  }
`;

const ContainerCard = styled.div`
  margin-top: ${(props) => props.fav && '4rem'};
  width: inherit;
  display: flex;
  justify-content: center;
`;

const ContainerLoader = styled.figure`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 648px) {
    height: 18rem;
  }
`;

const Loader = styled.img`
  width: 3rem;
`;

const ErrorMessage = styled.p`
  margin: .5rem 0;
  color: tomato;
  font-size: .8rem;
  font-weight: 800;

  @media(max-width: 648px) {
    margin-bottom: .9rem;
  }
`;

const ShowButton = styled.button`
  position: fixed;
  right: ${(props) => props.searchAndFavs ? 'auto' : '0'};
  top: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: ${(props) => props.searchAndFavs && '1rem'};
  width: 8rem;
  height: 3rem;
  font-size: .8rem;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  background-color: ${({ theme }) => theme.text};
  z-index: 2;

  @media(max-width: 768px) {
    width: 7rem;
    font-size: .75rem;
    height: 2.5rem;
  }

  @media(max-width: 648px) {
    position: absolute;
    left: ${(props) => props.searchAndFavs ? '0' : 'auto'};
    margin: 1rem .5rem 1rem .5rem;
    height: 3rem;
    color: ${({ theme }) => theme.text};
    border: 1px solid;
    background: transparent;
  }
`;

class SuperHeroes extends Component {
  state = {
    superHerosList: [],
    searchValue: '',
    searchValueError: undefined,
    isFetching: false,
    heroSelected: undefined,
    isSearch: false,
    isFavoritesList: false,
  }

  componentDidMount() {
    this.fetchingGetAllHeroes();
  }

  fetchingGetAllHeroes = async () => {  
    try {
      this.setState({
        isFetching: true,
      });

      const heroes = [];
      let i = 1;
      while(i <= 3) {
        const response = await getAllHeroes(Math.floor(Math.random() * 731 + 1));

        console.log('response', response)

        if (response) {
          heroes.push(response);
        }

        i += 1;
      }

      console.log('heroes', heroes)

      setTimeout(() => {
        this.setState({
          superHerosList: heroes,
        })

        this.setState({
          isFetching: false,
        });
      }, 3000);

    } catch(error) {
      console.log('error', error);
      console.log('error - response', error.response);
    }
  }

  fetchingGetHeroByName = async (heroName) => {
    try {
      this.setState({
        isFetching: true,
      });

      const response = await getHeroByName(heroName);

      if(response) {
        this.setState({
          isFetching: false,
          isSearch: true,
          searchValue: '',
          superHerosList: response.data.results,
        });

        // Enviando para o Redux
        this.props.searchHero(response.data.results);
      }

    } catch(error) {
      this.setState({
        isFetching: false,
      });
      console.log('error', error);
      console.log('error - response', error.response);
    }
  }

  handleValidateSearchValue = () => {
    const { searchValue } = this.state;

    if (!searchValue) {
      this.setState({
        searchValueError: 'Enter the name of a superhero.',
      });
    } else {
      this.setState({
        searchValueError: undefined,
      });

      this.fetchingGetHeroByName(searchValue);
    }
  }

  handleFavorites = () => {
    this.setState({
      isFavoritesList: !this.state.isFavoritesList,
    });
  }

  handleSearchValue = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  handleSelectedHero = (item) => {
    this.setState({
      heroSelected: item,
    });
  }

  renderHeroList = () => {
    const { isSearch, isFavoritesList, heroSelected, superHerosList} = this.state;
    const { listSearch, listFavorites} = this.props;

    if (isSearch && listSearch.length > 0) {
      return (
        listSearch.map(item => (
          <ContainerCard onClick={() => this.handleSelectedHero(item)}>
            <Card
              hero={item}
              selected={heroSelected}
            />
          </ContainerCard>
        ))
      )
    } else if (isFavoritesList && listFavorites.length > 0) {
      return (
        listFavorites.map(item => (
          <ContainerCard onClick={() => this.handleSelectedHero(item)}>
            <Card
              hero={item}
              selected={heroSelected}
            />
          </ContainerCard>
        ))
      )
    } else {
      return (
        superHerosList && superHerosList.length > 0 && superHerosList.map(item => (
          <ContainerCard onClick={() => this.handleSelectedHero(item)}>
            <Card
              hero={item}
              selected={heroSelected}
            />
          </ContainerCard>
        ))
      )
    }
  }

  render() {
    const { searchValue, searchValueError, isSearch, isFavoritesList, isFetching } = this.state;
    const { listFavorites, } = this.props;

    return (
      <Layout>
        <Container favsMob={listFavorites.length > 0}>
        {/* {console.log('superHerosList', this.state.superHerosList)} */}
          <Wrapper favsMob={listFavorites.length > 0}>
            {/* {isSearch && (
              <ShowButton
                searchAndFavs
                onClick={() => this.setState({ isSearch: false })}
              >
                Show All
              </ShowButton>
            )} */}
            {listFavorites.length > 0 && (
              <ShowButton
                favsMob={isFavoritesList && listFavorites.length > 0}
                onClick={this.handleFavorites}
              >
                {!isFavoritesList ? 'Show Favorites' : 'Show All'}
              </ShowButton>
            )}
            <ContainerTitle favs={listFavorites.length > 0}>
              <Title>Super Heroes</Title>
              <ContainerSearch>
                <Input 
                  label="Search for any superhero"
                  placeholder="Search for any superhero"
                  value={searchValue}
                  onChange={this.handleSearchValue}
                  inputWidth="100%"
                  inputPadding="1rem"
                  borderBottom="transparent"
                  heros={true}
                  search={true}
                  error={searchValueError}
                />
                <SearchIcon
                  src={searchIcon}
                  alt="search"
                  onClick={this.handleValidateSearchValue}
                />
              </ContainerSearch>
              {searchValueError && <ErrorMessage>{searchValueError}</ErrorMessage>}
            </ContainerTitle>
            {!isFetching ? (
              <ContainerList>
                {this.renderHeroList()}
              </ContainerList>
            ) : (
              <ContainerLoader>
                <Loader src={loaderIcon} alt="loading..." />
              </ContainerLoader>
            )}
          </Wrapper>
        </Container>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperHeroes);

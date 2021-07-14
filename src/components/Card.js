// Libs
import React, { useState } from 'react'
import styled from 'styled-components'

// Images
import CloseIcon from '../assets/x.svg'
import UnlikedIcon from '../assets/unliked.svg'
import LikedIcon from '../assets/liked.svg'

// Redux
import { useDispatch, useSelector } from 'react-redux'

//Styles
const Container = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 20rem;
  height: 23rem;
  border: 1px solid #842219;
  border-radius: 8px;

  &:hover {
    border-color: #842219;
    box-shadow: 5px 2px 10px 0px #5f0f08;
  }
`;

const LikeImage = styled.img`
  position: absolute;
  right: 0;
  margin: .5rem;
  width: 1.5rem;
  cursor: pointer;
`;

const HeroName = styled.p`
  margin: 1rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  word-break: break-all;
`;

const HeroFigureImage = styled.figure`
  height: 70%;
  max-height: 70%;
  display: flex;
  justify-content: center;

  @media(max-width: 648px) {
    height: 68%;
    max-height: 68%;
  }
`;

const ContainerUndefinedImg = styled.div`
  height: 65%;
  height: 60%;
  max-height: 60%;
  background-color: #842219;
`;

const HeroImage = styled.img`
  width: 65%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.3);
  z-index: 2;
`;

const ContainerChoiceDetails = styled.div`
  margin-top: .5rem;
  width: 100%;
  display: flex;
  justify-content: center;

  @media(max-width: 648px) {
    margin-bottom: 1rem;
  }
`;

const ChoiceDetailsItem = styled.span`
  margin: .2rem;
  padding: .5rem;
  color: #fff;
  background-color: #842219;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #842219;
  }
`;

const ContainerDetails = styled.div`
  position: relative;
  width: 30%;
  max-width: 30%;
  height: auto;
  background-color: #fff;
  border-radius: 10px;

  @media(max-width: 1024px) {
    width: 50%;
    max-width: 60%;
  }

  @media(max-width: 768px) {
    width: 60%;
    max-width: 60%;
  }

  @media(max-width: 648px) {
    width: 90%;
    max-width: 90%;
  }
`;

const DetailsTitle = styled.h2`
  margin: 1rem;
  text-align: center;
`;

const DetailsClose = styled.img`
  margin: .5rem;
  position: absolute;
  right: 0;
  width: 2rem;
  cursor: pointer;
`;

const ContainerDescription = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;

  @media(max-width: 648px) {
    padding: .5rem;
  }
`;

const DescriptionItem = styled.div`
  padding: 0 0.8rem 1.5rem;
  width: ${({ aliases }) => aliases ? '92%' : '30%'};
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media(max-width: 648px) {
    padding: 0 0.5rem 1.5rem;
    width: ${({ aliases }) => aliases ? '95%' : '32%'};
  }
`;

const DescriptionText = styled.p`
  margin-bottom: ${({ title }) => title && '.2rem'};
  color: ${({ title }) => title ? '#842219' : '#000'};
  font-size: ${({ title }) => title ? '1.2rem' : '.9rem'};
  font-weight: ${({ title }) => title ? '600' : '500'};

  @media(max-width: 648px) {
    font-size: ${({ title }) => title ? '1rem' : '.80rem'};
  }
`;

const ContainerAliasesTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Card({ hero }){
  const [handleAppearance, setHandleAppearance] = useState(false);
  const [handleBiography, setHandleBiography] = useState(false);
  const [handlePowerstats, setHandlePowerstats] = useState(false);
  const [isFavorite, setIsFavorite] = useState(undefined);

  const dispatch = useDispatch();
  const mapStateListFavorites = useSelector(state => state.heroes.listFavorites);

  const handleOpenPowerstats = () => {
    setHandlePowerstats(!handlePowerstats);
  }

  const handleOpenBiography = () => {
    setHandleBiography(!handleBiography);
  }

  const handleOpenAppearance = () => {
    setHandleAppearance(!handleAppearance);
  }

  const validateValue = value => {
    return (value !== 'null' && value) || '-';
  }

  const renderPowerstats = () => {
    const item = hero.powerstats || hero.data.powerstats;

    return (
      <Overlay>
        <ContainerDetails>
          <DetailsClose
            src={CloseIcon}
            alt='close'
            onClick={handleOpenPowerstats}
            data-testid="hero-details-powerstats-button"
          />
          <DetailsTitle>Powerstats</DetailsTitle>
          <ContainerDescription>
            <DescriptionItem>
              <DescriptionText title>Intelligence</DescriptionText>
              <DescriptionText>{validateValue(item.intelligence)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Strength</DescriptionText>
              <DescriptionText>{validateValue(item.strength)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Speed</DescriptionText>
              <DescriptionText>{validateValue(item.speed)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Durability</DescriptionText>
              <DescriptionText>{validateValue(item.durability)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Power</DescriptionText>
              <DescriptionText>{validateValue(item.power)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Combat</DescriptionText>
              <DescriptionText>{validateValue(item.combat)}</DescriptionText>
            </DescriptionItem>
          </ContainerDescription>
        </ContainerDetails>
      </Overlay>
    )
  }

  const renderBiography = () => {
    const item = hero.biography || hero.data.biography;

    return (
      <Overlay>
        <ContainerDetails>
          <DetailsClose
            src={CloseIcon}
            alt='close'
            onClick={handleOpenBiography}
            data-testid="hero-details-biography-button"
          />
          <DetailsTitle>Biography</DetailsTitle>
          <ContainerDescription>
            <DescriptionItem>
              <DescriptionText title>Full Name</DescriptionText>
              <DescriptionText>{validateValue(item['full-name'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Alter-Egos</DescriptionText>
              <DescriptionText>{validateValue(item['alter-egos'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Place of Birth</DescriptionText>
              <DescriptionText>{validateValue(item['place-of-birth'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>First Appearance</DescriptionText>
              <DescriptionText>{validateValue(item['first-appearance'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Publisher</DescriptionText>
              <DescriptionText>{validateValue(item['publisher'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Alignment</DescriptionText>
              <DescriptionText>{validateValue(item.alignment)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem aliases>
              <DescriptionText title>Aliases</DescriptionText>
              <ContainerAliasesTags>
                {item.aliases && item.aliases.map(item => (
                  <ChoiceDetailsItem>{item || null}</ChoiceDetailsItem>
                ))}
              </ContainerAliasesTags>
              
            </DescriptionItem>
          </ContainerDescription>
        </ContainerDetails>
      </Overlay>
    )
  }

  const renderAppearance = () => {
    const item = hero.appearance || hero.data.appearance;

    return (
      <Overlay>
        <ContainerDetails>
          <DetailsClose
            src={CloseIcon}
            alt='close'
            onClick={handleOpenAppearance}
            data-testid="hero-details-appearance-button"
          />
          <DetailsTitle>Appearance</DetailsTitle>
          <ContainerDescription>
            <DescriptionItem>
              <DescriptionText title>Gender</DescriptionText>
              <DescriptionText>{validateValue(item.gender)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Race</DescriptionText>
              <DescriptionText>{validateValue(item.race)}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Height</DescriptionText>
              <DescriptionText>{validateValue(item.height[0])}, {validateValue(item.height[1])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Weight</DescriptionText>
              <DescriptionText>{validateValue(item.weight[0])}, {validateValue(item.weight[1])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Eye Color</DescriptionText>
              <DescriptionText>{validateValue(item['eye-color'])}</DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionText title>Hair Color</DescriptionText>
              <DescriptionText>{validateValue(item['hair-color'])}</DescriptionText>
            </DescriptionItem>
          </ContainerDescription>
        </ContainerDetails>
      </Overlay>
    )
  }

  const handleUnFavorite = () => {
    setIsFavorite(false);
    dispatch({ type: 'superHeros/UNFAV/UNFAV_HERO', info: hero });
  }

  const handleFavorite = () => {
    setIsFavorite(true);
    dispatch({ type: 'superHeros/FAV/FAV_HERO', info: hero });
  }

  const heroImage = hero.image?.url || hero.data?.image.url;

  // Saber se o hero está na lista do Redux
  const heroIncludes = mapStateListFavorites.includes(hero);

  return (
    <Container>
      {!isFavorite && !heroIncludes ? (
        <LikeImage
          src={UnlikedIcon}
          alt="unlike"
          onClick={handleFavorite}
        />
      ) : (
        <LikeImage
          src={LikedIcon}
          alt="like"
          onClick={handleUnFavorite}
        />
      )}
      <HeroName>{hero.name || hero.data.name || 'without name'}</HeroName>
      <HeroFigureImage>
      {(hero.image?.url || hero.data?.image?.url) === undefined ? (
        <ContainerUndefinedImg />
      ): (
        <HeroImage
          src={heroImage}
          alt={hero.name || hero.data.name || '-'}
        />
      )}
      </HeroFigureImage>
      <ContainerChoiceDetails>
        <ChoiceDetailsItem
          onClick={handleOpenAppearance}
          data-testid="hero-details-appearance"
        >
          Appearance
        </ChoiceDetailsItem>
        <ChoiceDetailsItem
          onClick={handleOpenBiography}
          data-testid="hero-details-biography"
        >
          Biography
        </ChoiceDetailsItem>
        <ChoiceDetailsItem
          onClick={handleOpenPowerstats}
          data-testid="hero-details-powerstats"
        >
          Powerstats
        </ChoiceDetailsItem>
      </ContainerChoiceDetails>
      {handleAppearance && renderAppearance()}
      {handleBiography && renderBiography()}
      {handlePowerstats && renderPowerstats()}
    </Container>
  )
}

export default Card;

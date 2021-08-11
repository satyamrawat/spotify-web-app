import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getTopArtistsLong, catchErrors } from './Spotify';
import styled from 'styled-components/macro';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100vh;
  padding: 80px 150px;
  `;

const Heading = styled.header`
  h2 {
    display: inline-block;
    margin: 0;
  }
`;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  margin-top: 50px;
`;
const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 80px;
  
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
`;
const ArtistName = styled.a`
  margin: 10px 0 30px 0;
  border-bottom: 1px solid transparent;
  color: #FFFFFF;
  font-size : 18px;
  text-decoration : none;
  &:hover,
  &:focus {
    border-bottom: 1px solid #FFFFFF;
  }
`;



export const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const { data } = await getTopArtistsLong();
          setTopArtists(data);
        };
        catchErrors(fetchData());
      }, []);

    return (
        <Main>
            <Heading>
                <h2>Top Artists</h2>
            </Heading>
            <ArtistsContainer>
        {topArtists ? (
          topArtists.items.map(({ id, external_urls, images, name }, i) => (
            <Artist key={i}>
              <ArtistArtwork to={`/artist/${id}`}>
                {images.length && <img style={{width:"80px", height:"80px"}} src={images[1].url} alt="Artist" />}
            
              </ArtistArtwork>
              <ArtistName href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {name}
              </ArtistName>
            </Artist>
          ))
        ) : (
          <div></div>
        )}
      </ArtistsContainer>

        </Main>
        
    )
}
export default TopArtists;
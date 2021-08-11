import React, { useState, useEffect } from 'react'
import { getUserInfo,getUser, getFollowing,getTopArtistsLong,getRecentlyPlayed,catchErrors } from './Spotify';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';


// console.log(getUser());
// console.log(getTopArtistsLong())

const Head = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
margin: 50px 0 0; 
height: 100px;
width: 150px;
img {
  border-radius: 100%;
}
`;

const UserName = styled.a`
  font-size: 32px;
  font-family: Circular Std, system, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #FFFFFF ;
  font-weight: 700;
  text-decoration: none;
  margin: 60px 0 0;
  &:hover,
  &:focus {
    color: #1ed760;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 20px;
`;
const Info = styled.div`
  text-align: center;
`;

const Number = styled.div`
  color: #1DB954;
  font-weight: 700;
  font-size: 20px;
`;
const NumLabel = styled.p`
  color: #9B9B9B;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 5px;
`;

const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 70px;
  width: 400px;
  margin-top: 100px;
  font-size : 18px;
  
`;

const Heading = styled.div`
margin-bottom: 40px;
  h2 {
    display: inline-block;
    margin: 0;
  }
`;
const Artist = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArtistImage = styled(Link)`
display: inline-block;
position: relative;
width: 50px;
min-width: 50px;
margin-right: 20px;
img {
  width: 50px;
  min-width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 100%;
}
`;

const ArtistName = styled(Link)`
flex-grow: 1;
color : #FFFFFF;
font-size: 16px;
text-decoration: none;
span {
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid #FFFFFF;
  }
}
`;




export const User = () => {
    const [user, setUser] = useState(null);
    const [followedArtists, setFollowedArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
          setUser(user);
          setFollowedArtists(followedArtists);
          setPlaylists(playlists);
          setTopArtists(topArtists);
          setTopTracks(topTracks);
        };
        catchErrors(fetchData());
      }, []);
    const totalPlaylists = playlists ? playlists.total : 0;
    
    return (
      <React.Fragment>
        {user ? (           
          <Head>
            <Image>
              {user.images.length > 0 ? (
                <img style={{width:"150px", height:"150px"}} src={user.images[0].url} alt= "image" />
              ) : (
                <div></div>
              )}
            </Image>
            <UserName href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              {user.display_name}
            </UserName>
            
            <Details>
              <Info>
                <Number>{totalPlaylists}</Number>
                <NumLabel>Playlists</NumLabel>
              </Info>
              <Info>
                <Number>{user.followers.total}</Number>
                <NumLabel>Followers</NumLabel>
              </Info>
              {followedArtists && (
                <Info>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Info>
              )}
              
            </Details>

            <Preview>
              <Heading>
                <h2>Followed Artists</h2>
                {followedArtists? (
                  <ul>
                    {followedArtists.artists.items.slice(0, 10).map((artist, i) => (
                    <Artist key = {i}>
                      <ArtistImage>
                        {artist.images.length && <img src={artist.images[2].url} alt="Artist" />}
                      </ArtistImage>
                      <ArtistName to="/artist">
                        <span>{artist.name}</span>
                      </ArtistName>
                      
                    </Artist>                
                      ))}
                  </ul>
                ):(<div/>)}


              </Heading>
              
              
            </Preview>
              
          
          </Head>
                 
          

      ) : (
        <div></div>
      )}
              
      </React.Fragment>        
    );
};
export default User;

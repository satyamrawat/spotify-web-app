import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import TrackItem from './TrackItem';
import { getTopTracksLong, catchErrors } from './Spotify';
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
const TracksContainer = styled.ul`
  margin-top: 50px;
`;

export const TopTracks = () => {

    const [topTracks, setTopTracks] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const { data } = await getTopTracksLong();
          setTopTracks(data);
        };
        catchErrors(fetchData());
      }, []);

    return (
        <Main>
            <Heading>
                TopTracks
            </Heading>
            <TracksContainer>
        {topTracks ? (
          topTracks.items.map((track, i) => <TrackItem track={track} key={i} />)
        ) : (
          <div></div>
        )}
      </TracksContainer>
        </Main>
    )
}
export default TopTracks;

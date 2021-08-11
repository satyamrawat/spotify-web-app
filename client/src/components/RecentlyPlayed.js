import React, { useState, useEffect } from 'react'
import { getRecentlyPlayed ,catchErrors} from './Spotify';
import TrackItem from './TrackItem';
import styled from 'styled-components/macro';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100vh;
  padding: 80px 150px;
  `;

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

export const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    catchErrors(fetchData());
  }, []);
    return (
        <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
        ) : (
          <div></div>
        )}
      </TracksContainer>
    </Main>
    )
}
export default RecentlyPlayed;
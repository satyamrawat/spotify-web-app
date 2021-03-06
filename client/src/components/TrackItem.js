import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const TrackLeft = styled.span`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding-right: 1px;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: 20px;
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;
const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 30px;
  text-decoration : none;
  
`;
const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
  text-decoration : none;
`;
const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  color: #FFFFFF;
  font-size : 16px;
  text-decoration : none;
  &:hover,
  &:focus {
    border-bottom: 1px solid #FFFFFF;
  }
`;
const TrackAlbum = styled.div`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding-right: 1px;
text-decoration : none;
  color: #b3b3b3};
  font-size: 12px;
  margin-top: 3px;
`;
const TrackDuration = styled.span`
  color: #b3b3b3;
  font-size: 14px;
`;
const formatDuration = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

 export const TrackItem = ({ track }) => (
    <li style= {{listStyleType: "none"}}>
      <TrackContainer to={`/track/${track.id}`}>
        <div>
          <TrackArtwork>
            {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
            
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            {track.name && <TrackName>{track.name}</TrackName>}
            {track.artists && track.album && (
              <TrackAlbum>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
              </TrackAlbum>
            )}
          </TrackLeft>
          <TrackRight>
            {track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}
          </TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  );

// TrackItem.propTypes = {
//     track: PropTypes.object.isRequired,
//   };
export default TrackItem;
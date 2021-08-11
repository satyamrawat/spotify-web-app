import React, { useState, useEffect } from 'react';
import { getTrack, getTrackInfo,catchErrors } from './Spotify';
import styled from 'styled-components/macro';


const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100vh;
  padding: 80px 150px;
  `;
const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
`;
const Artwork = styled.div`
  max-width: 250px;
  margin-right: 40px;
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 250px;
    height: 250px;
  }
  
`;
const Info = styled.div`
  flex-grow: 1;
  
`;
const PlayTrackButton = styled.a`
display: inline-block;
background-color: #1DB954;
color: #FFFFFF;
font-weight: 700;
font-size: 12px;
letter-spacing: 1px;
text-transform: uppercase;
text-decoration : none;
border-radius: 50px;
padding: 11px 24px;
margin: 20px 0;
cursor: pointer;
transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
&:hover,
&:focus {
  background-color: #1ed760;
  outline: 0;
}
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;
  
`;
const ArtistName = styled.h2`
  color: #9B9B9B;
  font-weight: 700;
  font-size: 20px;
  text-align: left !important;
  
`;
const Album = styled.h3`
  
  font-weight: 400;
  text-decoration : none;
  font-size: 16px;
  color: #9B9B9B ;
`;
const AudioFeatures = styled.div`
display: flex;
justify-content: center;
align-items: center;
  flex-direction: column;
`;
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  
`;
const Feature = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid #404040;
  border-right: 1px solid #404040;
`;
const FeatureText = styled.h4`
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0;

`;
const FeatureLabel = styled.p`
  color: #FFFFFF;
  font-size: 12px;
  margin-bottom: 0;
`;

export const formatDuration = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

export const getYear = date => date.split('-')[0];

// console.log(getTrack())

export const Track = (props) => {

const trackId = props.match.params.trackId;
console.log(trackId);

  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    catchErrors(fetchData());
  }, [trackId]);
    // console.log(track);
    return (
        <React.Fragment>
      {track ? (
        <Main>
          <TrackContainer>
            <Artwork>
              <img src={track.album.images[0].url} alt="Album Artwork" />
            </Artwork>
            <Info>
              <Title>{track.name}</Title>
              <ArtistName>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                      &nbsp;
                    </span>
                  ))}
              </ArtistName>
              <Album>
                <a style = {{color : "#9B9B9B", textDecoration: "none"}}
                  href={track.album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer">
                  {track.album.name}
                </a>{' '}
                &middot; {getYear(track.album.release_date)}
              </Album>
              <PlayTrackButton
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer">
                Play on Spotify
              </PlayTrackButton>
            </Info>
          </TrackContainer>

          {audioFeatures && audioAnalysis && (
            <AudioFeatures>
              <Features>
                <Feature>
                  <FeatureText>{formatDuration(audioFeatures.duration_ms)}</FeatureText>
                  <FeatureLabel>Duration</FeatureLabel>
                </Feature>
                {/* <Feature>
                  <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
                  <FeatureLabel>Key</FeatureLabel>
                </Feature> */}
                <Feature>
                  <FeatureText>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</FeatureText>
                  <FeatureLabel>Modality</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioFeatures.time_signature}</FeatureText>
                  <FeatureLabel>Time Signature</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
                  <FeatureLabel>Tempo (BPM)</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{track.popularity}%</FeatureText>
                  <FeatureLabel>Popularity</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.bars.length}</FeatureText>
                  <FeatureLabel>Bars</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                  <FeatureLabel>Beats</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.sections.length}</FeatureText>
                  <FeatureLabel>Sections</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.segments.length}</FeatureText>
                  <FeatureLabel>Segments</FeatureLabel>
                </Feature>
              </Features>

              
            </AudioFeatures>
          )}
        </Main>
      ) : (
        <div></div>
      )}
    </React.Fragment>
    )
}

export default Track;
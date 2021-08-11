import axios from 'axios';

export const catchErrors = fn =>
  function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };


function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (( e = r.exec(q))) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}
var params = getHashParams();

export const token = params.access_token;

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

export const getUser = async () => {
    var user = await axios.get('https://api.spotify.com/v1/me', { headers });
    return user;
}

export const getFollowing = () =>{
    var following = axios.get('https://api.spotify.com/v1/me/following?type=artist', {headers});    
    return following;
}

export const getPlaylists = async() =>{
    var playlists = await axios.get('https://api.spotify.com/v1/me/playlists', { headers });
    return playlists;
}

export const getRecentlyPlayed = async() =>{
    var recentlyPlayed = await axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });
    return recentlyPlayed;
  }


export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = async() =>{
  var topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });
  return topArtists;
}


export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });

export const getTopTracksLong = async() =>{
  var topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });
  return topTracks;
}
export const getArtist = artistId =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

export const followArtist = artistId => {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
    return axios({ method: 'put', url, headers });
};

export const doesUserFollowArtist = artistId =>
  axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
    headers,
  });

export const doesUserFollowPlaylist = (playlistId, userId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`, {
    headers,
  });

export const addTracksToPlaylist = (playlistId, uris) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
    return axios({ method: 'post', url, headers });
  };

export const followPlaylist = playlistId => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    return axios({ method: 'put', url, headers });
  };

export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });


export const getPlaylistTracks = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });


const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

export const getAudioFeaturesForTracks = tracks => {
    const ids = getTrackIds(tracks);
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
  };

  export const getRecommendationsForTracks = tracks => {
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
    const seed_artists = '';
    const seed_genres = '';
  
    return axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
      {
        headers,
      },
    );
  };
  

export const getTrack = async(trackId) =>{
  var track = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
  return track;
}
export const getTrackAudioAnalysis = async(trackId) =>{
  var trackAudioAnalysis = await axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });
  return trackAudioAnalysis;
}

export const getTrackAudioFeatures = async(trackId) =>{
 var trackAudioFeatures= await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });
  return trackAudioFeatures;
}


export const getUserInfo = async() =>{
    var userinfo = await axios
    .all([getUser(), getFollowing(), getPlaylists(), getTopArtistsLong(), getTopTracksLong()])
    .then(
      axios.spread((user, followedArtists, playlists, topArtists, topTracks) => ({
        user: user.data,
        followedArtists: followedArtists.data,
        playlists: playlists.data,
        topArtists: topArtists.data,
        topTracks: topTracks.data,
      })),
    );
    return userinfo;
}
  


export const getTrackInfo = async(trackId) =>{
    var trackInfo = await axios
      .all([getTrack(trackId), getTrackAudioAnalysis(trackId), getTrackAudioFeatures(trackId)])
      .then(
        axios.spread((track, audioAnalysis, audioFeatures) => ({
          track: track.data,
          audioAnalysis: audioAnalysis.data,
          audioFeatures: audioFeatures.data,
        })),
      );
      return trackInfo;
    }

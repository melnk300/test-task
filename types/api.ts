interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface IEpisodeResults {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IEpisode {
  info: IInfo;
  results: IEpisodeResults[];
}

interface IOrigin {
  name: string;
  url: string;
}

interface ILocation {
  name: string;
  url: string;
}

export interface ICharacterResults {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
  episodesNames: {
    id: number;
    name: string;
    episode: string;
  }[];
}

export interface ICharacter {
  info: IInfo;
  results: ICharacterResults[];
}

export type entity = 'episode' | 'character';
export type status = 'alive' | 'dead' | 'unknown';
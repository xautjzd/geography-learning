export interface ImpactSection {
  title: string;
  content: string;
}

export interface KeyLandmark {
  name: string;
  detail?: string;
}

export interface CountryData {
  slug: string;
  name: string;
  nameEn: string;
  capital: string;
  region: string;
  subRegion?: string;
  coordinates: [number, number]; // [longitude, latitude]
  coverImage: string;
  summary: string;
  geography: string;
  impactChain: {
    terrain: ImpactSection;
    climate: ImpactSection;
    history: ImpactSection;
    economy: ImpactSection;
    population: ImpactSection;
  };
  keyFacts: {
    area: string;
    population: string;
    gdp: string;
    terrain: string;
    climate: string;
  };
  keyLandmarks?: {
    mountains?: KeyLandmark[];
    rivers?: KeyLandmark[];
    lakes?: KeyLandmark[];
    plains?: KeyLandmark[];
    deserts?: KeyLandmark[];
  };
  naturalResources?: {
    energy?: string[];
    minerals?: string[];
    biological?: string[];
    water?: string;
  };
  geopolitics?: {
    neighbors: string[];
    seaNeighbors?: string[];
    strategicPosition: string;
    borderDisputes?: string;
  };
  relatedTopics: string[];
  hasContent: boolean;
}

export interface TopicData {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  summary: string;
  period?: string;
  geographicScope: string;
  content: string;
  affectedCountries: string[];
  geographicFactors: string[];
  keyEvents?: Array<{
    year: string;
    event: string;
  }>;
}

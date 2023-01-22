export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
  Upload: any;
};

export type Ability = {
  __typename?: "Ability";
  ability?: Maybe<BaseName>;
  is_hidden?: Maybe<Scalars["Boolean"]>;
  slot?: Maybe<Scalars["Int"]>;
};

export type BaseList = {
  __typename?: "BaseList";
  count?: Maybe<Scalars["Int"]>;
  message?: Maybe<Scalars["String"]>;
  next?: Maybe<Scalars["String"]>;
  previous?: Maybe<Scalars["String"]>;
  results?: Maybe<Array<Maybe<BaseName>>>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type BaseName = {
  __typename?: "BaseName";
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type BaseResponse = {
  __typename?: "BaseResponse";
  message?: Maybe<Scalars["String"]>;
  params?: Maybe<Scalars["JSON"]>;
  response?: Maybe<Scalars["JSON"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type GameIndex = {
  __typename?: "GameIndex";
  game_index?: Maybe<Scalars["Int"]>;
  version?: Maybe<BaseName>;
};

export type HeldItem = {
  __typename?: "HeldItem";
  item?: Maybe<BaseName>;
  version_details?: Maybe<Array<Maybe<VersionDetail>>>;
};

export type Move = {
  __typename?: "Move";
  move?: Maybe<BaseName>;
  version_group_details?: Maybe<Array<Maybe<VersionGroupDetail>>>;
};

export type Pokemon = {
  __typename?: "Pokemon";
  abilities?: Maybe<Array<Maybe<Ability>>>;
  base_experience?: Maybe<Scalars["Int"]>;
  forms?: Maybe<Array<Maybe<BaseName>>>;
  game_indices?: Maybe<Array<Maybe<GameIndex>>>;
  height?: Maybe<Scalars["Int"]>;
  held_items?: Maybe<Array<Maybe<HeldItem>>>;
  id?: Maybe<Scalars["Int"]>;
  is_default?: Maybe<Scalars["Boolean"]>;
  location_area_encounters?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  moves?: Maybe<Array<Maybe<Move>>>;
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  species?: Maybe<BaseName>;
  sprites?: Maybe<Sprite>;
  stats?: Maybe<Array<Maybe<Stat>>>;
  status?: Maybe<Scalars["Boolean"]>;
  types?: Maybe<Array<Maybe<Type>>>;
  weight?: Maybe<Scalars["Int"]>;
};

export type PokemonItem = {
  __typename?: "PokemonItem";
  artwork?: Maybe<Scalars["String"]>;
  dreamworld?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type PokemonList = {
  __typename?: "PokemonList";
  count?: Maybe<Scalars["Int"]>;
  message?: Maybe<Scalars["String"]>;
  next?: Maybe<Scalars["String"]>;
  nextOffset?: Maybe<Scalars["Int"]>;
  params?: Maybe<Scalars["JSON"]>;
  prevOffset?: Maybe<Scalars["Int"]>;
  previous?: Maybe<Scalars["String"]>;
  results?: Maybe<Array<Maybe<PokemonItem>>>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  abilities?: Maybe<BaseList>;
  ability?: Maybe<BaseResponse>;
  berries?: Maybe<BaseList>;
  berry?: Maybe<BaseResponse>;
  eggGroup?: Maybe<BaseResponse>;
  eggGroups?: Maybe<BaseList>;
  encounterMethod?: Maybe<BaseResponse>;
  encounterMethods?: Maybe<BaseList>;
  evolutionChain?: Maybe<BaseResponse>;
  evolutionChains?: Maybe<BaseList>;
  evolutionTrigger?: Maybe<BaseResponse>;
  evolutionTriggers?: Maybe<BaseList>;
  gender?: Maybe<BaseResponse>;
  genders?: Maybe<BaseList>;
  growthRate?: Maybe<BaseResponse>;
  growthRates?: Maybe<BaseList>;
  location?: Maybe<BaseResponse>;
  locations?: Maybe<BaseList>;
  move?: Maybe<BaseResponse>;
  moves?: Maybe<BaseList>;
  nature?: Maybe<BaseResponse>;
  natures?: Maybe<BaseList>;
  pokemon?: Maybe<Pokemon>;
  pokemons?: Maybe<PokemonList>;
  region?: Maybe<BaseResponse>;
  regions?: Maybe<BaseList>;
  species?: Maybe<BaseList>;
  types?: Maybe<BaseList>;
};

export type QueryAbilityArgs = {
  ability: Scalars["String"];
};

export type QueryBerryArgs = {
  berry: Scalars["String"];
};

export type QueryEggGroupArgs = {
  eggGroup: Scalars["String"];
};

export type QueryEncounterMethodArgs = {
  encounterMethod: Scalars["String"];
};

export type QueryEvolutionChainArgs = {
  id: Scalars["String"];
};

export type QueryEvolutionTriggerArgs = {
  name: Scalars["String"];
};

export type QueryGenderArgs = {
  gender: Scalars["String"];
};

export type QueryGrowthRateArgs = {
  growthRate: Scalars["String"];
};

export type QueryLocationArgs = {
  location: Scalars["String"];
};

export type QueryMoveArgs = {
  move: Scalars["String"];
};

export type QueryNatureArgs = {
  nature: Scalars["String"];
};

export type QueryPokemonArgs = {
  name: Scalars["String"];
};

export type QueryPokemonsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type QueryRegionArgs = {
  region: Scalars["String"];
};

export type Sprite = {
  __typename?: "Sprite";
  back_default?: Maybe<Scalars["String"]>;
  back_female?: Maybe<Scalars["String"]>;
  back_shiny?: Maybe<Scalars["String"]>;
  back_shiny_female?: Maybe<Scalars["String"]>;
  front_default?: Maybe<Scalars["String"]>;
  front_female?: Maybe<Scalars["String"]>;
  front_shiny?: Maybe<Scalars["String"]>;
  front_shiny_female?: Maybe<Scalars["String"]>;
};

export type Stat = {
  __typename?: "Stat";
  base_stat?: Maybe<Scalars["Int"]>;
  effort?: Maybe<Scalars["Int"]>;
  stat?: Maybe<BaseName>;
};

export type Type = {
  __typename?: "Type";
  slot?: Maybe<Scalars["Int"]>;
  type?: Maybe<BaseName>;
};

export type VersionDetail = {
  __typename?: "VersionDetail";
  rarity?: Maybe<Scalars["Int"]>;
  version?: Maybe<BaseName>;
};

export type VersionGroupDetail = {
  __typename?: "VersionGroupDetail";
  level_learned_at?: Maybe<Scalars["Int"]>;
  move_learn_method?: Maybe<BaseName>;
  version_group?: Maybe<BaseName>;
};

export type ClientSDK = {
  Query: {
    abilities: { resolve: Query["abilities"] };
    ability: { args: QueryAbilityArgs; resolve: Query["ability"] };
    berries: { resolve: Query["berries"] };
    berry: { args: QueryBerryArgs; resolve: Query["berry"] };
    eggGroup: { args: QueryEggGroupArgs; resolve: Query["eggGroup"] };
    eggGroups: { resolve: Query["eggGroups"] };
    encounterMethod: {
      args: QueryEncounterMethodArgs;
      resolve: Query["encounterMethod"];
    };
    encounterMethods: { resolve: Query["encounterMethods"] };
    evolutionChain: {
      args: QueryEvolutionChainArgs;
      resolve: Query["evolutionChain"];
    };
    evolutionChains: { resolve: Query["evolutionChains"] };
    evolutionTrigger: {
      args: QueryEvolutionTriggerArgs;
      resolve: Query["evolutionTrigger"];
    };
    evolutionTriggers: { resolve: Query["evolutionTriggers"] };
    gender: { args: QueryGenderArgs; resolve: Query["gender"] };
    genders: { resolve: Query["genders"] };
    growthRate: { args: QueryGrowthRateArgs; resolve: Query["growthRate"] };
    growthRates: { resolve: Query["growthRates"] };
    location: { args: QueryLocationArgs; resolve: Query["location"] };
    locations: { resolve: Query["locations"] };
    move: { args: QueryMoveArgs; resolve: Query["move"] };
    moves: { resolve: Query["moves"] };
    nature: { args: QueryNatureArgs; resolve: Query["nature"] };
    natures: { resolve: Query["natures"] };
    pokemon: { args: QueryPokemonArgs; resolve: Query["pokemon"] };
    pokemons: { args: QueryPokemonsArgs; resolve: Query["pokemons"] };
    region: { args: QueryRegionArgs; resolve: Query["region"] };
    regions: { resolve: Query["regions"] };
    species: { resolve: Query["species"] };
    types: { resolve: Query["types"] };
  };
  Mutation: {};
};

export const clientSdkArgMap = {
  abilities: {},
  ability: {
    ability: "String!",
  },
  berries: {},
  berry: {
    berry: "String!",
  },
  eggGroup: {
    eggGroup: "String!",
  },
  eggGroups: {},
  encounterMethod: {
    encounterMethod: "String!",
  },
  encounterMethods: {},
  evolutionChain: {
    id: "String!",
  },
  evolutionChains: {},
  evolutionTrigger: {
    name: "String!",
  },
  evolutionTriggers: {},
  gender: {
    gender: "String!",
  },
  genders: {},
  growthRate: {
    growthRate: "String!",
  },
  growthRates: {},
  location: {
    location: "String!",
  },
  locations: {},
  move: {
    move: "String!",
  },
  moves: {},
  nature: {
    nature: "String!",
  },
  natures: {},
  pokemon: {
    name: "String!",
  },
  pokemons: {
    limit: "Int",
    offset: "Int",
  },
  region: {
    region: "String!",
  },
  regions: {},
  species: {},
  types: {},
};

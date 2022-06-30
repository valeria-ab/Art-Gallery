import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL: 'https://internship-front.framework.team/',
});

// types

export type ImageType = {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
};
export type MainPaintingType = {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: ImageType;
  artist?: string;
};
 type GenreResponseType = {
  _id: string;
  name: string;
};
export type ArtistResponseType = {
  genres: Array<GenreResponseType>;
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: MainPaintingType;
  avatar: ImageType;
};

type UpdateMainPaintingResponseType = {
  size: number;
  buffer: {};
  encoding: string;
  mimetype: string;
  fieldname: string;
  originalname: string;
};

export type AuthorPaintingsType = {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: ImageType;
};

type SpecifiedPaintingByIdType = {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: ImageType;
};

type CreateArtistRequestType = {
  genres: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: MainPaintingType;
  avatar: ImageType;
};
type UpdateArtistRequestType = {
  id: string;
  genres: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: string;
};

type AddPaintingToArtistRequestType = {
  name: string;
  yearOfCreation: string;
  image: ImageType;
};
type UpdatePaintingResponseType = {
  _id: string;
  name: string;
  earOfCreation: string;
  mage: ImageType;
};

// types for authApi

type RegisterDataType = {
 username: string;
  password: string;
  fingerprint: string;
}
type RegisterResponseType = {
  accessToken: string;
  refreshToken: string;
}
type RefreshRequestType = {
  fingerprint: string;
  refreshToken: string;
}
export const authAPI = {
  register(payload: RegisterDataType) {
    return instance.post<
        { payload: RegisterDataType },
        AxiosResponse<RegisterResponseType>
        >('auth/register', payload);
  },
  login(username: string, password: string) {
    return instance.post<
        { username: string, password: string},
        AxiosResponse<RegisterResponseType, any>
        >('auth/login', { username, password });
  },
  refresh(payload: RefreshRequestType) {
    return instance.post<
        { payload: RefreshRequestType },
        AxiosResponse<RegisterResponseType, any>
        >('auth/refresh', payload);
  },
};

export const artistsAPI = {
  // requests for not authorised user
  getArtistsStatic() {
    return instance.get<Array<ArtistResponseType>>('artists/static');
  },
  getArtistStatic(id: string) {
    return instance.get<ArtistResponseType>(`artists/static/${id}`);
  },
  getProfilePicture(src: string) {
    return instance.get<any>(`${src}`);
  },

  // requests for authorized user
  getArtists() {
    return instance.get<Array<ArtistResponseType>>('artists');
  },
  getArtist(id: string) {
    return instance.get<ArtistResponseType>(`artists/${id}`);
  },
  getPaintingsByAuthorId(authorId: string) {
    return instance.get<Array<AuthorPaintingsType>>(
      `artists/${authorId}/paintings`,
    );
  },
  getSpecifiedPaintingById(paintingId: string, authorId: string) {
    return instance.get<SpecifiedPaintingByIdType>(
      `artists/${authorId}/paintings/${paintingId}`,
    );
  },

  createArtist(payload: CreateArtistRequestType) {
    return instance.post<
      { payload: CreateArtistRequestType },
      AxiosResponse<ArtistResponseType, any>
    >('artists', { payload });
  },
  updateArtist(id: string, payload: UpdateArtistRequestType) {
    return instance.put<
      { payload: UpdateArtistRequestType },
        AxiosResponse<ArtistResponseType>
    >(`artists${id}`, { payload });
  },
  deleteArtist(id: string) {
    return instance.delete<AxiosResponse<{ _id: string }>>(`artists${id}`);
  },
  updateMainPainting(id: string) {
    return instance.patch<AxiosResponse<UpdateMainPaintingResponseType>>(
      `artists/${id}/main-painting`,
    );
  },
  addPaintingToArtist(id: number, payload: AddPaintingToArtistRequestType) {
    return instance.post<
      { payload: AddPaintingToArtistRequestType },
        AxiosResponse<MainPaintingType>
    >(`artists/${id}/paintings`, { payload });
  },
  updatePainting(
    id: string,
    paintingId: string,
    payload: AddPaintingToArtistRequestType,
  ) {
    return instance.put<
      { payload: AddPaintingToArtistRequestType },
        AxiosResponse<UpdatePaintingResponseType>
    >(`artists/${id}/paintings/${paintingId}`, { payload });
  },
  deletePainting(id: string, paintingId: string) {
    return instance.delete<AxiosResponse<{ _id: string }>>(
      `artists/${id}/paintings/${paintingId}`,
    );
  },
};

export const genresAPI = {
  // requests for not authorised user
  getGenresStatic() {
    return instance.get<AxiosResponse<Array<GenreResponseType>>>(
      'genres/static',
    );
  },

  // requests for authorized user
  getGenres() {
    return instance.get<AxiosResponse<Array<GenreResponseType>>>('genres');
  },
  getSpecifiedGenreById(id: string) {
    return instance.get<AxiosResponse<GenreResponseType>>(`genres/${id}`);
  },
  createGenre(name: string) {
    return instance.post<{ name: string }, AxiosResponse<GenreResponseType>>(
      'genres',
      { name },
    );
  },
  updateGenre(id: string, name: string) {
    return instance.put<{ name: string }, AxiosResponse<GenreResponseType>>(
      `genres/${id}`,
      { name },
    );
  },
  deleteGenre(id: string) {
    return instance.delete<AxiosResponse<{ _id: string }>>(`genres/${id}`);
  },
};

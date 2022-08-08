import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import Cookies from 'js-cookie';
// @ts-ignore
import { ClientJS } from 'clientjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, IAppStore } from '../store/store';
import { refreshTC } from '../store/auth-reducer';

export const BASE_URL = 'https://internship-front.framework.team/';

export const instance = axios.create({
  baseURL: 'https://internship-front.framework.team',
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${Cookies.get('accessToken')}`,
  },
  withCredentials: true,
});
const client = new ClientJS();
const fingerprint = client.getFingerprint().toString();

// privateInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.data.statusCode === 401 || error.response.data.message ===
//     'Unauthorized') {
//       const refreshToken = Cookies.get('refreshToken');
//       if (refreshToken) {
//         authAPI.refresh({ refreshToken, fingerprint })
//           .then((res) => {
//             Cookies.set('accessToken', res.data.accessToken, { path: 'http://localhost:3000' });
//             Cookies.set('refreshToken', res.data.refreshToken, { path: 'http://localhost:3000' });
//           });
//       }
//     }
//     return Promise.reject(error);
//   },
// );

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
export type GenreResponseType = {
    _id: string;
    name: string;
};
export type AuthorPaintingsType = {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: ImageType;
};
export type ArtistResponseType = {
    genres: Array<GenreResponseType>;
    _id: string;
    name: string;
    description: string;
    yearsOfLife: string;
    mainPainting: MainPaintingType;
    avatar: ImageType;
    paintings: Array<AuthorPaintingsType>
};

type UpdateMainPaintingResponseType = {
    size: number;
    buffer: {};
    encoding: string;
    mimetype: string;
    fieldname: string;
    originalname: string;
};

type SpecifiedPaintingByIdType = {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: ImageType;
};

export type CreateArtistRequestType = {
    genres: string;
    name: string;
    description: string;
    yearsOfLife: string;
    // mainPainting: MainPaintingType;
    avatar?: ImageType;
};
type UpdateArtistRequestType = {
    id: string;
    genres: string;
    name: string;
    description: string;
    yearsOfLife: string;
    mainPainting: string;
};

export type AddPaintingToArtistRequestType = {
    name: string;
    yearOfCreation: string;
    image?: Blob;

    // "image": {
    //   "size": 0,
    //   "buffer": {},
    //   "encoding": "string",
    //   "mimetype": "string",
    //   "fieldname": "string",
    //   "originalname": "string"
    // }
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
    return privateInstance.post<{ payload: RegisterDataType },
            AxiosResponse<RegisterResponseType>>('auth/register', payload);
  },
  login(username: string, password: string) {
    return instance.post<{ username: string, password: string, fingerprint: string },
            AxiosResponse<RegisterResponseType, any>>('auth/login', { username, password, fingerprint });
  },
  refresh(payload: RefreshRequestType) {
    return privateInstance.post<{ payload: RefreshRequestType },
            AxiosResponse<RegisterResponseType, any>>('auth/refresh', payload);
  },
};

export const artistsAPI = {
  // requests for not authorised user
  getArtistsStatic() {
    return instance.get<Array<ArtistResponseType>>('artists/static');
    // return instance.get('artists/static');
  },
  getArtistStatic(id: string) {
    return instance.get<ArtistResponseType>(`artists/static/${id}`);
  },
  getProfilePicture(src: string) {
    return instance.get<any>(`${src}`);
  },

  // requests for authorized user
  getArtists(payload?: {data:URLSearchParams}) {
    return instance.get<AxiosResponse<Array<ArtistResponseType>>>(payload ? `artists?${payload.data}` : 'artists');
  },
  getArtist(id: string) {
    return privateInstance.get<ArtistResponseType>(`artists/${id}`);
  },
  getPaintingsByAuthorId(authorId: string) {
    return privateInstance.get<Array<AuthorPaintingsType>>(
      `artists/${authorId}/paintings`,
    );
  },
  getSpecifiedPaintingById(paintingId: string, authorId: string) {
    return privateInstance.get<SpecifiedPaintingByIdType>(
      `artists/${authorId}/paintings/${paintingId}`,
    );
  },

  createArtist(payload: any) {
    return privateInstance.post<
            AxiosResponse<ArtistResponseType, any>>('artists', payload, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
  },
  updateArtist(id: string, payload: UpdateArtistRequestType) {
    return privateInstance.put<{ payload: UpdateArtistRequestType },
            AxiosResponse<ArtistResponseType>>(`artists${id}`, { payload });
  },
  deleteArtist(id: string) {
    return privateInstance.delete<AxiosResponse<{ _id: string }>>(`artists/${id}`);
  },
  updateMainPainting(paintingId: string, authorId: string) {
    return privateInstance.patch<AxiosResponse<UpdateMainPaintingResponseType>>(
      `artists/${authorId}/main-painting`,
      { mainPainting: paintingId },
    );
  },
  addPaintingToArtist(id: string, payload: any) {
    return privateInstance.post<{ payload: AddPaintingToArtistRequestType },
            AxiosResponse<MainPaintingType>>(`artists/${id}/paintings`, payload, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
  },
  updatePainting(
    id: string,
    paintingId: string,
    payload: AddPaintingToArtistRequestType,
  ) {
    return privateInstance.put<{ payload: AddPaintingToArtistRequestType },
            AxiosResponse<UpdatePaintingResponseType>>(`artists/${id}/paintings/${paintingId}`, payload, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
  },
  deletePainting(id: string, paintingId: string) {
    return privateInstance.delete(
      `artists/${id}/paintings/${paintingId}`,
    );
  },
};

export const genresAPI = {
  // requests for not authorised user
  getGenresStatic() {
    return instance.get<Array<GenreResponseType>>(
      'genres/static',
    );
  },

  // requests for authorized user
  getGenres() {
    return privateInstance.get<Array<GenreResponseType>>('genres');
  },
  getSpecifiedGenreById(id: string) {
    return privateInstance.get<AxiosResponse<GenreResponseType>>(`genres/${id}`);
  },
  createGenre(name: string) {
    return privateInstance.post<{ name: string }, AxiosResponse<GenreResponseType>>(
      'genres',
      { name },
    );
  },
  updateGenre(id: string, name: string) {
    return privateInstance.put<{ name: string }, AxiosResponse<GenreResponseType>>(
      `genres/${id}`,
      { name },
    );
  },
  deleteGenre(id: string) {
    return privateInstance.delete<AxiosResponse<{ _id: string }>>(`genres/${id}`);
  },
};

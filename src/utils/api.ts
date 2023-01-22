import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
// @ts-ignore
import { ClientJS } from "clientjs";
import { UrlParamsType } from "../store/gallery-reducer";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
const client = new ClientJS();
const fingerprint = client.getFingerprint().toString();

privateInstance.interceptors.request.use(
  (config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
    return config;
  },
  (error) => Promise.reject(error)
);

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
  paintings: Array<AuthorPaintingsType>;
};

export type ArtistsResponseType = {
  data: ArtistResponseType[];
  meta: {
    count: number;
    perPage: number;
    pageNumber: number;
  };
};

type UpdateMainPaintingResponseType = {
  size: number;
  buffer: {};
  encoding: string;
  mimetype: string;
  fieldname: string;
  originalname: string;
};

export type SpecifiedPaintingByIdType = {
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
};
type RegisterResponseType = {
  accessToken: string;
  refreshToken: string;
};
type RefreshRequestType = {
  fingerprint: string;
  refreshToken: string;
};

export const authAPI = {
  register(payload: RegisterDataType) {
    return instance.post<RegisterResponseType>("auth/register", {
      ...payload,
      fingerprint,
    });
  },
  login(username: string, password: string) {
    return instance.post<
      { username: string; password: string; fingerprint: string },
      AxiosResponse<RegisterResponseType, any>
    >("auth/login", { username, password, fingerprint });
  },
  refresh(payload: RefreshRequestType) {
    return instance.post<
      { payload: RefreshRequestType },
      AxiosResponse<RegisterResponseType, any>
    >("auth/refresh", payload);
  },
};

export const artistsAPI = {
  // requests for not authorised user
  getArtistsStatic() {
    return instance.get<Array<ArtistResponseType>>("artists/static");
  },
  getArtistStatic(id: string) {
    return instance.get<ArtistResponseType>(`artists/static/${id}`);
  },
  getProfilePicture(src: string) {
    return instance.get<any>(`${src}`);
  },

  // requests for authorized user

  getArtists(payload: UrlParamsType, portionSize: number, currentPage: number) {
    return privateInstance.get<ArtistsResponseType>(
      `artists?perPage=${portionSize}&pageNumber=${currentPage}`,
      { params: payload }
    );
  },
  getArtist(id: string) {
    return privateInstance.get<ArtistResponseType>(`artists/${id}`);
  },
  getPaintingsByAuthorId(authorId: string) {
    return privateInstance.get<Array<AuthorPaintingsType>>(
      `artists/${authorId}/paintings`
    );
  },
  getSpecifiedPaintingById(authorId: string, paintingId: string) {
    return privateInstance.get<SpecifiedPaintingByIdType>(
      `artists/${authorId}/paintings/${paintingId}`
    );
  },

  createArtist(payload: FormData) {
    return privateInstance.post<ArtistResponseType>("artists", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateArtist(id: string, payload: any) {
    return privateInstance.put<
      { payload: UpdateArtistRequestType },
      AxiosResponse<ArtistResponseType>
    >(`artists/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteArtist(id: string) {
    return privateInstance.delete<AxiosResponse<{ _id: string }>>(
      `artists/${id}`
    );
  },
  updateMainPainting(paintingId: string, authorId: string) {
    return privateInstance.patch<AxiosResponse<UpdateMainPaintingResponseType>>(
      `artists/${authorId}/main-painting`,
      { mainPainting: paintingId }
    );
  },
  addPaintingToArtist(id: string, payload: any) {
    return privateInstance.post<
      { payload: AddPaintingToArtistRequestType },
      AxiosResponse<MainPaintingType>
    >(`artists/${id}/paintings`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatePainting(id: string, paintingId: string, payload: FormData) {
    return privateInstance.put<
      { payload: AddPaintingToArtistRequestType },
      AxiosResponse<UpdatePaintingResponseType>
    >(`artists/${id}/paintings/${paintingId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deletePainting(id: string, paintingId: string) {
    return privateInstance.delete(`artists/${id}/paintings/${paintingId}`);
  },
};

export const genresAPI = {
  // requests for not authorised user
  getGenresStatic() {
    return instance.get<Array<GenreResponseType>>("genres/static");
  },

  // requests for authorized user
  getGenres() {
    return privateInstance.get<Array<GenreResponseType>>("genres");
  },
  getSpecifiedGenreById(id: string) {
    return privateInstance.get<AxiosResponse<GenreResponseType>>(
      `genres/${id}`
    );
  },
  createGenre(name: string) {
    return privateInstance.post<
      { name: string },
      AxiosResponse<GenreResponseType>
    >("genres", { name });
  },
  updateGenre(id: string, name: string) {
    return privateInstance.put<
      { name: string },
      AxiosResponse<GenreResponseType>
    >(`genres/${id}`, { name });
  },
  deleteGenre(id: string) {
    return privateInstance.delete<AxiosResponse<{ _id: string }>>(
      `genres/${id}`
    );
  },
};

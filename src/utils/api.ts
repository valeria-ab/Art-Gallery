import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://internship-front.framework.team/',
});

// types

type ImageType = {
    _id: string;
    src: string;
    webp: string;
    src2x: string;
    webp2x: string;
    original: string;
}
type MainPaintingType = {
    _id: string
    name: string
    yearOfCreation: string
    image: ImageType
    artist: string

}
export type ArtistStaticResponseType = {
    genres: string;
    _id: string;
    name: string;
    description: string;
    yearsOfLife: string;
    mainPainting:MainPaintingType;
};

export type ArtistResponseType = {
    genres: string;
    _id: string;
    name: string;
    description: string;
    yearsOfLife: string;
    avatar: ImageType;
};

type AuthorPaintingsType = {
    _id: string;
    name: string;
    yearsOfLife: string;
    image: ImageType;
}

type SpecifiedPaintingByIdType = {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: ImageType;
}

type GenreResponseType = {
    _id: string
    name: string
}

export const artistsAPI = {
  // requests for not authorised user
  getArtistsStatic() {
    return instance.get<Array<ArtistStaticResponseType>>('artists/static');
  },
  getArtistStatic(id: string) {
    return instance.get<ArtistStaticResponseType>(
      `artists/static/${id}`,
    );
  },
  // requests for authorised user
  getArtists() {
    return instance.get<Array<ArtistResponseType>>('artists');
  },
  getArtist(id: string) {
    return instance.get<ArtistResponseType>(
      `artists/${id}`,
    );
  },
  getPaintingsByAuthorId(authorId: string) {
    return instance.get<Array<AuthorPaintingsType>>(`artists/${authorId}/paintings`);
  },
  getSpecifiedPaintingById(paintingId: string, authorId: string) {
    return instance.get<SpecifiedPaintingByIdType>(`artists/${authorId}/paintings/${paintingId}`);
  },
};

export const genresAPI = {
  // requests for not authorised user
  getGenresStatic() {
    return instance.get<Array<GenreResponseType>>('genres/static');
  },

  // requests for authorised user
  getGenres() {
    return instance.get<Array<GenreResponseType>>('genres');
  },
  getSpecifiedGenreById(id: string) {
    return instance.get<GenreResponseType>(`genres/${id}`);
  },
};

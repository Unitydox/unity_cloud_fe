import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const Photos = lazy(() => import('pages/Photos'));
const Albums = lazy(() => import('pages/Albums'));
const AlbumsList = lazy(() => import('components/AlbumsList'));
const AlbumsView = lazy(() => import('components/AlbumsView'));
const Profile = lazy(() => import('pages/Profile'));

export {
	Home, 
	Photos, 
	Albums, 
	AlbumsList, 
	AlbumsView,
	Profile
}
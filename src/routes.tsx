import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Photos = lazy(() => import('./pages/Photos'));
const Albums = lazy(() => import('./pages/Albums'));

export {
	Home, 
	Photos, 
	Albums
}
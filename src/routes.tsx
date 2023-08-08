import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Photos = lazy(() => import('./pages/Photos'));

export {
	Home, 
	Photos
}
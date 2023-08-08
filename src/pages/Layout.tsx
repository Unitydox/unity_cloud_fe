import Header from '../components/Header';
import SideNav from '../components/SideNav'
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='h-screen'>
			<Header />

			<div className="flex h-full">
				<SideNav />

				<main className='p-4'>
					<Outlet /> 
				</main>
			</div>
		</div>
	)
}

export default Layout;
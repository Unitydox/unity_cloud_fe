import Header from '../components/Header';
import SideNav from '../components/SideNav'
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='flex h-screen flex-col'>
			<Header />

			<div className="flex flex-1 overflow-hidden">
				<SideNav />

				<main className='w-full flex-1 overflow-y-auto p-4'>
					<Outlet /> 
				</main>
			</div>
		</div>
	)
}

export default Layout;
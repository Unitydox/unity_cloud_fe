import { Outlet } from 'react-router-dom';
import { FileUploadProvider } from 'contexts/FileUploadContext';
import Header from '../components/Header';
import SideNav from '../components/SideNav'

function Layout() {

	return (
		<FileUploadProvider>
			<div className='flex h-screen flex-col'>
				<Header />

				<div className="flex flex-1 overflow-hidden">
					<SideNav />

					<main className='w-full flex-1 overflow-y-auto p-4'>
						<Outlet /> 
					</main>
				</div>
			</div>
		</FileUploadProvider>
	)
}

export default Layout;
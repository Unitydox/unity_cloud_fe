// import { CloudUploadIcon } from '@heroicons/react/outline'; 
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function NothingToSee() {
  return (
    <div className="flex h-full select-none flex-col items-center justify-center">
      <CloudArrowUpIcon className="h-32 w-32 animate-bounce text-gray-400" />
      
      <h2 className="mt-5 text-2xl font-semibold text-gray-600">
        Nothing to see here
      </h2>
      
      <p className="mt-2 text-orange-500/80">Add some photos to get started</p>
      
      {/* <svg className="mt-16 h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg> */}
      <PhotoIcon className='mt-5 h-32 w-32 text-gray-300' />
    </div>
  );
}
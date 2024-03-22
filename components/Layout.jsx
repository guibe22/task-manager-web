import React from 'react';
import "./DashBoardMenu"
import DashboardMenu from './DashBoardMenu';

function Layout({ children }) {
    return (
        <div className="antialiased bg-gray-100 w-full max-h-screen text-black relative py-4">
            <div className='grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2'>
                <DashboardMenu />
                <div className="bg-white col-span-9 rounded-lg p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
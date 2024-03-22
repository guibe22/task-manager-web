import React from 'react';

function StatsCard({ number, title, icon }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex flex-row space-x-4 items-center">
        <div id="stats-1">
          {icon}
        </div>
        <div>
          <p className="text-black text-sm font-medium uppercase leading-4">{title}</p>
          <p className="text-black font-bold text-2xl inline-flex items-center space-x-2">
            <span>{number}</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
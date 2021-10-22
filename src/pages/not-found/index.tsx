import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { NavigationTemplate } from '../../entities/navigation';
import { paths } from '../paths';

export function NotFoundPage() {
  return (
    <NavigationTemplate>
      <div className="flex justify-center items-center min-w-full flex-grow flex-col">
        <div className="block text-2xl text-blue-500 font-extrabold uppercase">404 error</div>
        <div className="block text-6xl leading-2 font-bold text-black mt-3 mb-4">
          Page not found.
        </div>
        <div className="block text-m text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </div>
        <Link
          to={paths.dashboard()}
          className="text-blue-500 hover:text-blue-800 group inline-flex items-center text-base mt-2"
        >
          <span>Go back to the dashboard</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 text-blue-500 group-hover:text-blue-800" />
        </Link>
      </div>
    </NavigationTemplate>
  );
}

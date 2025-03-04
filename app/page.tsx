'use client'

import Weather from './components/weather'

export default function Home() {
  return (
      <div >
        <h1 className="text-4xl font-bold">
          Welcome to the Home Page
        </h1>
        <Weather />
      </div>
  );
}

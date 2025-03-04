import React from 'react'

import UseFetchWeatherData from './fetchData'

interface FilterProps {
    selectWeatherId: number | null;
    onSelectWeatherIdChange: (weatherId: number | null) => void;
}



const Filter = ({selectWeatherId, onSelectWeatherIdChange}: FilterProps) => {
    const {data} = UseFetchWeatherData()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectWeatherIdChange(parseInt(e.target.value))
    }

  return (
    <div>
      <select value={selectWeatherId || ''} onChange={handleChange}>
        <option value='all'>All</option>
            {data?.map((weather) => (
                <option key={weather.id} value={weather.id}>{weather.city}</option>
            ))}
      </select>
    </div>
  )
}

export default Filter

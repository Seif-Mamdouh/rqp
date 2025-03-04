import React, { useState } from 'react'

import UseFetchWeatherData from './fetchData'
import Filter from './filter'

interface Weather {
    id: number;
    city: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
}
const Weather = () => {

    const {data, error, isLoading} = UseFetchWeatherData()

    const [selectWeatherId, setSelectWeatherId] = useState<number | null>(null)

    const handleSelectWeatherIdChange = (weatherId: number | null) => {
        setSelectWeatherId(weatherId)
    }

    const filteredData = selectWeatherId ? data?.filter((weather: Weather) => weather.id === selectWeatherId) : data

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

  return (
    <div>
        <Filter selectWeatherId={selectWeatherId} onSelectWeatherIdChange={handleSelectWeatherIdChange} />
      {filteredData?.map((weather: Weather) => (
        <div key={weather.id}>
          <h2>{weather.city}</h2>
          <p>{weather.temperature}</p>
          <p>{weather.humidity}</p>
          <p>{weather.windSpeed}</p>
        </div>
      ))}
    </div>
  )
}

export default Weather


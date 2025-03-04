import React, { useState } from 'react'

import UseFetchWeatherData from './fetchData'
import Filter from './filter'
import OnePageAtAtime from './onePageAtAtime'
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
    const [page, setPage] = useState(0)

    const currIndex = data?.[page]

    const handlePageNext = () => {
        if (page < (data?.length || 0) - 1) {
            setPage(page + 1)
        }
    }

    const handlePagePrev = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleSelectWeatherIdChange = (weatherId: number | null) => {
        setSelectWeatherId(weatherId)
    }
    
    
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

  return (
    <div>
        <Filter selectWeatherId={selectWeatherId} onSelectWeatherIdChange={handleSelectWeatherIdChange} />
      {currIndex && (
        <div key={currIndex.id}>
          <h2>{currIndex.city}</h2>
          <p>{currIndex.temperature}</p>
          <p>{currIndex.humidity}</p>
          <p>{currIndex.windSpeed}</p>
        </div>
      )}
      <OnePageAtAtime 
        onPageNext={handlePageNext} 
        onPagePrev={handlePagePrev}
        disabledNext={page >= (data?.length || 0) - 1}
        disabledPrev={page <= 0}
      />
    </div>
  )
}

export default Weather


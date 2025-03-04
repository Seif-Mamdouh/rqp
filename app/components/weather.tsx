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
    const [favorites, setFavorites] = useState<string[]>([])

    const currIndex = data?.[page]


    const handleAddFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        const favoriteCity = data?.[page]?.city
        if (favoriteCity) {
            e.preventDefault()
            setFavorites([...favorites, favoriteCity])
        }
    }

    const handleRemoveFavorite = (favorite: string) => {
        setFavorites(favorites.filter((f) => f !== favorite))
    }

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
          <button onClick={handleAddFavorite}>add</button>
          <button onClick={() => handleRemoveFavorite(currIndex.city)}>remove</button>
        </div>
      )}
      <OnePageAtAtime 
        onPageNext={handlePageNext} 
        onPagePrev={handlePagePrev}
        disabledNext={page >= (data?.length || 0) - 1}
        disabledPrev={page <= 0}
      />

      {favorites.length > 0 && (
        <div>
          {favorites.map((favorite) => (
            <div key={favorite}>
              <h2>{favorite}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Weather


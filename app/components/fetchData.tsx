'use client';

import { useQuery } from '@tanstack/react-query';
import weatherData from '@/data/weatherData.json';

const fetchData = () => {
  return weatherData.weatherData
};

export default function UseFetchWeatherData() {
  return useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchData,
  });
}

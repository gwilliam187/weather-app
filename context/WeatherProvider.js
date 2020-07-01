import { createContext, useState } from 'react';

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
	const [weather, setWeather] = useState({
		weather: null,
			isFetching: false,
			error: null
	})

	return (
		<WeatherContext.Provider value = {{ weather, setWeather }}>
			{ children }
		</WeatherContext.Provider>
	);
}

export default WeatherProvider;
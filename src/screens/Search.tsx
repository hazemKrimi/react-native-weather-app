import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SearchProps } from '../types/types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { WEATHER_API_KEY } from '@env';
import Container from '../components/Container';
import Card from '../components/Card';
import Loader from '../components/Loader';

interface WeatherResponse {
    weather: Array<{ id: number, description: string, icon: string }>,
    main: { temp: number, humidity: number },
    wind: { speed: number },
    name: string,
    sys: {
        country: string
    },
    dt: number,
    coord: {
        lat: number,
        lon: number
    }
};

interface ForecastResponse {
    hourly: Array<{
        dt: number,
        temp: number,
        weather: Array<{ id: number, description: string, icon: string }>
    }>,
    daily: Array<{
        dt: number,
        temp: { min: number, max: number },
        weather: Array<{ id: number, description: string, icon: string }>
    }>
};

interface Weather {
    description: string,
    icon: string,
    main: {
        temp: number,
        humidity: number
    },
    wind: {
        speed: number
    },
    country: string,
    timestamp: number,
    name: string
};

interface Forecast {
    hourly: Array<{
        dt: number,
        temp: number,
        weather: Array<{ id: number, description: string, icon: string }>
    }>,
    daily: Array<{
        dt: number,
        temp: { min: number, max: number },
        weather: Array<{ id: number, description: string, icon: string }>
    }>
};

const Search: React.FC<SearchProps> = ({ route }) => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ weather, setWeather ] = useState<Weather | null>(null);
    const [ forecast, setForecast ] = useState<Forecast | null>(null);
    const [ error, setError ] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                let weatherRes: Response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${route.params.query}&appid=${WEATHER_API_KEY}&units=metric`
                );
                let weatherResBody: WeatherResponse = await weatherRes.json();
                setWeather({
                    description: weatherResBody.weather[0].description,
                    icon: weatherResBody.weather[0].icon,
                    main: weatherResBody.main,
                    wind: weatherResBody.wind,
                    name: weatherResBody.name,
                    country: weatherResBody.sys.country,
                    timestamp: weatherResBody.dt
                });
                let coords = weatherResBody.coord;
                let forecastRes: Response = await fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&exclude=minutely&units=metric`
                );
                let forecastResBody: ForecastResponse = await forecastRes.json();
                setForecast({
                    hourly: forecastResBody.hourly,
                    daily: forecastResBody.daily
                });
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError('Could not get weather data! Try again later');
            }
        })();

        return () => {
            setError('');
            setLoading(true);
        }
    }, [route.params.query]);

    return !loading ? (
        <>
            {
                weather && forecast && !error ? (
                    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                        <Container>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.cityName}>{weather.name}, {weather.country}</Text>
                                <Card
                                    date={new Date(weather.timestamp * 1000)}
                                    time={false}
                                    data={weather.main.temp + '°C'}
                                    icon={weather.icon}
                                    description={weather.description}
                                />
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Daily Forecast</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        forecast.daily.map(day => (
                                            <View style={{ marginHorizontal: wp('2%') }} key={day.dt}>
                                                <Card
                                                    date={new Date(day.dt * 1000)}
                                                    time={false}
                                                    data={day.temp.min + '°C/' + day.temp.max + '°C'}
                                                    icon={day.weather[0].icon}
                                                    description={day.weather[0].description}
                                                />
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Hourly Forecast</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        forecast.hourly.map(hour => (
                                            <View style={{ marginHorizontal: wp('2%') }} key={hour.dt}>
                                                <Card
                                                    date={new Date(hour.dt * 1000)}
                                                    time={true}
                                                    data={hour.temp + '°C'}
                                                    icon={hour.weather[0].icon}
                                                    description={hour.weather[0].description}
                                                />
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Wind</Text>
                                <Card
                                    date={new Date(weather.timestamp * 1000)}
                                    icon='50d'
                                    time={false}
                                    data={weather.wind.speed + 'km/h'}
                                />
                            </View>
                            <View style={[styles.sectionContainer, { marginBottom: hp('2%') }]}>
                                <Text style={styles.sectionTitle}>Humidity</Text>
                                <Card
                                    date={new Date(weather.timestamp * 1000)}
                                    time={false}
                                    data={weather.main.humidity + '%'}
                                    icon='50d'
                                />
                            </View>
                        </Container>
                    </ScrollView>
                ) : (
                    <View style={[styles.wrapper, { height: hp('100%'), alignItems: 'center' }]}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                )
            }
        </>
    ) : (
        <View style={[styles.wrapper, { paddingVertical: 0 }]}>
            <Container>
                <Loader />
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: hp('2%')
    },
    sectionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityName: {
        fontFamily: 'Poppins-Bold',
        fontSize: hp('5.5%')
    },
    sectionTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: hp('4.5%')
    },
    error: {
        fontFamily: 'Poppins-Bold',
        fontSize: hp('4.5%'),
        textAlign: 'center'
    }
});

export default Search;
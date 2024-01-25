import { useState, useEffect } from 'react';
import { ViewIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Input, Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { faCloudSun, faWind } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [city, setCity] = useState('HaNoi'); // Khởi tạo state để lưu trữ thành phố
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

  useEffect(() => {
    // Gọi OpenWeather API khi component được mount lần đầu tiên
    fetchWeatherData(city);
  }, []); // deps rỗng để không re-render nhiều lần không cần thiết khi nhập input

  const fetchWeatherData = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleEnterKeyPress = (e) => {
    // Gọi hàm fetchWeatherData khi người dùng nhấn phím Enter
    if (e.key === 'Enter') {
      fetchWeatherData(city);
    }
  };
  

  return (
    <div
      style={{
        height: '100vh',
        background: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url('${
          weatherData && weatherData.main && weatherData.main.temp < 15
            ? 'https://wallpapersmug.com/download/1024x768/95afc8/dark-night-river-forest-minimal-art.jpg'
            : 'https://dthezntil550i.cloudfront.net/zs/latest/zs2104141342343070006668840/1280_960/b40b6bc4-445d-486f-a1c9-af263faa384c.jpg'
        }')`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10',
          backgroundImage: `url('${
            weatherData && weatherData.main && weatherData.main.temp < 15
              ? 'https://wallpapersmug.com/download/1024x768/95afc8/dark-night-river-forest-minimal-art.jpg'
              : 'https://dthezntil550i.cloudfront.net/zs/latest/zs2104141342343070006668840/1280_960/b40b6bc4-445d-486f-a1c9-af263faa384c.jpg'
          }')`,
        }}
      >
        <Input
          className="search"
          sx={{
            my: 8,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 15,
            boxShadow: '0 5px 4px rgba(0,0,0,0.2)',
            '&:focus': {
              boxShadow: '0 5px 4px rgba(0,0,0,0.5)',
            },
          }}
          variant="outline"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Cập nhật state city bằng giá trị input mới
          onKeyPress={handleEnterKeyPress}
        />
        {weatherData && (
          <Box
            sx={{
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            <Text
              sx={{
                color: 'white',
                fontSize: 20,
                textShadow: '2px 2px rgba(0,0,0,0.2)',
              }}
            >
              <span className="city">{weatherData.name}</span>
              {weatherData.sys && (
                <>
                  <span>, </span>
                  <span className="country">{weatherData.sys.country}</span>
                </>
              )}
            </Text>

            <Text
              sx={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {new Date().toLocaleString()}
            </Text>

            <Box
              className="value"
              sx={{
                fontSize: 50,
                fontWeight: '500',
                color: 'white',
                textShadow: '2px 2px rgba(0,0,0,0.4)',
                background: 'rgba(255,255,255,0.2)',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                borderRadius: 15,
                m: 8,
                p: '20px 60px',
              }}
            >
              {weatherData.main && (weatherData.main.temp)}°C
            </Box>

            <Text
              className="description"
              sx={{
                color: 'white',
                fontSize: 32,
                textShadow: '2px 2px rgba(0,0,0,0.4)',
              }}
            >
              {weatherData.weather && weatherData.weather[0].description}
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" gap={2} margin="auto" color={'white'} marginBottom={'16'}>
              <GridItem p={5}>
                <ViewIcon />
                <Text>{weatherData.visibility}(m)</Text>
              </GridItem>
              <GridItem p={5}>
                <FontAwesomeIcon icon={faWind} />
                <Text> {weatherData.wind && weatherData.wind.speed}(m/s)</Text>
              </GridItem>
              <GridItem p={5}>
                <FontAwesomeIcon icon={faCloudSun} />
                <Text>{weatherData.clouds && weatherData.clouds.all}(%)</Text>
              </GridItem>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;

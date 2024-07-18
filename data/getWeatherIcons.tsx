import { WiCloud, WiCloudy, WiDayCloudy, WiDayShowers, WiDaySunny, WiFog, WiNightClear, WiNightCloudy, WiNightFog, WiNightRain, WiNightSnow, WiNightThunderstorm, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

export const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloud />;
      case 'Few Clouds':
        return <WiDayCloudy />;
      case 'Scattered Clouds':
        return <WiDayCloudy />;
      case 'Broken Clouds':
        return <WiCloudy />;
      case 'Shower Rain':
        return <WiDayShowers />;
      case 'Rain':
        return <WiRain />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      case 'Snow':
        return <WiSnow />;
      case 'Mist':
        return <WiFog />;
      case 'Night Clear':
        return <WiNightClear />;
      case 'Night Clouds':
        return <WiNightCloudy />;
      case 'Night Rain':
        return <WiNightRain />;
      case 'Night Thunderstorm':
        return <WiNightThunderstorm />;
      case 'Night Snow':
        return <WiNightSnow />;
      case 'Night Fog':
        return <WiNightFog />;
      default:
        return "Icon not found";
    }
  }
package com.example.demo.scrapers;

import com.example.demo.model.CurrentWeatherData;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class CurrentWeatherScraper {

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.city.name}")
    private String cityName;

    @Value("${openweather.state.code}")
    private String stateCode;

    @Value("${openweather.country.code}")
    private String countryCode;

    public WeatherDataRaw fetchWeatherData() {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s,%s,%s&appid=%s",
                cityName, stateCode, countryCode, apiKey);

        return restTemplate.getForObject(url, WeatherDataRaw.class);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherDataRaw {
        private List<CurrentWeatherData.Weather> weather;
        private CurrentWeatherData.Main main;
        private int visibility;
        private CurrentWeatherData.Wind wind;
        private CurrentWeatherData.Clouds clouds;
        private CurrentWeatherData.Rain rain;
        private CurrentWeatherData.Snow snow;
        private long dt;
        private CurrentWeatherData.Sys sys;
        private int timezone;
        private int cod;
                public List<CurrentWeatherData.Weather> getWeather() {
            return weather;
        }

        public void setWeather(List<CurrentWeatherData.Weather> weather) {
            this.weather = weather;
        }

        public CurrentWeatherData.Main getMain() {
            return main;
        }

        public void setMain(CurrentWeatherData.Main main) {
            this.main = main;
        }

        public int getVisibility() {
            return visibility;
        }

        public void setVisibility(int visibility) {
            this.visibility = visibility;
        }

        public CurrentWeatherData.Wind getWind() {
            return wind;
        }

        public void setWind(CurrentWeatherData.Wind wind) {
            this.wind = wind;
        }

        public CurrentWeatherData.Clouds getClouds() {
            return clouds;
        }

        public void setClouds(CurrentWeatherData.Clouds clouds) {
            this.clouds = clouds;
        }

        public CurrentWeatherData.Rain getRain() {
            return rain;
        }

        public void setRain(CurrentWeatherData.Rain rain) {
            this.rain = rain;
        }

        public CurrentWeatherData.Snow getSnow() {
            return snow;
        }

        public void setSnow(CurrentWeatherData.Snow snow) {
            this.snow = snow;
        }

        public long getDt() {
            return dt;
        }

        public void setDt(long dt) {
            this.dt = dt;
        }

        public CurrentWeatherData.Sys getSys() {
            return sys;
        }

        public void setSys(CurrentWeatherData.Sys sys) {
            this.sys = sys;
        }

        public int getTimezone() {
            return timezone;
        }

        public void setTimezone(int timezone) {
            this.timezone = timezone;
        }

        public int getCod() {
            return cod;
        }

        public void setCod(int cod) {
            this.cod = cod;
        }
    }
}

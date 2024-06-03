package com.example.demo;

import com.example.demo.model.WeatherData;
import com.example.demo.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.UUID;

@Component
public class WeatherScraper {

    @Autowired
    private WeatherRepository weatherRepository;

    private final String apiKey = "71287dae2da257653b6b14989d35491f";
    private final String cityName = "Manhattan";
    private final String stateCode = "NY";
    private final String countryCode = "US";

    @Scheduled(fixedRate = 180000)
    public WeatherData fetchWeatherData() {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s,%s,%s&appid=%s",
                cityName, stateCode, countryCode, apiKey);

        WeatherDataRaw weatherDataRaw = restTemplate.getForObject(url, WeatherDataRaw.class);

        if (weatherDataRaw != null && weatherDataRaw.getWeather() != null && !weatherDataRaw.getWeather().isEmpty()) {
            WeatherData weatherData = new WeatherData();
            weatherData.setId(UUID.randomUUID());
            weatherData.setWeather(weatherDataRaw.getWeather().get(0));
            weatherData.setMain(weatherDataRaw.getMain());
            weatherData.setVisibility(weatherDataRaw.getVisibility());
            weatherData.setWind(weatherDataRaw.getWind());
            weatherData.setClouds(weatherDataRaw.getClouds());
            weatherData.setDt(weatherDataRaw.getDt());
            weatherData.setTimezone(weatherDataRaw.getTimezone());
            weatherData.setCod(weatherDataRaw.getCod());
            weatherRepository.save(weatherData);
            return weatherData;
        }

        return null;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class WeatherDataRaw {
        private List<WeatherData.Weather> weather;
        private WeatherData.Main main;
        private int visibility;
        private WeatherData.Wind wind;
        private WeatherData.Clouds clouds;
        private long dt;
        private int timezone;
        private int cod;

        // Getters and Setters for WeatherDataRaw fields
        public List<WeatherData.Weather> getWeather() {
            return weather;
        }

        public void setWeather(List<WeatherData.Weather> weather) {
            this.weather = weather;
        }

        public WeatherData.Main getMain() {
            return main;
        }

        public void setMain(WeatherData.Main main) {
            this.main = main;
        }

        public int getVisibility() {
            return visibility;
        }

        public void setVisibility(int visibility) {
            this.visibility = visibility;
        }

        public WeatherData.Wind getWind() {
            return wind;
        }

        public void setWind(WeatherData.Wind wind) {
            this.wind = wind;
        }

        public WeatherData.Clouds getClouds() {
            return clouds;
        }

        public void setClouds(WeatherData.Clouds clouds) {
            this.clouds = clouds;
        }

        public long getDt() {
            return dt;
        }

        public void setDt(long dt) {
            this.dt = dt;
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
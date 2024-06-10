package com.example.demo.scrapers;

import com.example.demo.model.HourlyWeatherForecastData;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class HourlyWeatherForecastScraper {

    private static final Logger logger = LoggerFactory.getLogger(HourlyWeatherForecastScraper.class);

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.city.name}")
    private String cityName;

    @Value("${openweather.state.code}")
    private String stateCode;

    @Value("${openweather.country.code}")
    private String countryCode;

    public WeatherDataRaw fetchWeatherData() {
        logger.info("Starting to fetch weather data");

        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://pro.openweathermap.org/data/2.5/forecast/hourly?q=%s,%s,%s&appid=%s",
                cityName, stateCode, countryCode, apiKey);

        try {
            return restTemplate.getForObject(url, WeatherDataRaw.class);
        } catch (RestClientException e) {
            logger.error("Error fetching weather data: {}", e.getMessage());
            return null;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherDataRaw {
        private int cod;
        private int message;
        private int cnt;
        private HourlyWeatherForecastData.City city;
        private List<HourlyForecastDataRaw> list;

        public int getCod() {
            return cod;
        }

        public void setCod(int cod) {
            this.cod = cod;
        }

        public int getMessage() {
            return message;
        }

        public void setMessage(int message) {
            this.message = message;
        }

        public int getCnt() {
            return cnt;
        }

        public void setCnt(int cnt) {
            this.cnt = cnt;
        }

        public HourlyWeatherForecastData.City getCity() {
            return city;
        }

        public void setCity(HourlyWeatherForecastData.City city) {
            this.city = city;
        }

        public List<HourlyForecastDataRaw> getList() {
            return list;
        }

        public void setList(List<HourlyForecastDataRaw> list) {
            this.list = list;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class HourlyForecastDataRaw {
        private long dt;
        private int visibility;
        private double pop;
        private String dt_txt;
        private HourlyWeatherForecastData.Main main;
        private HourlyWeatherForecastData.Clouds clouds;
        private HourlyWeatherForecastData.Wind wind;
        private HourlyWeatherForecastData.Rain rain;
        private HourlyWeatherForecastData.Snow snow;
        private HourlyWeatherForecastData.Sys sys;
        private List<HourlyWeatherForecastData.Weather> weather;

        public long getDt() {
            return dt;
        }

        public void setDt(long dt) {
            this.dt = dt;
        }

        public int getVisibility() {
            return visibility;
        }

        public void setVisibility(int visibility) {
            this.visibility = visibility;
        }

        public double getPop() {
            return pop;
        }

        public void setPop(double pop) {
            this.pop = pop;
        }

        public String getDt_txt() {
            return dt_txt;
        }

        public void setDt_txt(String dt_txt) {
            this.dt_txt = dt_txt;
        }

        public HourlyWeatherForecastData.Main getMain() {
            return main;
        }

        public void setMain(HourlyWeatherForecastData.Main main) {
            this.main = main;
        }

        public HourlyWeatherForecastData.Clouds getClouds() {
            return clouds;
        }

        public void setClouds(HourlyWeatherForecastData.Clouds clouds) {
            this.clouds = clouds;
        }

        public HourlyWeatherForecastData.Wind getWind() {
            return wind;
        }

        public void setWind(HourlyWeatherForecastData.Wind wind) {
            this.wind = wind;
        }

        public HourlyWeatherForecastData.Rain getRain() {
            return rain;
        }

        public void setRain(HourlyWeatherForecastData.Rain rain) {
            this.rain = rain;
        }

        public HourlyWeatherForecastData.Snow getSnow() {
            return snow;
        }

        public void setSnow(HourlyWeatherForecastData.Snow snow) {
            this.snow = snow;
        }

        public HourlyWeatherForecastData.Sys getSys() {
            return sys;
        }

        public void setSys(HourlyWeatherForecastData.Sys sys) {
            this.sys = sys;
        }

        public List<HourlyWeatherForecastData.Weather> getWeather() {
            return weather;
        }

        public void setWeather(List<HourlyWeatherForecastData.Weather> weather) {
            this.weather = weather;
        }
    }
}


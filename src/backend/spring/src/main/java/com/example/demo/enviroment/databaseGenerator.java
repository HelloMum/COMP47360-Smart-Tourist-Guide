package com.example.demo.enviroment;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


@Component
public class databaseGenerator {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initializeDatabase() {
        if (!tableExists("weather_data")) {
            createWeatherDataTable();
        }

        if (!tableExists("users")) {
            createUserTable();
        }

        if (tableExists("itinerary_saved") && !columnExists("itinerary_saved_items", "is_event")) {
            dropTable("itinerary_saved_items");
            dropTable("itinerary_saved");
            createItinerarySavedTable();
            createItinerarySavedItemsTable();
        } else {
            if (!tableExists("itinerary_saved")) {
                createItinerarySavedTable();
            }

            if (!tableExists("itinerary_saved_items")) {
                createItinerarySavedItemsTable();
            }
        }
    }

    private boolean tableExists(String tableName) {
        String query = "SELECT EXISTS (SELECT 1 FROM information_schema.tables " +
                "WHERE table_schema = 'public' AND table_name = ?)";
        Boolean exists = jdbcTemplate.queryForObject(query, Boolean.class, tableName);
        return exists != null && exists;
    }

    private boolean columnExists(String tableName, String columnName) {
        String query = "SELECT EXISTS (SELECT 1 FROM information_schema.columns " +
                "WHERE table_schema = 'public' AND table_name = ? AND column_name = ?)";
        Boolean exists = jdbcTemplate.queryForObject(query, Boolean.class, tableName, columnName);
        return exists != null && exists;
    }

    private void dropTable(String tableName) {
        String dropTableSQL = "DROP TABLE IF EXISTS " + tableName + " CASCADE";
        jdbcTemplate.execute(dropTableSQL);
    }

    private void createWeatherDataTable() {
        String createTableSQL = "CREATE TABLE public.weather_data (" +
                "id uuid NOT NULL, " +
                "all_clouds integer, " +
                "cod integer, " +
                "dt bigint, " +
                "fetch_time timestamp(6) without time zone, " +
                "feels_like double precision, " +
                "humidity integer, " +
                "pressure integer, " +
                "temperature double precision, " +
                "temp_max double precision, " +
                "temp_min double precision, " +
                "rain_1h double precision, " +
                "rain_3h double precision, " +
                "snow_1h double precision, " +
                "snow_3h double precision, " +
                "sunrise bigint, " +
                "sunset bigint, " +
                "timezone integer, " +
                "visibility integer, " +
                "weather_description character varying(255), " +
                "weather_icon character varying(255), " +
                "weather_id integer, " +
                "weather_main character varying(255), " +
                "wind_deg integer, " +
                "wind_gust double precision, " +
                "wind_speed double precision, " +
                "PRIMARY KEY (id))";
        jdbcTemplate.execute(createTableSQL);
    }

    private void createUserTable() {
        String createTableSQL = "CREATE TABLE users (" +
                "id SERIAL PRIMARY KEY, " +
                "email VARCHAR(255) UNIQUE NOT NULL, " +
                "password VARCHAR(255) NOT NULL, " +
                "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        jdbcTemplate.execute(createTableSQL);
    }

    private void createItinerarySavedTable() {
        String createTableSQL = "CREATE TABLE itinerary_saved (" +
                "id SERIAL PRIMARY KEY, " +
                "user_id SERIAL NOT NULL, " +
                "start_date DATE NOT NULL, " +
                "end_date DATE NOT NULL, " +
                "FOREIGN KEY (user_id) REFERENCES users(id))";
        jdbcTemplate.execute(createTableSQL);
    }

    private void createItinerarySavedItemsTable() {
        String createTableSQL = "CREATE TABLE itinerary_saved_items (" +
                "id SERIAL PRIMARY KEY, " +
                "itinerary_id INTEGER NOT NULL, " +
                "item_id INTEGER, " +
                "event_id UUID, " +
                "is_event BOOLEAN NOT NULL, " +
                "start_time TIMESTAMP NOT NULL, " +
                "end_time TIMESTAMP NOT NULL, " +
                "FOREIGN KEY (itinerary_id) REFERENCES itinerary_saved(id), " +
                "CHECK ((is_event = TRUE AND event_id IS NOT NULL AND item_id IS NULL) OR " +
                "(is_event = FALSE AND item_id IS NOT NULL AND event_id IS NULL)))";
        jdbcTemplate.execute(createTableSQL);
    }
}

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Homebrew)
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-03 17:22:54 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16841)
-- Name: weather_data; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.weather_data (
    id uuid NOT NULL,
    all_clouds integer,
    cod integer,
    dt bigint,
    fetch_time timestamp(6) without time zone,
    feels_like double precision,
    humidity integer,
    pressure integer,
    temperature double precision,
    temp_max double precision,
    temp_min double precision,
    rain_1h double precision,
    rain_3h double precision,
    snow_1h double precision,
    snow_3h double precision,
    sunrise bigint,
    sunset bigint,
    timezone integer,
    visibility integer,
    weather_description character varying(255),
    weather_icon character varying(255),
    weather_id integer,
    weather_main character varying(255),
    wind_deg integer,
    wind_gust double precision,
    wind_speed double precision
);


ALTER TABLE public.weather_data OWNER TO "default";

--
-- TOC entry 3650 (class 0 OID 16841)
-- Dependencies: 214
-- Data for Name: weather_data; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.weather_data (id, all_clouds, cod, dt, fetch_time, feels_like, humidity, pressure, temperature, temp_max, temp_min, rain_1h, rain_3h, snow_1h, snow_3h, sunrise, sunset, timezone, visibility, weather_description, weather_icon, weather_id, weather_main, wind_deg, wind_gust, wind_speed) FROM stdin;
24508c06-2b21-4632-a83f-f7a33073b74d	0	200	1717431315	2024-06-03 17:15:15.327959	301.26	42	1014	301.48	303.74	298.49	\N	\N	\N	\N	1717406754	1717460558	-14400	10000	clear sky	01d	800	Clear	0	0	3.09
4be00be3-b77f-4990-8b68-d1efc0a843c2	0	200	1717431116	2024-06-03 17:15:15.298506	301.23	42	1014	301.45	303.74	298.49	\N	\N	\N	\N	1717406754	1717460558	-14400	10000	clear sky	01d	800	Clear	0	0	3.09
c71d9255-4f33-4372-a6b2-2996dd741a4e	0	200	1717431116	2024-06-03 17:18:15.155451	301.23	42	1014	301.45	303.74	298.49	\N	\N	\N	\N	1717406754	1717460558	-14400	10000	clear sky	01d	800	Clear	0	0	3.09
cfaea117-c9d3-447b-83e4-4afec33845f2	0	200	1717431315	2024-06-03 17:21:15.175183	301.26	42	1014	301.48	303.74	298.49	\N	\N	\N	\N	1717406754	1717460558	-14400	10000	clear sky	01d	800	Clear	0	0	3.09
\.


--
-- TOC entry 3507 (class 2606 OID 16847)
-- Name: weather_data weather_data_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.weather_data
    ADD CONSTRAINT weather_data_pkey PRIMARY KEY (id);


-- Completed on 2024-06-03 17:22:55 IST

--
-- PostgreSQL database dump complete
--


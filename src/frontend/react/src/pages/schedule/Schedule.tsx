import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./schedule.css";
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from "../../utils/constants";
import Btn_List from "../../components/list/Btn_List";
import List from "../../components/list/List";
import { ListContext } from "../../contexts/ListContext";
import Btn_Close_Left from "../../components/Btn_Close_Left";
import ScheduleCard from "../../components/schedule/ScheduleCard";
import {
  useTheme,
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import moment from "moment";
import Map_Schedule from "../../components/schedule/Map_Schedule";
import LoginComponent from "../../components/users/LoginComponent"; // Import the LoginComponent
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import { theme } from "antd";
import RegisterComponent from "../../components/users/RegisterComponent";
import { useUpdateLeftWidth, useUpdateNavbarHeight } from "../../utils/useResponsiveSizes";

const Schedule: React.FC = () => {
  const {
    showList,
    toggleList,
    closeList,
    isLeftPanelVisible,
    toggleLeftPanel,
    planData,
  } = useContext(ListContext);
  const initialDate = planData ? Object.keys(planData)[0] : null;
  const [currentDate, setCurrentDate] = useState<string | null>(initialDate);
  const [events, setEvents] = useState<any[]>(
    initialDate ? planData[initialDate] : []
  );
  const [weather, setWeather] = useState<any | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [busynessData, setBusynessData] = useState<any | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<null | any>(null);

  // ----------------------- Save feature Start -----------------------
  const themeOrange = useTheme();
  const [loginOpen, setLoginOpen] = useState(false); // State for the login modal
  const [isLoginMode, setIsLoginMode] = useState(true);
  const isLoggedIn = Boolean(localStorage.getItem("token")); // Check if the user is logged in
  const navigate = useNavigate();
  // ----------------------- Save feature End -----------------------

  useEffect(() => {
    if (currentDate) {
      setEvents(planData[currentDate] || []);
      fetchWeather(currentDate);
      setSelectedEvent(null); // Reset selected event when date changes
    }
  }, [planData, currentDate]);

  useEffect(() => {
    if (events.length > 0) {
      const firstEventStartTime = events[0].startTime;
      handleStartTimeClick(firstEventStartTime);
    }
  }, [events]);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
    setEvents(planData[date] || []);
    setSelectedEvent(null); // Reset selected event when date changes
  };

  const handleStartTimeClick = async (startTime: string) => {
    setSelectedTime(startTime);
    const date = moment(startTime).format("YYYY-MM-DD");
    await fetchBusynessData(date);
  };

  const formatDayOfWeek = (date: string) => {
    return moment(date).format("ddd");
  };

  const fetchWeather = async (date: string) => {
    setLoadingWeather(true);
    try {
      const response = await fetch(`/api/weather/by_date/${date}`);
      const data = await response.json();
      setWeather(data[0]);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
    setLoadingWeather(false);
  };

  const fetchBusynessData = async (date: string) => {
    try {
      const response = await fetch(
        `/api/busyness/predict_all_sort_by_date_range?startDate=${date}&endDate=${date}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: date,
            endDate: date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("busyness data", data);

      setBusynessData(data);
    } catch (error) {
      console.error("Failed to fetch busyness data:", error);
    }
  };

  if (!planData) {
    return <div>Loading...</div>;
  }

  // ----------------------- Save feature Start -----------------------
  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      // Save the schedule
    }
  };

  const handleSwitch = () => {
    setIsLoginMode(!isLoginMode);
  };


  // ----------------------- Save feature End -----------------------

  useUpdateLeftWidth();
  useUpdateNavbarHeight();




  return (
    <div
      className="schedule"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {isLeftPanelVisible && (
        <div
          className="left"
          style={{
            width: LEFT_WIDTH,
            padding: "0.5vw 2vw 0vw 2vw",
            marginTop: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box mb={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                align="left"
                sx={{ 
                  fontFamily: '"Lexend", sans-serif',
                  fontSize: {
                    xs: '14px', 
                    sm: '16px',  
                    md:'20px'
                  }
                 }}
              >
                {moment(currentDate).format("Do MMMM YYYY, dddd")}
              </Typography>

              {/* ----------------------- Save feature Start ----------------------- */}
              {(!isLoggedIn && (
                <Tooltip title="Log in to save your schedule">
                  <IconButton
                    onClick={handleSaveClick}
                    className="glowing-save-button"
                  >
                    <SaveIcon
                      style={{ color: themeOrange.palette.primary.main }}
                    />
                  </IconButton>
                </Tooltip>
              )) || (
                <Tooltip title="Don't forget to save your Schedule !!">
                  <IconButton
                    onClick={handleSaveClick}
                    className="glowing-save-button"
                  >
                    <SaveIcon
                      style={{ color: themeOrange.palette.primary.main }}
                    />
                  </IconButton>
                </Tooltip>
              )}
              {/* ----------------------- Save feature End ----------------------- */}


              <Box
                display="flex"
                alignItems="center"
                style={{ minHeight: "70px" }}
              >
                {loadingWeather ? (
                  <CircularProgress size={24} />
                ) : weather ? (
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 300,
                        fontFamily: "Lexend",
                        marginRight: 0,
                        fontSize: {
                          xs: '14px', 
                          sm: '16px',
                          md:'18px'  
                        }
                      }}
                    >
                      {weather.tempDay}°C
                    </Typography>


                    <Box 
  component="img"
  src={`http://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
  alt={weather.weather_description}
  sx={{ 
    marginRight: 0,
    height: { xs: '50px', sm: '60px',md:'70px' } 
  }}
/>

                    <Box sx={{display:{xs:'none',sm:'none',md:'block'}}}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 250,
                          fontFamily: "Lexend",
                          fontSize: "12px",
                       
                        }}
                      >
                        Wind: {weather.speed.toFixed(1)} m/s
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: 250,
                          fontFamily: "Lexend",
                          fontSize: "12px",
                        }}
                      >
                        Humidity: {weather.humidity}%
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "normal", fontFamily: "Lexend" }}
                  >
                    No weather data
                  </Typography>
                )}
              </Box>
            </Stack>

            {/* ----------------------- Save feature Start LoginComponent ----------------------- */}
            {isLoginMode ? (
              <LoginComponent
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSwitch={handleSwitch}
              />
            ) : (
              <RegisterComponent
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSwitch={handleSwitch}
              />
            )}
            {/* ----------------------- Save feature End ----------------------- */}
          </Box>

          <Stack direction="row" spacing={1} mb={3}>
            {Object.keys(planData).map((date) => (
              <Button
                key={date}
                onClick={() => handleDateChange(date)}
                style={{
                  backgroundColor: date === currentDate ? "orange" : "#f8f8f8",
                  color: date === currentDate ? "#fff" : "#888",
                  // borderRadius: "20px",
                  // padding: "8px 16px",
                  // minWidth: "60px",
                  // minHeight: "65px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}

                sx={{

                  minWidth:{xs:'50px',sm: "55px",md: "60px"},
                  minHeight: {xs:'50px',sm: "60px",md: "65px"},
                  padding: {xs:'10px 8px',sm:"8px 10px",md:"8px 16px"},
                  borderRadius: {xs:'14px',sm:"18px",md:'20px'},
                }}
              >
                <Typography
                  variant="caption"
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Lexend",
                    lineHeight: 1,
                  }}
                >
                  {formatDayOfWeek(date)}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 400,
                    fontFamily: "Lexend",
                    // fontSize: "1.5em",
                    lineHeight: 1,
                  }}

                  sx={{fontSize:{xs:'1.3em',sm: "1.4em",md: "1.5em"}}}
                >
                  {moment(date).format("DD")}
                </Typography>
              </Button>
            ))}



            
          </Stack>

          <div
            className="card-container"
            style={{
              flexGrow: 1,
              overflowY: "scroll",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <style>
              {`
                .card-container::-webkit-scrollbar {
                  display: none; 
                }
              `}
            </style>
            {events.map((item, index) => (
              <ScheduleCard
                key={item.id}
                id={item.id}
                name={item.name}
                startTime={item.startTime}
                endTime={item.endTime}
                latitude={item.latitude}
                longitude={item.longitude}
                busyness={item.busyness}
                category={item.category}
                address={item.address}
                website={item.website}
                description={item.description}
                rating={item.rating}
                attraction_phone_number={item.attraction_phone_number}
                international_phone_number={item.international_phone_number}
                event_image={item.event_image}
                event={item.event}
                free={item.free}
                userRatings_total={item.userRatings_total}
                index={index + 1}
                onStartTimeClick={handleStartTimeClick}
                highlightedStartTime={selectedTime}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="map"
        style={{
          position: "fixed",
          top: NAVBAR_HEIGHT,
          right: 0,
          width: isLeftPanelVisible ? `calc(100% - ${LEFT_WIDTH})` : "100%",
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        <Map_Schedule
          events={events}
          busynessData={busynessData}
          selectedTime={selectedTime}
          selectedEvent={selectedEvent} // Pass the selectedEvent state
          setSelectedEvent={setSelectedEvent} // Pass the setSelectedEvent function
        />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Schedule;

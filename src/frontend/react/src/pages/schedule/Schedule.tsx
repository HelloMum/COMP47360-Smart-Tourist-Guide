// Schedule.tsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./schedule.css";
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from "../../utils/constants";
import Btn_List from "../../components/list/Btn_List";
import List from "../../components/list/List";
import { ListContext } from "../../contexts/ListContext";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
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
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import { theme } from "antd";
import { useUpdateLeftWidth, useUpdateNavbarHeight } from "../../utils/useResponsiveSizes";
import WeatherComponent from "../../components/schedule/WeatherComponent"; 

const Schedule: React.FC = () => {
  const {
    showList,
    toggleList,
    closeList,
    isLeftPanelVisible,
    toggleLeftPanel,
    planData,
    selectedDates,
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
  const { isLoggedIn } = useAuth(); // Use the context
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
  const downloadJSON = (data, filename) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSavePlan = async () => {
    if (!planData || !selectedDates || !selectedDates[0] || !selectedDates[1]) {
      console.error("Error: Plan data or selected dates are missing.");
      return;
    }

    const saveData = {
      planData,
      startDate: selectedDates[0].format("YYYY-MM-DD"),
      endDate: selectedDates[1].format("YYYY-MM-DD"),
      token: localStorage.getItem("token")
    };

    // Trigger the download of the JSON file
    // downloadJSON(saveData, "planData.json");
    console.log("Data to be sent to backend:", saveData);

    try {
      const response = await fetch("/api/itinerary/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log("Plan saved successfully:", result);
    } catch (error) {
      console.error("Error saving plan to backend:", error);
    }
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      // Trigger avatar click to open the login modal
      triggerAvatarClick();
    } else {
      // Save the schedule
      handleSavePlan();
    }
  };

  const triggerAvatarClick = () => {
    const avatarButton = document.getElementById("avatarButton");
    if (avatarButton) {
      avatarButton.click();
    }
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
            zIndex:5,
            backgroundColor:'white'
          }}
        >
          <Box mb={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              {/*--------------------- date ---------------------------*/}
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

              <WeatherComponent weather={weather} loadingWeather={loadingWeather} />

            </Stack>
          </Box>

          <Stack direction="row" spacing={1} mb={3}>
            {Object.keys(planData).map((date) => (
              <Button
                key={date}
                onClick={() => handleDateChange(date)}
                style={{
                  backgroundColor: date === currentDate ? "orange" : "#f8f8f8",
                  color: date === currentDate ? "#fff" : "#888",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                sx={{
                  minWidth:{xs:'43px',sm: "55px",md: "60px"},
                  minHeight: {xs:'40px',sm: "60px",md: "65px"},
                  padding: {xs:'10px 8px',sm:"8px 10px",md:"8px 16px"},
                  borderRadius: {xs:'12px',sm:"18px",md:'20px'},
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
          width: 
          isLeftPanelVisible ? `
          calc(100% - ${LEFT_WIDTH})` : "100%",

          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        <Map_Schedule
          events={events}
          busynessData={busynessData}
          selectedTime={selectedTime}
          selectedEvent={selectedEvent} // Pass the selectedEvent state
          setSelectedEvent={setSelectedEvent}
          showList={showList} // Pass the setSelectedEvent function
          isLeftPanelVisible={isLeftPanelVisible}
        />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Schedule;

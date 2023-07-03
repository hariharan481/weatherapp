import { ExpandMore } from "@mui/icons-material";
import "./Forecast.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { color } from "@mui/system";

const Forecast = ({ city, forecast: { forecastday } }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(forecastday);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="foreacastsection">
      Forecast for {city}
      {forecastday.map((curForecast) => {
        const { date, hour, day } = curForecast;
        const {
          maxtemp_c,
          mintemp_c,
          daily_chance_of_rain,
          condition: { icon, text },
        } = day;
        return (
          <Accordion
            className="acc"
            expanded={expanded === date}
            onChange={handleChange(date)}
            sx={{ marginTop: "10px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1bh-content"
              id={date}
            >
              <img src={icon} />
              <Typography sx={{ width: "33%", flexShrink: 0, color: "white" }}>
                {date}({text})
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0, color: "white" }}>
                <b>Temp</b> {mintemp_c} deg to{maxtemp_c}deg
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0, color: "white" }}>
                <b>{daily_chance_of_rain}</b>% of rain possible
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hour.map((curforhour, index) => {
                return (
                  <div className="hourtrack">
                    <b>{index}:00</b>
                    <img src={curforhour.condition.icon} />
                    <div className="progressbar">
                      <LinearProgress
                        variant="determinate"
                        value={(curforhour.temp_c * 100) / maxtemp_c}
                      ></LinearProgress>
                      {curforhour.temp_c}deg
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Forecast;

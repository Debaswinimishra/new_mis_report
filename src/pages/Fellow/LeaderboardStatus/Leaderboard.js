import React, { useEffect, useState } from "react";
import { getLeaderboardReport } from "./LeaderboardApi"; // Adjust the path if needed
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardData = await getLeaderboardReport();
        console.log("leaderboardData", leaderboardData);

        // Assuming leaderboardData contains an array of objects with a structure like:
        // [{ year: "2024", month: "7", leaderboarddata: [...] }]
        const formattedData = leaderboardData.map((item) => ({
          ...item,
          year: item.year.toString(),
          month: item.month.toString(),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      }
    };
    fetchData();
  }, [year, month]);

  // Filter data based on selected year and month
  const filteredData = data.filter(
    (item) => item.year === year.toString() && item.month === month.toString()
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        boxShadow: 3,
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#3f51b5" }}
      >
        LEADERBOARD REPORT
      </Typography>

      {/* Year and Month Dropdown */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              sx={{
                backgroundColor: "#e8f0fe",
                borderRadius: "8px",
                "& .MuiSelect-icon": { color: "#3f51b5" },
              }}
            >
              {[2024, 2025].map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              labelId="month-label"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              sx={{
                backgroundColor: "#e8f0fe",
                borderRadius: "8px",
                "& .MuiSelect-icon": { color: "#3f51b5" },
              }}
            >
              {months.map((m, index) => (
                <MenuItem key={index} value={index + 1}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Accordion for Leaderboard Data */}
      {filteredData.length ? (
        filteredData.map((item, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
                textAlign: "center",
                color: "#3f51b5",
              }}
            >
              Leaderboard for {months[item.month - 1]} {item.year}
            </Typography>
            {item?.leaderboarddata.map((user, i) => (
              <Accordion
                key={i}
                sx={{
                  backgroundColor: "#e3f2fd",
                  mb: 2,
                  borderRadius: "8px",
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 5,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}-content`}
                  id={`panel${i}-header`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    backgroundColor: "#e3f2fd",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      flexGrow: 1,
                      color: "#3f51b5",
                    }}
                  >
                    {i + 1}. {user?.username}
                  </Typography>
                  <Box
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      ml: 3,
                      backgroundColor: "#ffffff",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      boxShadow: 1,
                    }}
                  >
                    Rank: {user?.finalrank}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      boxShadow: 2,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ padding: 3 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>User ID:</strong> {user.userid}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Manager:</strong> {user.managername}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>District:</strong> {user.districtname}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Block:</strong> {user.blockname}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Time Spent:</strong> {user.spent_time} min
                      </Typography>
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))
      ) : (
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "gray", fontStyle: "italic" }}
        >
          No data available for this month and year.
        </Typography>
      )}
    </Container>
  );
};

export default Leaderboard;

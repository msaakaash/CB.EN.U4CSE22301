import React, { useEffect, useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import HeatMap from '../components/HeatMap';

function HeatmapPage() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(15);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/correlation?minutes=${interval}`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [interval]);

  return (
    <Box>
      <Typography variant="h5">Correlation Heatmap (last {interval} minutes)</Typography>
      <FormControl fullWidth style={{ marginTop: 20, marginBottom: 20 }}>
        <InputLabel>Time Interval (minutes)</InputLabel>
        <Select value={interval} onChange={(e) => setInterval(e.target.value)}>
          {[5, 15, 30, 60].map((val) => (
            <MenuItem value={val} key={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <HeatMap data={data} />
    </Box>
  );
}

export default HeatmapPage;
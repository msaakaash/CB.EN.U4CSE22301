import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import axios from 'axios';

function StockPage() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(15);
  const [avg, setAvg] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stocks?minutes=${interval}`);
    setData(res.data.data);
    setAvg(res.data.average);
  };

  useEffect(() => {
    fetchData();
  }, [interval]);

  return (
    <>
      <Typography variant="h5">Stock Price Chart (last {interval} minutes)</Typography>
      <FormControl fullWidth style={{ marginTop: 20, marginBottom: 20 }}>
        <InputLabel>Time Interval (minutes)</InputLabel>
        <Select value={interval} onChange={(e) => setInterval(e.target.value)}>
          {[5, 15, 30, 60].map((val) => (
            <MenuItem value={val} key={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <ReferenceLine y={avg} label="Avg" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </>
  );
}

export default StockPage;
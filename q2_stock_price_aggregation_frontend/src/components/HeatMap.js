import React from 'react';
import { Box, Tooltip } from '@mui/material';

function HeatMap({ data }) {
  if (!data || data.length === 0) return <div>No Data</div>;

  const colors = [
    '#d73027', '#fc8d59', '#fee08b',
    '#d9ef8b', '#91cf60', '#1a9850'
  ];

  const getColor = (value) => {
    const idx = Math.floor((value + 1) * (colors.length - 1) / 2);
    return colors[Math.max(0, Math.min(idx, colors.length - 1))];
  };

  return (
    <Box display="grid" gridTemplateColumns={`repeat(${data.length + 1}, 60px)`}>
      <Box></Box>
      {data.map((row, i) => (
        <Box key={`col-head-${i}`} textAlign="center">{row.label}</Box>
      ))}
      {data.map((row, i) => (
        <React.Fragment key={`row-${i}`}>
          <Box textAlign="center">{row.label}</Box>
          {row.values.map((val, j) => (
            <Tooltip key={`cell-${i}-${j}`} title={`Corr: ${val.toFixed(2)}`}>
              <Box height="40px" bgcolor={getColor(val)}></Box>
            </Tooltip>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default HeatMap;
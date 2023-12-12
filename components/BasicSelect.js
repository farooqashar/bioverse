import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function BasicSelect({ ticket }) {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusSubmit = async () => {
    const PORT = process.env.PORT || 3002;
    let result = await fetch(`http://localhost:${PORT}/tickets`, {
      method: "post",
      body: JSON.stringify({
        _id: ticket._id,
        newValue: status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"In Progress"}>In Progress</MenuItem>
          <MenuItem value={"Resolved"}>Resolved</MenuItem>
        </Select>
        <a href="/" onClick={() => alert("Status updated!")}><Button onClick={handleStatusSubmit} size="small">
          Update Status
        </Button></a>
      </FormControl>
    </Box>
  );
}

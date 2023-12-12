import clientPromise from "../lib/mongodb";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BasicSelect from "../components/BasicSelect.js";
import Head from "next/head";
import CustomModal from "../components/CustomModal.js";

export default function AdminNew({ tickets }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Head>
        <title>Help Desk App</title>
        <style>{"body { background-color: #fff5ee; }"}</style>
      </Head>
      <Box component="span" m={1}>
        <center>
          <Box>
            <a href="/">
              <Button variant="contained" color="secondary">
                Home
              </Button>
            </a>
          </Box>
          <a href="/admin">
            <Button variant="text" color="secondary">
              View All Tickets
            </Button>
          </a>
          <a href="/admin_new">
            <Button variant="text" color="secondary">
              View New Tickets
            </Button>
          </a>
          <a href="/admin_progress">
            <Button variant="text" color="secondary">
              View In Progress Tickets
            </Button>
          </a>
          <a href="/admin_resolved">
            <Button variant="text" color="secondary">
              View Resolved Tickets
            </Button>
          </a>
        </center>
      </Box>
      <center>
        <h1>Admin Page</h1>
      </center>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {tickets.map((ticket, index) => (
            <Grid item xs={4} key={index}>
              <Card style={{ flex: 1, backgroundColor: "#eeffee" }}>
                <center>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Ticket
                    </Typography>
                    <Typography variant="h5" component="div">
                      {ticket.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {ticket._id}
                    </Typography>
                    <Typography variant="body2">
                      Status: {ticket.status}
                    </Typography>
                  </CardContent>
                  <Box>
                    <CustomModal ticket={ticket} />
                    <Button
                      onClick={() => alert("Email sent to the user!")}
                      size="small"
                    >
                      Email
                    </Button>
                  </Box>

                  <Box>
                    <BasicSelect ticket={ticket} />
                  </Box>
                </center>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("support");
    const tickets = await db
      .collection("tickets")
      .find({ status: "New" })
      .toArray();

    return {
      props: { tickets: JSON.parse(JSON.stringify(tickets)) },
    };
  } catch (e) {
    console.error(e);
  }
}

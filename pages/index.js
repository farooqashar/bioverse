import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "formik-mui";

export const getServerSideProps = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }) {
  const initialValues = {
    name: "",
    email: "",
    problem: "",
  };

  const defaultTheme = createTheme();

  const handleSubmit = async (values) => {
    const PORT = process.env.PORT || 3002;
    let result = await fetch(`http://localhost:${PORT}/tickets`, {
      method: "post",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        problem: values.problem,
        status: "New",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="container">
      <Head>
        <title>Help Desk App</title>
      </Head>

      <main>
        {isConnected
          ? console.log("connected to MongoDB")
          : console.log("not connected to MongoDB")}

        <a href="/admin">
          <Button variant="contained" color="secondary">
          Admin Section
          </Button>
        </a>

        <h2>
          Welcome to Help Desk. Please utilize the section below to report any
          tickets that need a resolution. If you are an admin, please refer to
          the Admin Section. Here's to great outcomes! 
        </h2>
        <b>EDIT(Mon, December 11th): The Vercel deployment is not the latest/working properly. The project can be run locally. <a href="https://github.com/farooqashar/bioverse">README</a></b>
        <center>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Submit a Help Ticket
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                      <Field
                        autoComplete="Name"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        component={TextField}
                        placeholder="Name"
                        name="name"
                        type="text"
                      />
                      <ErrorMessage name="name" />
                      <Field
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        component={TextField}
                        placeholder="Email"
                        name="email"
                        type="email"
                      />
                      <ErrorMessage name="email" />
                      <Field
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        component={TextField}
                        placeholder="Problem Description"
                        name="problem"
                        type="text"
                        multiline
                      />
                      <ErrorMessage name="problem" />
                      <Button onClick={() => alert("Ticket Submitted!")} variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Formik>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </center>
      </main>
    </div>
  );
}

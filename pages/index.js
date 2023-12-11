import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const getServerSideProps = async () => {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}) {

  const initialValues = {
    name: "",
    email: "",
    problem: ""
  };

  const handleSubmit = async (values) => {
    let result = await fetch(
      'http://localhost:3002/tickets', {
          method: "post",
          body: JSON.stringify({name: values.name,
            email: values.email,
            problem: values.problem, 
            status: 'New' }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      result = await result.json();
      console.warn(result);
  }

  return (
    <div className="container">
      <Head>
        <title>Help Desk App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        {isConnected ? (
          console.log("connected to MongoDB")
        ) : (
          console.log("not connected to MongoDB")
        )}

      <a href="/admin">Admin Page</a>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field placeholder="name" name="name" type="text" />
        <ErrorMessage name="name" />
        <Field placeholder="email" name="email" type="email" />
        <ErrorMessage name="email" />
        <Field placeholder="problem" name="problem" type="text" />
        <ErrorMessage name="problem" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>

      </main>

    </div>
  )
}

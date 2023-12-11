import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Formik, Form, Field, ErrorMessage } from 'formik';


type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const initialValues = {
    name: "",
    email: "",
    problem: ""
  };

  const handleSubmit = async (values) => {
    // const client = await clientPromise;
    // const db = client.db("support");

    // db.tickets.insert({name: values.name, email: values.email, problem: values.problem, status: "New"})

    console.log("values", values);
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

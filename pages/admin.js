import clientPromise from "../lib/mongodb";

export default function Admin({ tickets }) {
    console.log("Admin", tickets)
    return (
        <div>
            <h1>Admin Page</h1>
            <p>
                <small>Help Desk App</small>
            </p>
                {tickets.map((ticket, index) => (
                    <div key={index}>
                        <h2>{ticket.name}</h2>
                        <h3>{ticket.email}</h3>
                        <p>{ticket.problem}</p>
                        <p>{ticket.status}</p>
                    </div>
                ))}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("support");

        const tickets = await db
            .collection("tickets")
            .find({})
            .toArray();

        return {
            props: { tickets: JSON.parse(JSON.stringify(tickets)) },
        };
    } catch (e) {
        console.error(e);
    }
}
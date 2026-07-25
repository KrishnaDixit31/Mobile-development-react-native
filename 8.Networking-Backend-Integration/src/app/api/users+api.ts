import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM user_data", // NOTE: Ensure this matches your actual table name in Turso (user_data or users)
    });
      return Response.json({ users: result.rows });
  } catch (error) {
    console.error("GET API Error:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const { name, password } = await request.json();

    if (!name || !password) {
      return Response.json(
        { error: "Name and Password are Required" },
        { status: 400 }
      );
    }

    const result = await db.execute({
      sql: "INSERT INTO user_data (name, password) VALUES (?, ?)",
      args: [name, password],
    });

    return Response.json(
      { id: result.lastInsertRowid?.toString(), name, password },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST API Error:", error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
};

export const  DELETE=async(_req: Request, { params })=>{
  await db.execute({
    sql: 'DELETE FROM users WHERE id = ?',
    args: [params.id],
  });
  return Response.json({ deleted: true });
}
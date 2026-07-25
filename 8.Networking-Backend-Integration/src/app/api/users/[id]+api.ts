import { db } from "@/lib/db";

export const GET = async (_req, { id }) => {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM user_data WHERE id = ?", // NOTE: Ensure this matches your actual table name in Turso (user_data or users)
      args: [id],
    });
    if (result.rows.length === 0)
      return Response.json({ error: 'User not found' }, { status: 404 });
    return Response.json({ users: result.rows });
  } catch (error) {
    console.error("GET API Error:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

export const PATCH = async (request, { id }) => {
  try {
    const { name, password } = await request.json();

    if (!name && !password) {
      return Response.json(
        { error: "At least 'name' or 'password' is required to update" },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const args: any[] = [];

    if (name !== undefined) {
      updates.push("name = ?");
      args.push(name);
    }
    if (password !== undefined) {
      updates.push("password = ?");
      args.push(password);
    }

    args.push(id);

    const result = await db.execute({
      sql: `UPDATE user_data SET ${updates.join(", ")} WHERE id = ?`,
      args: args,
    });

    if (result.rowsAffected === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("PATCH API Error:", error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
};
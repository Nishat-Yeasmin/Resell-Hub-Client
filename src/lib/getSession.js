import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function getSession() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    const user = verify(token, process.env.JWT_SECRET);

    return {
      user,
    };
  } catch (err) {
    return null;
  }
}
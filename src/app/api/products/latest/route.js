import clientPromise from "@/lib/mongo";
import { PRODUCT_COLLECTION } from "@/models/Product";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.AUTH_DB_NAME);

    const products = await db
      .collection(PRODUCT_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .toArray();

    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
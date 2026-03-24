import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");

  if (!keyword) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ message: "Search failed" }, { status: 500 });
  }
}

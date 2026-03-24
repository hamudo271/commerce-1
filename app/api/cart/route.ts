import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ items: [] }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json({ items: user?.cartItems || [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId: user.id, productId },
  });

  if (existingItem) {
    const updated = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
    return NextResponse.json(updated);
  }

  const newItem = await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId,
      quantity,
    },
  });

  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cartItemId = searchParams.get("id");

  if (cartItemId) {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  } else {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      await prisma.cartItem.deleteMany({
        where: { userId: user.id },
      });
    }
  }

  return NextResponse.json({ message: "Deleted" });
}

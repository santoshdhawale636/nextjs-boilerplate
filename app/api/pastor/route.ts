import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newRole = await prisma.pastorRole.create({
      data: {
        churchName: body.churchName,
        location: body.location,
        roleType: body.roleType,
        description: body.description,
        contact: body.contact,
        expiresAt: null,
      },
    });

    return NextResponse.json(newRole);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create role" },
      { status: 500 }
    );
  }
}


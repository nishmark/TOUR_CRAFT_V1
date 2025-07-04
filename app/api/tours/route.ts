import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const tours = await prisma.tcTour.findMany({
      where: {
        userId: userId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        totalSteps: true,
        createdAt: true,
        updatedAt: true,
        motherUrl: true,
        steps: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      tours: tours,
      count: tours.length,
    });
  } catch (error) {
    console.error("❌ Error fetching tours:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch tours",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

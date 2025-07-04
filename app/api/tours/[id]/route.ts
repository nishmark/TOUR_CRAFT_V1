import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    // First, check if the tour exists
    const existingTour = await prisma.tcTour.findUnique({
      where: { id },
    });

    if (!existingTour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    // Delete the tour (this will cascade delete the steps due to the foreign key relationship)
    await prisma.tcTour.delete({
      where: { id },
    });

    console.log(`✅ Tour ${id} deleted successfully`);

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
      tourId: id,
    });
  } catch (error) {
    console.error("❌ Error deleting tour:", error);

    return NextResponse.json(
      {
        error: "Failed to delete tour",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
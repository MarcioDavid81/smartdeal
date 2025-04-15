import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const products = await db.product.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

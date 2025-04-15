import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'
import { db } from '@/lib/prisma';
import ProductsList from './_components/ProductsList';
import OrdersList from './_components/OrdersList';
import CustomersList from './_components/CustomersList';

export const metadata: Metadata = {
    keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
    description: "O seu sistema de gestão da comercial e logística",
    authors: [
      { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
    ],
  };

export default async function Dashboard() {

    const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

    const products = await db.product.findMany({
        where: { userId },
        orderBy: { name: "asc" },
    })
    const orders = await db.order.findMany({
        where: { userId },
        orderBy: { date: "desc" },
    })
    const customers = await db.customer.findMany({
        where: { userId },
        orderBy: { name: "asc" },
    })

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Dashboard</h1>
        <ProductsList products={products} />
        <OrdersList orders={orders} />
        <CustomersList customers={customers} />
      </div>
    );
  }

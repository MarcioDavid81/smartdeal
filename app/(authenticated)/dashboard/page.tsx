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
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        <div className="min-h-screen  w-full flex bg-gray-50">
          <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
            <h1>Dashboard</h1>
            <ProductsList products={products} />
            <OrdersList orders={orders} />
            <CustomersList customers={customers} />
          </main>
        </div>
      </div>
    );
  }

// app/dashboard/(overview)/page.tsx
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { audiowide } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

export default function Page() {
  return (
    <main className="px-6 py-6 md:px-8 lg:px-10">
      {/* Title Bar */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className={`${audiowide.className} text-2xl md:text-3xl`}>Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Overview of revenue and recent activity
          </p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
            Live
          </span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <section aria-labelledby="kpis" className="mb-8">
        <h2 id="kpis" className="sr-only">
          Key performance indicators
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
      </section>

      {/* Charts + Latest Invoices */}
      <section
        aria-labelledby="charts"
        className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"
      >
        <h2 id="charts" className="sr-only">
          Charts and latest invoices
        </h2>

        <div className="rounded-2xl border bg-white p-4 shadow-sm md:col-span-4 lg:col-span-5">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm md:col-span-4 lg:col-span-3">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoices />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

// app/ui/dashboard/cards.tsx
import type { ComponentType, SVGProps } from 'react';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

type CardType = 'invoices' | 'customers' | 'pending' | 'collected';
type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<CardType, IconComp> = {
  collected: BanknotesIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  customers: UserGroupIcon,
};

const LABELS: Record<CardType, string> = {
  collected: 'Total Collected',
  pending: 'Pending Payment',
  invoices: 'Total Invoices',
  customers: 'Total Customers',
};

const ACCENT: Record<CardType, string> = {
  collected: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  invoices: 'bg-blue-50 text-blue-700 ring-blue-200',
  customers: 'bg-purple-50 text-purple-700 ring-purple-200',
};

// Formatting helpers
const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const INT = new Intl.NumberFormat('en-US');

function toNumber(raw: number | string): number {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const n = Number(raw.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
function display(type: CardType, raw: number | string): string {
  const n = toNumber(raw);
  return type === 'collected' || type === 'pending' ? USD.format(n) : INT.format(n);
}

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <KpiCard type="collected" value={totalPaidInvoices} />
      <KpiCard type="pending" value={totalPendingInvoices} />
      <KpiCard type="invoices" value={numberOfInvoices} />
      <KpiCard type="customers" value={numberOfCustomers} />
    </>
  );
}

function KpiCard({ type, value }: { type: CardType; value: number | string }) {
  const Icon = ICONS[type];

  return (
    <article
      aria-label={LABELS[type]}
      className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm ring-1 ring-gray-200/70 transition hover:shadow-md"
    >
      {/* smaller icon chip */}
      <div
        className={`absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${ACCENT[type]}`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <h3 className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
        {LABELS[type]}
      </h3>

      {/* noticeably smaller KPI value */}
      <p
        className={`${lusitana.className}
          mt-1
          text-lg sm:text-xl md:text-2xl lg:text-3xl
          font-semibold leading-snug tracking-tight
          text-gray-900 tabular-nums
        `}
      >
        {display(type, value)}
      </p>

      <p className="mt-1.5 text-[11px] text-gray-500">
        Updated {new Date().toLocaleDateString()}
      </p>
    </article>
  );
}

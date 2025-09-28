import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

// --- helpers: robust currency formatting ---
const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Accepts number OR strings like "$1,234.00" / "1234.00"
function formatAmount(raw: number | string): string {
  if (typeof raw === 'number') return USD.format(raw);
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/[^0-9.-]/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? USD.format(n) : raw;
  }
  return '$0.00';
}

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>

      <div className="flex grow flex-col justify-between rounded-2xl border bg-white p-4 shadow-sm">
        <ul role="list" className="divide-y">
          {latestInvoices.map((invoice) => (
            <li key={invoice.id} className="flex items-center justify-between py-4">
              {/* Left: avatar + name/email (flexible area, truncates nicely) */}
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={invoice.image_url}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 flex-shrink-0 rounded-full ring-1 ring-gray-200"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 md:text-base">
                    {invoice.name}
                  </p>
                  <p className="truncate text-xs text-gray-500 sm:text-sm">{invoice.email}</p>
                </div>
              </div>

              {/* Right: amount (fixed width, no shrink, aligned) */}
              <span
                className={clsx(
                  `${lusitana.className}`,
                  'ml-4 flex-shrink-0 whitespace-nowrap text-right text-sm font-semibold text-gray-900 tabular-nums md:text-base'
                )}
              >
                {formatAmount(invoice.amount)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center text-gray-500">
          <ArrowPathIcon className="h-5 w-5" />
          <h3 className="ml-2 text-sm">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

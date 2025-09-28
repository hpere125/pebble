'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Side nav items
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ name, href, icon: Icon }) => {
        const active =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={name}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
              `
              group flex h-12 items-center gap-3 rounded-2xl
              px-3 text-sm font-medium
              ring-1 ring-gray-200/70
              transition
              focus:outline-none focus:ring-2 focus:ring-red-500
              md:h-11
              `,
              active
                ? 'bg-red-50 text-red-700 ring-red-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {/* Icon with subtle container */}
            <span
              className={clsx(
                'inline-flex h-8 w-8 items-center justify-center rounded-xl transition',
                active ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden md:inline">{name}</span>
          </Link>
        );
      })}
    </>
  );
}

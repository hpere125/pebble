import { audiowide } from '@/app/ui/fonts';

type Props = {
  className?: string;
};

/**
 * Brand mark for the sidebar header. Kept text-based for easy theming.
 */
export default function AcmeLogo({ className = '' }: Props) {
  return (
    <div
      className={`
        ${audiowide.className}
        flex flex-col leading-none ${className}
      `}
    >
      <p className="text-[34px] font-semibold tracking-tight">Pebble</p>
      <span className="sr-only">Pebble — Task Management</span>
    </div>
  );
}

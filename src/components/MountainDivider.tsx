/** Original Sandia-style ridgeline silhouette used at section transitions. */
export function MountainDivider({ className = "text-panel" }: { className?: string }) {
  return (
    <svg className={`block h-12 w-full sm:h-16 ${className}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 80 L0 62 L120 50 L210 44 L300 30 L380 22 L440 12 L520 8 L600 14 L700 20 L760 18 L860 28 L960 34 L1060 42 L1180 48 L1300 56 L1440 60 L1440 80 Z"
      />
    </svg>
  );
}

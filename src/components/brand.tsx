import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="MatchHub">
      <span className="brand-orbit relative grid size-12 place-items-center">
        <Image src="/brand/playmatch-icon.png" alt="Símbolo do PlayMatch" width={48} height={48} priority className="brand-icon size-12 object-contain" />
      </span>
      {!compact && <span><strong className="block text-xl font-extrabold tracking-tight">PlayMatch</strong><small className="block text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-400">MatchHub</small></span>}
    </div>
  );
}

export default function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 truncate rounded-md bg-[#0B0D12]/70 px-3 py-1 text-center text-xs text-[#F8FAFC]/50">
        {label}
      </div>
    </div>
  );
}
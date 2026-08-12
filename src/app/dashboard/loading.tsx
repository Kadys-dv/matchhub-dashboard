export default function Loading() {
  return <div className="space-y-7 animate-pulse"><div className="h-20 rounded-2xl bg-slate-200" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-40 rounded-2xl bg-slate-200" />)}</div><div className="h-80 rounded-2xl bg-slate-200" /></div>;
}

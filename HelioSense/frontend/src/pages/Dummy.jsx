export default function DummyPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] glass-panel p-10">
      <h1 className="text-4xl font-bold text-slate-200 mb-4">{title}</h1>
      <p className="text-xl text-slate-400 font-mono flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-space-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-space-purple"></span>
        </span>
        Module Under Construction
      </p>
    </div>
  );
}

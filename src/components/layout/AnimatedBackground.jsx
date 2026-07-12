export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="animate-blob absolute -top-32 -left-32 h-96 w-96 rounded-full bg-glow/10 blur-[100px]" />
      <div
        className="animate-blob absolute right-0 bottom-0 h-96 w-96 rounded-full bg-glow-2/10 blur-[100px]"
        style={{ animationDelay: '7s' }}
      />
    </div>
  )
}

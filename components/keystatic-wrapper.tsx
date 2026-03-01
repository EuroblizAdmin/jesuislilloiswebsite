interface KeystaticWrapperProps {
  children: React.ReactNode
}

export function KeystaticWrapper({ children }: KeystaticWrapperProps) {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  )
}

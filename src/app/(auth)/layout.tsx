import { Logo } from '@/components/logo'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <Logo />
      {children}
    </div>
  )
}

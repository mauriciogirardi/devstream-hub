import { Loader } from 'lucide-react'

type LoadingVideoProps = {
  label: string
}

export function LoadingVideo({ label }: LoadingVideoProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader className="size-10 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

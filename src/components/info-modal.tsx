import { ChangeEvent, FormEvent, useState, useTransition } from 'react'

type InfoModalProps = {
  initialName: string
  initialThumbnailUrl: string | null
}

export function InfoModal({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(initialName)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(() => {})
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return <form></form>
}

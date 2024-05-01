type UPageProps = {
  params: {
    username: string
  }
}

export default function UPage({ params }: UPageProps) {
  return (
    <div>
      <p>user: {params.username}</p>
    </div>
  )
}

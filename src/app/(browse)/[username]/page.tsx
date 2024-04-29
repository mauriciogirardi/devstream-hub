type UsernamePageProps = {
  params: {
    username: string
  }
}

export default function UsernamePage({ params }: UsernamePageProps) {
  return (
    <div>
      <h1>username {params.username}</h1>
    </div>
  )
}

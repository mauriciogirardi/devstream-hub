import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { createViewerToken } from '@/actions/token'

export function useViewerToken(hostIdentity: string) {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [identity, setIdentity] = useState('')

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity)
        setToken(viewerToken)

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string
        }

        const name = decodedToken?.name
        const identity = decodedToken.jti

        name && setName(name)
        identity && setIdentity(identity)
      } catch {
        toast.error('Something went wrong!')
      }
    }

    createToken()
  }, [hostIdentity])

  return {
    name,
    identity,
    token,
  }
}

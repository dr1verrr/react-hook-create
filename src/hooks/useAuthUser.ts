import { queryClient } from 'App'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { getCurrentUser } from 'app/auth'
import { idTokenListener } from 'listeners'

const useAuthUser = () => {
  const [isLoading, setLoading] = useState(false)
  const query = useQuery('user', getCurrentUser)
  const [user, setUser] = useState<User | null>()
  const [isUserChecked, setUserChecked] = useState(false)

  useEffect(() => {
    setUser(query.data)
    setUserChecked(true)
    setLoading(!query.data ? true : false)
  }, [query.data])

  useEffect(() => {
    if (isUserChecked && !user) {
      const unsubscribe = idTokenListener(user => {
        setUser(user)
        queryClient.setQueryData('user', user)
        if (isLoading) setLoading(false)
      })
      return () => unsubscribe()
    }
  }, [isUserChecked])

  return { user, isLoading, refetch: query.refetch }
}

export default useAuthUser

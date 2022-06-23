/* eslint-disable react-hooks/exhaustive-deps */
import { queryClient } from 'App'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { UseQueryResult, useQuery } from 'react-query'

import { getCurrentUser } from 'app/auth'
import { idTokenListener } from 'listeners'

export type UserQuery = {
  user: User | null | undefined
  isLoading: boolean
  query: UseQueryResult<User | null>
}

const useAuthUser = (): UserQuery => {
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

  return { user, isLoading, query }
}

export default useAuthUser

import { useEffect, useState } from 'react'

export function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (error) {
      // @ts-ignore
      setError(error instanceof Error ? error.message : new Error('An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
    setLoading(true)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, error, loading, refetch: fetchData, reset }
}

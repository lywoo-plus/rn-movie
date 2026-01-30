import { useEffect, useState } from 'react'

export function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'))
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
    setLoading(false)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, error, loading, refetch: fetchData, reset }
}

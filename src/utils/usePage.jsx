import { useEffect, useState } from 'react'

// Hook for make loading and error message
export function usePageState(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      setLoading(false)
    }
  }, [error])
  return { loading, setLoading, error, setError }
}

// Hook for make loading and error message
export function usePageFetch(promise, initialData = null, dependencies = []) {
  const { loading, setLoading, error, setError } = usePageState()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const data = await promise()
        console.log({ data })
        setData(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, dependencies)

  return { data, loading, setLoading, error, setError }
}
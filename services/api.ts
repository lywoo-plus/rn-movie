export const TMDB_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

// ;('discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')

export async function fetchMovies({ query }: { query: string }) {
  const url = query
    ? `${TMDB_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.baseUrl}/discover/movie?sort_by=popularity.desc`

  const res = await fetch(url, {
    method: 'get',
    headers: TMDB_CONFIG.headers,
  })

  if (!res.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch data', res.statusText)
  }

  const data = await res.json()

  return (data.results ?? []) as Movie[]
}

export async function fetchTrendingMovies() {
  const url = `${TMDB_CONFIG.baseUrl}/movie/popular?page=1&offset=3`

  const res = await fetch(url, {
    method: 'get',
    headers: TMDB_CONFIG.headers,
  })

  if (!res.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch data', res.statusText)
  }

  const data = await res.json()

  return (data.results ?? []) as Movie[]
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}/movie/${movieId}?api_key=${TMDB_CONFIG.apiKey}`,
      {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

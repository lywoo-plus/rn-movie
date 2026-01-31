import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

import { fetchMovies } from '@/services/api'

import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { useFetch } from '@/services/useFetch'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false)

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies()
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full flex-1" resizeMode="cover" />

      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="mt-20 w-full flex-row items-center justify-center">
              <Image source={icons.logo} className="h-10 w-12" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

            {error && <Text className="my-3 px-5 text-red-500">Error: {error.message}</Text>}

            {!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
              <Text className="text-xl font-bold text-white">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found' : 'Start typing to search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search

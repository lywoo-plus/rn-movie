import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovie } from '@/services/api'
import { useFetch } from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovie({ query: searchQuery }), false)

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
      <Image source={images.bg} className="absolute z-0 w-full" />

      <FlatList
        className="mb-24 flex-1 px-5"
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        // refreshing={moviesLoading}
        // onRefresh={loadMovies}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="mx-auto mt-20 h-10 w-12" />

            <View className="mt-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {moviesLoading && <ActivityIndicator size="large" className="mt-10 self-center" />}

            {moviesError && <Text className="mt-5 text-red-500">{moviesError.message}</Text>}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies &&
              movies?.length > 0 && (
                <View>
                  <Text className="mb-3 mt-5 text-lg font-bold text-white">
                    Search Results for
                    <Text className="font-bold text-accent"> {searchQuery}</Text>
                  </Text>
                </View>
              )}
          </>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
        contentContainerClassName="pb-4"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie...'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

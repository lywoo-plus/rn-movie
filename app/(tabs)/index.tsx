import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import TrendingCard from '@/components/TrendingCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { useFetch } from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

export default function index() {
  const router = useRouter()

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <FlatList
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        refreshing={moviesLoading}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="mx-auto mt-20 h-10 w-12" />

            {moviesLoading ? (
              <ActivityIndicator size="large" className="mt-10 self-center" />
            ) : moviesError ? (
              <Text className="mt-5 text-red-500">{moviesError.message}</Text>
            ) : (
              <View>
                <View className="mt-5">
                  <SearchBar
                    placeholder="What are you looking for?"
                    onPress={() => router.push('/search')}
                  />
                </View>

                <View className="w-full flex-1">
                  <Text className="mb-3 mt-5 text-lg font-bold text-white">
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    data={movies}
                    refreshing={moviesLoading}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => (
                      <TrendingCard
                        index={index}
                        movie={{
                          searchTerm: '',
                          count: 0,
                          movie_id: item.id,
                          title: item.title,
                          poster_url: item.poster_path,
                        }}
                      />
                    )}
                  />
                </View>

                <Text className="mb-3 mt-5 text-lg font-bold text-white">Latest Movies</Text>
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
      />
    </View>
  )
}

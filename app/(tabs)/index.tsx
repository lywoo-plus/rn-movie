import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovie } from '@/services/api'
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
  } = useFetch(() => fetchMovie({ query: '' }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <FlatList
        className="mb-24 flex-1 px-5"
        showsVerticalScrollIndicator={false}
        data={moviesLoading || moviesError ? [] : movies}
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

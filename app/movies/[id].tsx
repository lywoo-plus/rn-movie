import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import { useFetch } from '@/services/useFetch'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface MovieInfoProps {
  label: string
  value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="mt-5 flex-col items-start justify-center">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">{value || 'N/A'}</Text>
  </View>
)

const Details = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

  if (loading)
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <ActivityIndicator />
      </SafeAreaView>
    )

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="h-[550px] w-full"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 flex size-14 items-center justify-center rounded-full bg-white">
            <Image source={icons.play} className="ml-1 h-7 w-6" resizeMode="stretch" />
          </TouchableOpacity>
        </View>

        <View className="mt-5 flex-col items-start justify-center px-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="mt-2 flex-row items-center gap-x-1">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split('-')[0]} •
            </Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>

          <View className="mt-2 flex-row items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
            <Image source={icons.star} className="size-4" />

            <Text className="text-sm font-bold text-white">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-sm text-light-200">({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(' • ') || 'N/A'}
          />

          <View className="flex w-1/2 flex-row justify-between">
            <MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies?.map((c) => c.name).join(' • ') || 'N/A'}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 z-50 mx-5 flex flex-row items-center justify-center rounded-lg bg-accent py-3.5"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="mr-1 mt-0.5 size-5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-base font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Details

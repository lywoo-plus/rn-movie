import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { images } from '@/constants/images'

import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SCREEN_WIDTH / 3

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="relative" style={{ width: ITEM_WIDTH - 22 }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_url}` }}
          className="h-48 w-full rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-0 px-2 py-1">
          <MaskedView
            maskElement={
              <View className="flex flex-1 justify-end pb-6">
                <Text className="text-5xl font-bold text-white">{index + 1}</Text>
              </View>
            }
          >
            <Image source={images.rankingGradient} resizeMode="cover" />
          </MaskedView>
        </View>

        <Text className="mt-2 text-sm font-bold text-light-200" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard

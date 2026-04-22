import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { Separator } from '@/components/Separator'
import { Summary, SummaryData } from '@/components/Summary'

export type HomeHeaderData = {
  total: string
  input: SummaryData
  output: SummaryData
}

type Props = {
  data: HomeHeaderData
}

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={{ paddingTop: 64, paddingHorizontal: 24, paddingBottom: 28 }}
    >
      <Text
        style={{
          color: colors.white,
          fontSize: 13,
          fontFamily: fontFamily.regular,
          opacity: 0.75,
          letterSpacing: 0.3,
        }}
      >
        Total que você possui
      </Text>

      <Text
        style={{
          color: colors.white,
          fontSize: 36,
          fontFamily: fontFamily.bold,
          marginTop: 6,
          letterSpacing: -0.5,
        }}
      >
        {data.total}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.15)',
        }}
      >
        <Summary
          data={data.input}
          icon={{ name: 'arrow-upward', color: colors.green[500] }}
        />

        <Separator color="rgba(255,255,255,0.2)" height={36} />

        <Summary
          alignRight
          data={data.output}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  )
}

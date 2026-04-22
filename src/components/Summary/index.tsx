import { ColorValue, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

export type SummaryData = {
  label: string
  value: string
}

type Props = {
  data: SummaryData
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  }
  alignRight?: boolean
}

export function Summary({ data, icon, alignRight = false }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          justifyContent: alignRight ? 'flex-end' : 'flex-start',
        }}
      >
        <MaterialIcons name={icon.name} size={14} color={icon.color} />
        <Text
          style={{
            color: colors.white,
            fontSize: 12,
            fontFamily: fontFamily.medium,
            opacity: 0.85,
          }}
        >
          {data.label}
        </Text>
      </View>

      <Text
        style={{
          color: colors.white,
          fontSize: 16,
          fontFamily: fontFamily.semiBold,
          marginTop: 4,
          textAlign: alignRight ? 'right' : 'left',
        }}
      >
        {data.value}
      </Text>
    </View>
  )
}

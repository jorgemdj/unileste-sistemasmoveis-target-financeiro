import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  isSelected: boolean
  onPress: () => void
}

export function Option({ title, icon, isSelected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isSelected ? styles.selected : styles.unselected,
        { opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={icon}
          size={16}
          color={isSelected ? colors.white : colors.gray[500]}
        />
        <Text style={[styles.label, { color: isSelected ? colors.white : colors.gray[500] }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.blue[500],
    borderColor: colors.blue[500],
  },
  unselected: {
    backgroundColor: colors.white,
    borderColor: colors.gray[200],
  },
  content: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
})

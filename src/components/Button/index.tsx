import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = PressableProps & {
  title: string
  isLoading?: boolean
  variant?: 'primary' | 'ghost'
}

export function Button({ title, isLoading = false, variant = 'primary', style, ...rest }: Props) {
  const isPrimary = variant === 'primary'

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.ghost,
        { opacity: pressed || isLoading ? 0.75 : 1 },
        style as object,
      ]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={isPrimary ? colors.white : colors.blue[500]} />
      ) : (
        <Text style={[styles.label, { color: isPrimary ? colors.white : colors.blue[500] }]}>
          {title}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.blue[500],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.blue[500],
  },
  label: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.2,
  },
})

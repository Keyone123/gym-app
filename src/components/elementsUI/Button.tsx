import React from 'react';
import {
    ActivityIndicator,
    Animated,
    Platform,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonSmall: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 40,
  },
  buttonMedium: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    minHeight: 48,
  },
  buttonLarge: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%',
    minHeight: 56,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#10B981',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledPrimary: {
    backgroundColor: '#93C5FD',
  },
  disabledSecondary: {
    backgroundColor: '#86EFAC',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  outlineText: {
    color: '#007AFF',
  },
  ghostText: {
    color: '#007AFF',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 17,
    fontWeight: '700',
  },
  iconContainer: {
    marginHorizontal: 6,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    const baseStyles = [
      styles.button,
      size === 'small' && styles.buttonSmall,
      size === 'medium' && styles.buttonMedium,
      size === 'large' && styles.buttonLarge,
      styles[variant],
      disabled && !loading && styles.disabled,
    ];

    if (disabled && !loading) {
      if (variant === 'primary') {
        baseStyles.push(styles.disabledPrimary);
      } else if (variant === 'secondary') {
        baseStyles.push(styles.disabledSecondary);
      }
    }

    return [...baseStyles, style];
  };

  const getTextStyle = () => {
    return [
      styles.text,
      size === 'small' && styles.textSmall,
      size === 'medium' && styles.textMedium,
      size === 'large' && styles.textLarge,
      isOutline && styles.outlineText,
      isGhost && styles.ghostText,
      textStyle,
    ];
  };

  const spinnerColor = isOutline || isGhost ? '#007AFF' : '#FFFFFF';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color={spinnerColor} />
        ) : (
          <>
            {leftIcon && (
              <Animated.View style={[styles.iconContainer, styles.leftIcon]}>
                {leftIcon}
              </Animated.View>
            )}
            <Text style={getTextStyle()}>{label}</Text>
            {rightIcon && (
              <Animated.View style={[styles.iconContainer, styles.rightIcon]}>
                {rightIcon}
              </Animated.View>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
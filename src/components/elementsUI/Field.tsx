import React, { useState, forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

interface FieldProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 0.2,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    minHeight: 56,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputContainerFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputContainerError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  leftIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    letterSpacing: 0.3,
  },
  rightIconContainer: {
    marginLeft: 12,
  },
  hint: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
    lineHeight: 18,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  error: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500',
    lineHeight: 18,
  },
  errorIcon: {
    marginRight: 4,
  },
  toggleButton: {
    padding: 4,
  },
  toggleText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
});

const Field = forwardRef<TextInput, FieldProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      secureTextEntry,
      showPasswordToggle = true,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [animatedBorder] = useState(new Animated.Value(0));

    const handleFocus = () => {
      setIsFocused(true);
      Animated.timing(animatedBorder, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const handleBlur = () => {
      setIsFocused(false);
      Animated.timing(animatedBorder, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const isSecure = secureTextEntry && !isPasswordVisible;
    const showToggle = secureTextEntry && showPasswordToggle;

    return (
      <View style={styles.container}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <Animated.View
            style={[
              styles.inputContainer,
              isFocused && styles.inputContainerFocused,
              error && styles.inputContainerError,
            ]}
          >
            {leftIcon && (
              <View style={styles.leftIconContainer}>{leftIcon}</View>
            )}

            <TextInput
              ref={ref}
              style={[styles.input, style]}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={isSecure}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoCorrect={false}
              {...props}
            />

            {showToggle ? (
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={togglePasswordVisibility}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleText}>
                  {isPasswordVisible ? 'Esconder' : 'Mostrar'}
                </Text>
              </TouchableOpacity>
            ) : rightIcon ? (
              <View style={styles.rightIconContainer}>{rightIcon}</View>
            ) : null}
          </Animated.View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>⚠ {error}</Text>
          </View>
        ) : hint ? (
          <Text style={styles.hint}>{hint}</Text>
        ) : null}
      </View>
    );
  }
);

Field.displayName = 'Field';

export default Field;
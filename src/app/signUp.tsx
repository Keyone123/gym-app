import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Field from '@/components/elementsUI/Field';
import Button from '@/components/elementsUI/Button';
import DatePicker from '@/components/elementsUI/DatePicker';
import Picker from '@/components/elementsUI/Picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 32,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    color: '#6B7280',
  },
  signInText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  termsContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default function SignUpScreen() {
  // Estados básicos
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados de perfil fitness
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  
  // Estados de erros
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Opções para os pickers
  const genderOptions = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'not_say' },
  ];

  const fitnessLevelOptions = [
    { label: 'Select Fitness Level', value: '' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Professional', value: 'professional' },
  ];

  const fitnessGoalOptions = [
    { label: 'Select Your Goal', value: '' },
    { label: 'Lose Weight', value: 'lose_weight' },
    { label: 'Gain Muscle', value: 'gain_muscle' },
    { label: 'Maintain Weight', value: 'maintain' },
    { label: 'Improve Endurance', value: 'endurance' },
    { label: 'Increase Strength', value: 'strength' },
    { label: 'General Fitness', value: 'general' },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSignUp = async () => {
    const newErrors: Record<string, string> = {};

    // Validação de nome
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    // Validação de email
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    // Validação de senha
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number.';
    }

    // Validação de confirmação de senha
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Validação de data de nascimento
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    } else {
      const age = calculateAge(dateOfBirth);
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old.';
      } else if (age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date.';
      }
    }

    // Validação de gênero
    if (!gender) {
      newErrors.gender = 'Please select your gender.';
    }

    // Validação de altura
    if (!height.trim()) {
      newErrors.height = 'Height is required.';
    } else {
      const heightNum = parseFloat(height);
      if (isNaN(heightNum) || heightNum < 50 || heightNum > 300) {
        newErrors.height = 'Please enter a valid height (50-300 cm).';
      }
    }

    // Validação de peso
    if (!weight.trim()) {
      newErrors.weight = 'Weight is required.';
    } else {
      const weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum < 20 || weightNum > 500) {
        newErrors.weight = 'Please enter a valid weight (20-500 kg).';
      }
    }

    // Validação de nível de fitness
    if (!fitnessLevel) {
      newErrors.fitnessLevel = 'Please select your fitness level.';
    }

    // Validação de objetivo
    if (!fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', 'Please fix all errors before continuing.');
      return;
    }

    // Processar cadastro
    setIsLoading(true);
    
    try {
      const userData = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        dateOfBirth: dateOfBirth?.toISOString(),
        gender,
        height: parseFloat(height),
        weight: parseFloat(weight),
        fitnessLevel,
        fitnessGoal,
      };

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Sign up successful', userData);
      Alert.alert('Success!', 'Your account has been created successfully!');
      
      // Navegar para a próxima tela
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
    // Navegar para tela de login
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us and start tracking your fitness journey today!
          </Text>
        </View>

        {/* Seção: Informações Básicas */}
        <Text style={styles.sectionTitle}>📋 Basic Information</Text>
        
        <Field
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            clearError('fullName');
          }}
          error={errors.fullName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <Field
          label="Email"
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearError('email');
          }}
          error={errors.email}
          returnKeyType="next"
        />

        <Field
          label="Password"
          placeholder="Min. 8 characters"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            clearError('password');
          }}
          error={errors.password}
          hint="Must contain uppercase, lowercase and number"
          returnKeyType="next"
        />

        <Field
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            clearError('confirmPassword');
          }}
          error={errors.confirmPassword}
          returnKeyType="done"
        />

        {/* Seção: Perfil Pessoal */}
        <Text style={styles.sectionTitle}>👤 Personal Profile</Text>

        <DatePicker
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(date) => {
            setDateOfBirth(date);
            clearError('dateOfBirth');
          }}
          error={errors.dateOfBirth}
          maximumDate={new Date()}
        />

        <Picker
          label="Gender"
          selectedValue={gender}
          onValueChange={(value) => {
            setGender(value);
            clearError('gender');
          }}
          items={genderOptions}
          error={errors.gender}
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Field
              label="Height (cm)"
              placeholder="175"
              keyboardType="decimal-pad"
              value={height}
              onChangeText={(text) => {
                setHeight(text.replace(/[^0-9.]/g, ''));
                clearError('height');
              }}
              error={errors.height}
              returnKeyType="next"
            />
          </View>

          <View style={styles.halfField}>
            <Field
              label="Weight (kg)"
              placeholder="70"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={(text) => {
                setWeight(text.replace(/[^0-9.]/g, ''));
                clearError('weight');
              }}
              error={errors.weight}
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Seção: Fitness Profile */}
        <Text style={styles.sectionTitle}>💪 Fitness Profile</Text>

        <Picker
          label="Current Fitness Level"
          selectedValue={fitnessLevel}
          onValueChange={(value) => {
            setFitnessLevel(value);
            clearError('fitnessLevel');
          }}
          items={fitnessLevelOptions}
          error={errors.fitnessLevel}
        />

        <Picker
          label="Primary Fitness Goal"
          selectedValue={fitnessGoal}
          onValueChange={(value) => {
            setFitnessGoal(value);
            clearError('fitnessGoal');
          }}
          items={fitnessGoalOptions}
          error={errors.fitnessGoal}
        />

        {/* Botão de Cadastro */}
        <View style={styles.buttonContainer}>
          <Button
            label="Create Account"
            onPress={handleSignUp}
            variant="primary"
            size="large"
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        {/* Termos e Condições */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Footer - Link para Login */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
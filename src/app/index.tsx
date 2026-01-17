import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Field from '@/components/elementsUI/Field';
import Button from '@/components/elementsUI/Button';
import { router } from 'expo-router';

const API_URL = 'http://localhost:8000/api/auth/login/';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    maxWidth: 180,
    maxHeight: 180,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginTop: 32,
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
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
  signUpText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validações
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email/Username é obrigatório');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória.');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres.');
      hasError = true;
    }

    if (hasError) return;

    // Chamada real da API
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // O backend espera "username"
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        console.log('Login bem-sucedido:', data);
        
        // Armazene o token se o backend retornar
        // await AsyncStorage.setItem('authToken', data.token);
        // await AsyncStorage.setItem('user', JSON.stringify(data.user));
        
        // Navegue para a home
        router.push('/home');
      } else {
        // Erro de autenticação
        const errorMessage = data.message || data.detail || 'Credenciais inválidas';
        setPasswordError(errorMessage);
        Alert.alert('Erro de Login', errorMessage);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setPasswordError('Erro ao conectar com o servidor. Verifique sua conexão.');
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
    // Navegar para tela de recuperação de senha
    // router.push('/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/signUp');
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
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/musculacao-login.jpeg')}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.title}>Bem Vindo!</Text>
          <Text style={styles.subtitle}>
            Faça login para continuar e acessar sua conta.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Field
            label="Email/Username"
            placeholder="Seu email ou username"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            error={emailError}
            returnKeyType="next"
          />

          <Field
            label="Senha"
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            error={passwordError}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <Button
              label="Entrar"
              onPress={handleLogin}
              variant="primary"
              size="large"
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
            <Text style={styles.signUpText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
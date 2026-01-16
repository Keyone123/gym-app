import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  streak?: number;
  level?: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  gradientBackground: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  levelIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4F46E5',
  },
  streakBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  streakIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  motivationBar: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  motivationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  motivationText: {
    flex: 1,
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

export default function Header({
  userName,
  userAvatar,
  streak = 0,
  level = 'Beginner',
  onProfilePress,
  onNotificationPress,
}: HeaderProps) {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getMotivationalQuote = (): string => {
    const quotes = [
      "Every workout counts! 💪",
      "You're stronger than yesterday! 🔥",
      "Progress over perfection! 🎯",
      "Your body can stand almost anything. It's your mind you have to convince! 🧠",
      "The only bad workout is the one you didn't do! ✨",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const getLevelIcon = (): string => {
    const levelIcons: Record<string, string> = {
      'Beginner': '🌱',
      'Intermediate': '⚡',
      'Advanced': '🔥',
      'Professional': '👑',
    };
    return levelIcons[level] || '🌱';
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <View style={styles.topRow}>
          {/* Seção Esquerda - Informações do Usuário */}
          <View style={styles.leftSection}>
            <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
            <Text style={styles.nameText} numberOfLines={1}>
              {userName}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelIcon}>{getLevelIcon()}</Text>
              <Text style={styles.levelText}>{level.toUpperCase()}</Text>
            </View>
          </View>

          {/* Seção Direita - Avatar e Notificações */}
          <View style={styles.rightSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={onProfilePress}
              activeOpacity={0.8}
            >
              {userAvatar ? (
                <Image
                  source={{ uri: userAvatar }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>
                    {getInitials(userName)}
                  </Text>
                </View>
              )}
              
              {streak > 0 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakIcon}>🔥</Text>
                  <Text style={styles.streakText}>{streak}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra Motivacional */}
        <View style={styles.motivationBar}>
          <Text style={styles.motivationIcon}>💬</Text>
          <Text style={styles.motivationText}>{getMotivationalQuote()}</Text>
        </View>
      </View>
    </View>
  );
}
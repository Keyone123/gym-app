import React from 'react';
import {
    Image,
    ImageSourcePropType,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface TabItem {
  id: string;
  label: string;
  icon: ImageSourcePropType;  // ✅ Tipo correto!
  activeIcon: ImageSourcePropType;  // ✅ Tipo correto!
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 12,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: '#007AFF',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    width: 26,
    height: 26,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  inactiveLabel: {
    color: '#9CA3AF',
  },
  indicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007AFF',
    marginTop: 2,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  centerIcon: {
    width: 32,
    height: 32,
  },
});

export default function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: require('@/assets/icons/home.png'),
      activeIcon: require('@/assets/icons/home.png'),
    },
    {
      id: 'workouts',
      label: 'Workouts',
      icon: require('@/assets/icons/workout.png'),
      activeIcon: require('@/assets/icons/workout.png'),
    },
    {
      id: 'add',
      label: 'Add',
      icon: require('@/assets/icons/sum.png'),
      activeIcon: require('@/assets/icons/sum.png'),
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: require('@/assets/icons/progress.png'),
      activeIcon: require('@/assets/icons/progress.png'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: require('@/assets/icons/user.png'),
      activeIcon: require('@/assets/icons/user.png'),
    },
  ];

  const handleTabPress = (tabId: string) => {
    onTabChange(tabId);
    
    // Adicionar feedback tátil se disponível
    if (Platform.OS === 'ios') {
      // const Haptics = require('expo-haptics');
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderTab = (tab: TabItem) => {
    const isActive = activeTab === tab.id;
    const isCenterButton = tab.id === 'add';

    if (isCenterButton) {
      return (
        <View key={tab.id} style={styles.tabButton}>
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.8}
          >
            <Image source={tab.activeIcon} style={styles.centerIcon} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={tab.id}
        style={styles.tabButton}
        onPress={() => handleTabPress(tab.id)}
        activeOpacity={0.7}
      >
        <View style={styles.tabContent}>
          <View
            style={[
              styles.iconContainer,
              isActive ? styles.activeIconContainer : styles.inactiveIconContainer,
            ]}
          >
            <Image
              source={isActive ? tab.activeIcon : tab.icon}
              style={isActive ? styles.activeIcon : styles.icon}
            />
          </View>
          
          <Text
            style={[
              styles.label,
              isActive ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {tab.label}
          </Text>
          
          {isActive && <View style={styles.indicatorDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map(renderTab)}
      </View>
    </View>
  );
}
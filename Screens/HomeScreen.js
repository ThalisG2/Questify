/**
 * Menta Zen — Daily Quests Screen (v2)
 * Fidelidade pixel-art total ao DESIGN.md
 *
 * Dependências necessárias no projeto Expo:
 *   expo install expo-font
 *   expo install react-native-svg
 *   Adicionar assets/chama.png ao projeto
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import Svg, { Path, Rect, Circle, Line, Polyline } from 'react-native-svg';

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  surface:                '#effdf5',
  surfaceContainerLow:    '#eaf7ef',
  surfaceContainer:       '#e4f1e9',
  surfaceContainerHigh:   '#deebe4',
  surfaceContainerHighest:'#d8e6de',
  onSurface:              '#131e19',
  onSurfaceVariant:       '#434846',
  outlineVariant:         '#c3c7c5',
  primary:                '#5b5f5e',
  onPrimary:              '#ffffff',
  secondaryContainer:     '#d0e5d8',
  onSecondaryContainer:   '#54675d',
  tertiary:               '#855314',
  onTertiary:             '#ffffff',
  onTertiaryFixed:        '#2c1700',
  surfaceVariant:         '#d8e6de',
  background:             '#effdf5',
  onBackground:           '#131e19',
  pixelShadow:            '#131e19',
  checkBlue:              '#1a6bb5',
  white:                  '#ffffff',
};

// 4px grid
const U = (n) => n * 4;

// ─────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────

const IconSwords = ({ size = 24, color = C.onBackground }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14.5 17.5L3 6V3h3l11.5 11.5" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
    <Path d="M13 19l6-6 2 2-6 6-2-2z" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill={color}/>
    <Path d="M9.5 6.5L4 1 1 4l5.5 5.5" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <Path d="M3 20l4-4M17 4l3 3" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </Svg>
);

const IconTimer = ({ size = 24, color = C.onSurfaceVariant }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="13" r="8" stroke={color} strokeWidth="2"/>
    <Path d="M12 9v4l3 3" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <Path d="M9 2h6M12 2v3" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </Svg>
);

const IconStore = ({ size = 24, color = C.onSurfaceVariant }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l1-6h16l1 6" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
    <Path d="M3 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0 1.66 1.34 3 3 3s3-1.34 3-3c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <Path d="M4 21V12M20 21V12M4 21h16" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <Rect x="9" y="14" width="6" height="7" stroke={color} strokeWidth="2"/>
  </Svg>
);

const IconBone = ({ size = 24, color = C.onSurfaceVariant }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8.5 14.5L14.5 8.5" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <Path d="M5 8a3 3 0 0 0 3-3 3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3z" stroke={color} strokeWidth="2" strokeLinejoin="miter" fill="none"/>
    <Path d="M13 19a3 3 0 0 0 3-3 3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3z" stroke={color} strokeWidth="2" strokeLinejoin="miter" fill="none"/>
  </Svg>
);

const IconSettings = ({ size = 24, color = C.onBackground }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </Svg>
);

const IconPlus = ({ size = 32, color = C.onTertiary }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path d="M16 6V26M6 16H26" stroke={color} strokeWidth="4" strokeLinecap="square"/>
  </Svg>
);

const IconCheck = ({ size = 14, color = C.white }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path d="M2 7L6 11L12 3" stroke={color} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
  </Svg>
);

// ─────────────────────────────────────────────
// PIXEL SHADOW WRAPPER
// ─────────────────────────────────────────────
function PixelBox({ children, style, innerStyle, offset = 4, shadowColor = C.pixelShadow, borderWidth = 4, borderColor = C.onBackground, bg = C.surface }) {
  return (
    <View style={[{ position: 'relative', marginBottom: offset, marginRight: offset }, style]}>
      {/* Shadow layer */}
      <View style={{
        position: 'absolute',
        bottom: -offset,
        right: -offset,
        left: 0,
        top: 0,
        backgroundColor: shadowColor,
      }} />
      {/* Content layer */}
      <View style={[{
        backgroundColor: bg,
        borderWidth,
        borderColor,
        position: 'relative',
        zIndex: 1,
      }, innerStyle]}>
        {children}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// PIXEL CHECKBOX
// ─────────────────────────────────────────────
function PixelCheckbox({ checked, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.checkbox, checked && styles.checkboxChecked]}
    >
      {checked && <IconCheck size={14} color={C.white} />}
    </Pressable>
  );
}

// ─────────────────────────────────────────────
// QUEST CARD
// ─────────────────────────────────────────────
function QuestCard({ title, description, exp, initialCompleted = false }) {
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <PixelBox
      style={{ marginBottom: U(5) }}
      bg={completed ? C.surfaceContainerHigh : C.surface}
      innerStyle={{ flexDirection: 'row', alignItems: 'flex-start', padding: U(4), gap: U(4) }}
    >
      <PixelCheckbox
        checked={completed}
        onPress={() => setCompleted(v => !v)}
      />
      <View style={{ flex: 1 }}>
        <Text style={[
          styles.questTitle,
          completed && styles.textStrike,
          completed && { color: C.onSurfaceVariant },
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.questDesc,
          completed && styles.textStrike,
          completed && { color: C.outlineVariant },
        ]}>
          {description}
        </Text>
        {!completed && exp != null && (
          <View style={{ marginTop: U(2), alignSelf: 'flex-start', position: 'relative', marginBottom: 2, marginRight: 2 }}>
            {/* chip shadow */}
            <View style={{ position: 'absolute', bottom: -2, right: -2, left: 0, top: 0, backgroundColor: C.pixelShadow }} />
            <View style={styles.expChip}>
              <Text style={styles.expChipText}>{exp} EXP</Text>
            </View>
          </View>
        )}
      </View>
    </PixelBox>
  );
}

// ─────────────────────────────────────────────
// BOTTOM NAV TAB
// ─────────────────────────────────────────────
function NavTab({ icon, label, active, onPress }) {
  if (active) {
    return (
      <View style={{ position: 'relative', marginBottom: 4, marginRight: 4 }}>
        {/* Pixel shadow for active tab */}
        <View style={{
          position: 'absolute',
          bottom: -4, right: -4, left: 0, top: 0,
          backgroundColor: C.onTertiaryFixed,
        }} />
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.85}
          style={styles.navTabActive}
        >
          {icon}
          <Text style={styles.navTabLabelActive}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.navTab}>
      {icon}
      <Text style={styles.navTabLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
const QUESTS = [
  { id: '1', title: 'Study Math',          description: 'Complete Chapter 4 Exercises', exp: 50,  initialCompleted: false },
  { id: '2', title: 'Read 10 pages',       description: 'History of the Pixel Kingdom', exp: 20,  initialCompleted: false },
  { id: '3', title: 'Organize Inventory',  description: 'Clean up digital workspace',   exp: 30,  initialCompleted: true  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    'PixelPurl':              require('../assets/fonts/PixelPurl.ttf'),
  });

  const [activeTab, setActiveTab] = useState('quests');
  const [fabPressed, setFabPressed] = useState(false);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: C.surfaceContainer }} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surfaceContainer} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Pet Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/chama.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          {/* Streak + LVL column */}
          <View style={{ flexDirection: 'column', gap: 6 }}>
            <Text style={styles.streakText}>STREAK: 12</Text>
            {/* LVL badge */}
            <View style={{ position: 'relative', alignSelf: 'flex-start', marginBottom: 3, marginRight: 3 }}>
              <View style={{ position: 'absolute', bottom: -3, right: -3, left: 0, top: 0, backgroundColor: C.pixelShadow }} />
              <View style={styles.lvlBadge}>
                <Text style={styles.lvlBadgeText}>LVL 14</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings button */}
        <PixelBox offset={2} bg={C.surface} innerStyle={styles.settingsBtn}>
          <IconSettings size={22} color={C.onBackground} />
        </PixelBox>
      </View>

      {/* ── SCROLL CONTENT ── */}
      <ScrollView
        style={{ flex: 1, backgroundColor: C.surfaceContainerLow }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section header row */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>DAILY QUESTS</Text>
        </View>

        {/* Thick divider */}
        <View style={styles.sectionDivider} />

        {/* Quest list */}
        <View style={{ marginTop: U(4) }}>
          {QUESTS.map(q => <QuestCard key={q.id} {...q} />)}
        </View>
      </ScrollView>

      {/* ── FAB ── */}
      <Pressable
        onPressIn={() => setFabPressed(true)}
        onPressOut={() => setFabPressed(false)}
        style={styles.fabWrapper}
        accessibilityLabel="Add Quest"
      >
        {/* Shadow */}
        {!fabPressed && (
          <View style={{
            position: 'absolute',
            bottom: -4, right: -4, left: 0, top: 0,
            backgroundColor: C.pixelShadow,
            borderWidth: 4, borderColor: C.pixelShadow,
          }} />
        )}
        <View style={[
          styles.fab,
          fabPressed && { transform: [{ translateX: 4 }, { translateY: 4 }] },
        ]}>
          <IconPlus size={30} color={C.onTertiary} />
        </View>
      </Pressable>

      {/* ── BOTTOM NAV ── */}
      <View style={styles.bottomNav}>
        <NavTab
          icon={<IconSwords size={22} color={activeTab === 'quests' ? C.onTertiary : C.onSurfaceVariant} />}
          label="QUESTS"
          active={activeTab === 'quests'}
          onPress={() => setActiveTab('quests')}
        />
        <NavTab
          icon={<IconTimer size={22} color={activeTab === 'focus' ? C.onTertiary : C.onSurfaceVariant} />}
          label="FOCUS"
          active={activeTab === 'focus'}
          onPress={() => setActiveTab('focus')}
        />
        <NavTab
          icon={<IconStore size={22} color={activeTab === 'shop' ? C.onTertiary : C.onSurfaceVariant} />}
          label="SHOP"
          active={activeTab === 'shop'}
          onPress={() => setActiveTab('shop')}
        />
        <NavTab
          icon={<IconBone size={22} color={activeTab === 'pet' ? C.onTertiary : C.onSurfaceVariant} />}
          label="PET"
          active={activeTab === 'pet'}
          onPress={() => setActiveTab('pet')}
        />
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const SPACE_MONO  = 'PixelPurl';
const JETBRAINS   = 'JetBrainsMono-Regular';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.surfaceContainerLow,
  },

  // ── Header ──────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: U(4),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: U(3),
    backgroundColor: C.surfaceContainer,
    borderBottomWidth: 4,
    borderBottomColor: C.onBackground,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: U(3),
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderWidth: 4,
    borderColor: C.onBackground,
    backgroundColor: C.white,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  streakText: {
    fontFamily: SPACE_MONO,
    fontSize: 20,
    color: C.tertiary,
    letterSpacing: -0.4,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Scroll / Section ─────────────────────────
  scrollContent: {
    paddingHorizontal: U(6),
    paddingTop: U(5),
    paddingBottom: 160,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: U(2),
  },
  sectionTitle: {
    fontFamily: SPACE_MONO,
    fontSize: 28,
    color: C.onBackground,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  sectionDivider: {
    height: 4,
    backgroundColor: C.onBackground,
    marginTop: U(2),
  },
  lvlBadge: {
    backgroundColor: C.tertiary,
    borderWidth: 4,
    borderColor: C.onBackground,
    paddingHorizontal: U(2),
    paddingVertical: U(1),
    position: 'relative',
    zIndex: 1,
  },
  lvlBadgeText: {
    fontFamily: SPACE_MONO,
    fontSize: 13,
    color: C.onTertiary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Quest Card internals ─────────────────────
  questTitle: {
    fontFamily: SPACE_MONO,
    fontSize: 19,
    color: C.onBackground,
    lineHeight: 26,
  },
  questDesc: {
    fontFamily: JETBRAINS,
    fontSize: 13,
    color: C.onSurfaceVariant,
    lineHeight: 20,
    marginTop: 2,
  },
  textStrike: {
    textDecorationLine: 'line-through',
  },
  expChip: {
    backgroundColor: C.secondaryContainer,
    borderWidth: 2,
    borderColor: C.onBackground,
    paddingHorizontal: U(2),
    paddingVertical: 2,
    position: 'relative',
    zIndex: 1,
  },
  expChipText: {
    fontFamily: SPACE_MONO,
    fontSize: 11,
    color: C.onSecondaryContainer,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },

  // ── Checkbox ─────────────────────────────────
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 4,
    borderColor: C.onBackground,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  checkboxChecked: {
    backgroundColor: C.checkBlue,
    borderColor: C.checkBlue,
  },

  // ── FAB ──────────────────────────────────────
  fabWrapper: {
    position: 'absolute',
    bottom: 96,
    right: U(6),
    zIndex: 40,
    width: 56,
    height: 56,
  },
  fab: {
    width: 56,
    height: 56,
    backgroundColor: C.tertiary,
    borderWidth: 4,
    borderColor: C.onBackground,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },

  // ── Bottom Nav ───────────────────────────────
  bottomNav: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: C.surfaceVariant,
    borderTopWidth: 4,
    borderTopColor: C.onBackground,
    paddingHorizontal: U(2),
    paddingBottom: U(2),
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: U(2),
  },
  navTabActive: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: U(2),
    paddingHorizontal: U(3),
    backgroundColor: C.tertiary,
    borderWidth: 4,
    borderColor: C.onBackground,
    minWidth: 72,
    position: 'relative',
    zIndex: 1,
  },
  navTabLabel: {
    fontFamily: SPACE_MONO,
    fontSize: 9,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  navTabLabelActive: {
    fontFamily: SPACE_MONO,
    fontSize: 9,
    color: C.onTertiary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
/**
 * QUESTIFTY — HomeScreen.js (Daily Quests)
 * Fidelidade pixel-art total ao DESIGN.md.
 * Header corrigido de forma nativa para evitar sobreposição e erros de Safe Area.
 * Animação de transição na Bottom Navigation bar.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable,
  Platform,
  Animated,
} from 'react-native';
import { useFonts } from 'expo-font';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  surface:                 '#effdf5', // Fundo principal da tela
  surfaceContainer:       '#e4f1e9',
  surfaceContainerHigh:   '#deebe4',
  onSurface:              '#131e19',
  onSurfaceVariant:       '#434846',
  outlineVariant:         '#c3c7c5',
  primary:                '#5b5f5e',
  onPrimary:              '#ffffff',
  secondaryContainer:     '#d0e5d8',
  onSecondaryContainer:   '#54675d',
  tertiary:               '#855314', // Marrom dos botões primários
  onTertiary:             '#ffffff',
  onTertiaryFixed:        '#2c1700', // Sombra do marrom
  surfaceVariant:         '#effdf5', // Fundo da Bottom Nav
  background:             '#effdf5',
  onBackground:           '#131e19',
  pixelShadow:            '#131e19', // Sombra preta dura
  checkBlue:              '#1a6bb5',
  white:                  '#ffffff',
};

// 4px grid
const U = (n) => n * 4;

// Cálculo nativo de espaçamento seguro (Evita erros de Provider corrompido)
const TOP_SPACE = Platform.OS === 'ios' ? 48 : (StatusBar.currentHeight || 0);
const BOTTOM_SPACE = Platform.OS === 'ios' ? 28 : U(2);

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

const IconPlus = ({ size = 32, color = C.onTertiary }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path d="M16 6V26M6 16H26" stroke={color} strokeWidth="4" strokeLinecap="square"/>
  </Svg>
);

const IconCheck = ({ size = 16, color = C.white }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path d="M2 7L6 11L12 3" stroke={color} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
  </Svg>
);

// ─────────────────────────────────────────────
// COMPONENTES BASE (PIXELADOS)
// ─────────────────────────────────────────────
function PixelBox({ children, style, innerStyle, offset = 4, shadowColor = C.pixelShadow, borderWidth = 4, borderColor = C.onBackground, bg = C.white }) {
  return (
    <View style={[{ position: 'relative', marginBottom: offset, marginRight: offset }, style]}>
      <View style={{
        position: 'absolute',
        bottom: -offset,
        right: -offset,
        left: 4,
        top: 4,
        backgroundColor: shadowColor,
      }} />
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

function AnimatedCheckbox({ checked, onPress }) {
  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      bounciness: 12,
      speed: 20,
    }).start();
  }, [checked]);

  return (
    <Pressable onPress={onPress} style={[styles.checkbox, checked && styles.checkboxChecked]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <IconCheck size={14} color={C.white} />
      </Animated.View>
    </Pressable>
  );
}

// ─────────────────────────────────────────────
// QUEST CARD ANIMADO
// ─────────────────────────────────────────────
function QuestCard({ title, description, exp, initialCompleted = false, index }) {
  const [completed, setCompleted] = useState(initialCompleted);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100, // Efeito cascata
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 100,
        useNativeDriver: true,
        bounciness: 5,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <PixelBox
        style={{ marginBottom: U(5) }}
        bg={completed ? C.surfaceContainerHigh : C.white}
        innerStyle={styles.cardInner}
      >
        <AnimatedCheckbox checked={completed} onPress={() => setCompleted(!completed)} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.questTitle, completed && styles.textStrike, completed && { color: C.onSurfaceVariant }]}>
            {title}
          </Text>
          <Text style={[styles.questDesc, completed && styles.textStrike, completed && { color: C.outlineVariant }]}>
            {description}
          </Text>
          {!completed && exp != null && (
            <View style={styles.expChipContainer}>
              <View style={styles.expChipShadow} />
              <View style={styles.expChip}>
                <Text style={styles.expChipText}>{exp} EXP</Text>
              </View>
            </View>
          )}
        </View>
      </PixelBox>
    </Animated.View>
  );
}

// ─────────────────────────────────────────────
// BOTTOM NAV TAB (ANIMADO)
// ─────────────────────────────────────────────
function AnimatedNavTab({ icon, label, active, onPress }) {
  const expandAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(expandAnim, {
      toValue: active ? 1 : 0,
      useNativeDriver: false, // Animando padding e layout (não suportado pelo native driver)
      bounciness: 8,
      speed: 16,
    }).start();
  }, [active]);

  const paddingH = expandAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 20] });
  const bgOpacity = expandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ position: 'relative' }}>
        {/* Sombra Dinâmica */}
        <Animated.View style={[
          styles.navTabShadow,
          { opacity: bgOpacity }
        ]} />
        
        {/* Botão animado */}
        <Animated.View style={[
          styles.navTabBase,
          {
            paddingHorizontal: paddingH,
            backgroundColor: active ? C.tertiary : 'transparent',
            borderColor: active ? C.onBackground : 'transparent',
            borderWidth: active ? 4 : 0,
          }
        ]}>
          {icon}
          {active && (
            <Text style={styles.navTabLabelActive}>{label}</Text>
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// TELA PRINCIPAL
// ─────────────────────────────────────────────
const QUESTS = [
  { id: '1', title: 'Study Math', description: 'Complete Chapter 4 Exercises', exp: 50, initialCompleted: false },
  { id: '2', title: 'Read 10 pages', description: 'History of the Pixel Kingdom', exp: 20, initialCompleted: false },
  { id: '3', title: 'Organize Inventory', description: 'Clean up digital workspace', exp: 30, initialCompleted: true },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'PixelPurl': require('../assets/fonts/PixelPurl.ttf'), 
  });

  const [activeTab, setActiveTab] = useState('quests');
  
  // Animação do FAB
  const fabAnim = useRef(new Animated.Value(0)).current;

  const handleFabPressIn = () => {
    Animated.spring(fabAnim, { toValue: 1, useNativeDriver: true, speed: 60, bounciness: 0 }).start();
  };
  const handleFabPressOut = () => {
    Animated.spring(fabAnim, { toValue: 0, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };

  const fabTranslateX = fabAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] });
  const fabTranslateY = fabAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] });
  const fabShadowOpacity = fabAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: C.surface }} />;

  return (
    <View style={styles.safeArea}>
      {/* Forçamos o StatusBar a ser transparente para controlarmos o topo nativamente via padding */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── HEADER (Agora usando o TOP_SPACE estático do sistema para total segurança) ── */}
      <View style={[styles.header, { paddingTop: TOP_SPACE + U(2) }]}>
        <Text style={styles.appTitle}>QUESTIFTY</Text>
        
        <PixelBox offset={3} bg={C.white} borderWidth={3} innerStyle={styles.statsBadge}>
          <Text style={styles.statsText}>Lv. 14</Text>
          <View style={styles.statsDivider} />
          <Text style={styles.statsText}>🔥 12</Text>
        </PixelBox>
      </View>

      {/* ── CONTEÚDO SCROLL ── */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>DAILY QUESTS</Text>
        </View>
        <View style={styles.sectionDivider} />

        <View style={{ marginTop: U(5) }}>
          {QUESTS.map((q, i) => <QuestCard key={q.id} {...q} index={i} />)}
        </View>
      </ScrollView>

      {/* ── FAB BUTTON ── */}
      <View style={styles.fabWrapper}>
        <Animated.View style={[styles.fabShadow, { opacity: fabShadowOpacity }]} />
        <Animated.View style={{ transform: [{ translateX: fabTranslateX }, { translateY: fabTranslateY }] }}>
          <Pressable onPressIn={handleFabPressIn} onPressOut={handleFabPressOut} style={styles.fabFace}>
            <IconPlus size={28} color={C.onTertiary} />
          </Pressable>
        </Animated.View>
      </View>

      {/* ── BOTTOM NAV (Com Animações Fluidas e BOTTOM_SPACE seguro) ── */}
      <View style={[styles.bottomNav, { paddingBottom: BOTTOM_SPACE }]}>
        <AnimatedNavTab icon={<IconSwords size={24} color={activeTab === 'quests' ? C.onTertiary : C.onSurfaceVariant}/>} label="QUESTS" active={activeTab === 'quests'} onPress={() => setActiveTab('quests')} />
        <AnimatedNavTab icon={<IconTimer size={24} color={activeTab === 'focus' ? C.onTertiary : C.onSurfaceVariant}/>} label="FOCUS" active={activeTab === 'focus'} onPress={() => setActiveTab('focus')} />
        <AnimatedNavTab icon={<IconStore size={24} color={activeTab === 'shop' ? C.onTertiary : C.onSurfaceVariant}/>} label="SHOP" active={activeTab === 'shop'} onPress={() => setActiveTab('shop')} />
        <AnimatedNavTab icon={<IconBone size={24} color={activeTab === 'pet' ? C.onTertiary : C.onSurfaceVariant}/>} label="PET" active={activeTab === 'pet'} onPress={() => setActiveTab('pet')} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────
const FONT_PIXEL = Platform.OS === 'ios' ? 'Courier New' : 'monospace';
const CUSTOM_FONT = 'PixelPurl';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.surface, 
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: U(6),
    paddingBottom: U(6),
  },
  appTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 26,
    color: C.onBackground,
    letterSpacing: -1,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: U(2),
    paddingVertical: U(1),
    gap: U(2),
  },
  statsText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 14,
    color: C.onBackground,
    marginTop: 2, 
  },
  statsDivider: {
    width: 2,
    height: 14,
    backgroundColor: C.onBackground,
  },

  // Body
  scrollContent: {
    paddingHorizontal: U(6),
    paddingBottom: 160,
  },
  sectionHeaderRow: {
    marginBottom: U(1),
  },
  sectionTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 26,
    color: C.onBackground,
  },
  sectionDivider: {
    height: 4,
    backgroundColor: C.onBackground,
    width: '100%',
  },

  // Card Interno
  cardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: U(4),
    gap: U(4),
  },
  questTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 18,
    color: C.onBackground,
    lineHeight: 24,
  },
  questDesc: {
    fontFamily: FONT_PIXEL,
    fontSize: 12,
    fontWeight: 'bold',
    color: C.onSurfaceVariant,
    marginTop: U(1),
  },
  textStrike: {
    textDecorationLine: 'line-through',
  },
  
  // Checkbox
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 4,
    borderColor: C.onBackground,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: C.checkBlue,
    borderColor: C.checkBlue,
  },

  // Exp Chip
  expChipContainer: {
    marginTop: U(3),
    alignSelf: 'flex-start',
    position: 'relative',
    marginBottom: 2,
    marginRight: 2,
  },
  expChipShadow: {
    position: 'absolute',
    bottom: -2, right: -2, left: 2, top: 2,
    backgroundColor: C.pixelShadow,
  },
  expChip: {
    backgroundColor: C.surface,
    borderWidth: 2,
    borderColor: C.onBackground,
    paddingHorizontal: U(2),
    paddingVertical: 2,
    position: 'relative',
    zIndex: 1,
  },
  expChipText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 12,
    color: C.onBackground,
  },

  // FAB 
  fabWrapper: {
    position: 'absolute',
    bottom: 100,
    right: U(6),
    width: 60,
    height: 60,
    zIndex: 40,
  },
  fabShadow: {
    position: 'absolute',
    bottom: -4, right: -4, left: 4, top: 4,
    backgroundColor: C.pixelShadow,
  },
  fabFace: {
    width: '100%',
    height: '100%',
    backgroundColor: C.tertiary,
    borderWidth: 4,
    borderColor: C.onBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom Nav
  bottomNav: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: C.surface,
    borderTopWidth: 4,
    borderTopColor: C.onBackground,
    paddingHorizontal: U(2),
    paddingTop: U(2),
  },
  navTabBase: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: U(2),
    position: 'relative',
    zIndex: 1,
  },
  navTabShadow: {
    position: 'absolute',
    bottom: -4, right: -4, left: 4, top: 4,
    backgroundColor: C.onTertiaryFixed, 
  },
  navTabLabelActive: {
    fontFamily: CUSTOM_FONT,
    fontSize: 10,
    color: C.onTertiary,
  },
});
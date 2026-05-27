/**
 * QUESTIFTY — IntroScreen.js
 * Tela de boas-vindas Minimalista (Fundo Branco, Ícone Flutuante).
 * Navegação direta ativada: Clicou, entrou na HomeScreen.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
  Pressable,
  Image,
} from 'react-native';

// ─────────────────────────────────────────────
// DESIGN TOKENS — Menta Zen / Questifty
// ─────────────────────────────────────────────
const C = {
  surface:              '#effdf5',
  onSurface:            '#131e19',
  onSurfaceVariant:     '#434846',
  tertiary:             '#855314',
  pixelShadow:          '#131e19',
  white:                '#ffffff', 
};

// Sistema de Grade (Múltiplos de 4px)
const U = (n) => n * 4;

// Cálculo de espaçamento seguro nativo 
const TOP_SPACE = Platform.OS === 'ios' ? 48 : (StatusBar.currentHeight || 0);
const BOTTOM_SPACE = Platform.OS === 'ios' ? 28 : U(4);

// ─────────────────────────────────────────────
// COMPONENTE: BOTÃO PIXELADO ANIMADO 
// ─────────────────────────────────────────────
function PixelButton({ label, onPress, primary = false, icon = null }) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 60,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const translateX = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const translateY = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const shadowOpacity = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });

  return (
    <View style={styles.btnOuter}>
      <Animated.View
        style={[
          styles.btnShadow,
          primary ? styles.btnShadowPrimary : styles.btnShadowSecondary,
          { opacity: shadowOpacity },
        ]}
      />
      <Animated.View style={{ transform: [{ translateX }, { translateY }], width: '100%' }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          style={[
            styles.btnFace,
            primary ? styles.btnFacePrimary : styles.btnFaceSecondary,
          ]}
        >
          {icon && <View style={styles.btnIconWrap}>{icon}</View>}
          <Text
            style={[
              styles.btnLabel,
              primary ? styles.btnLabelPrimary : styles.btnLabelSecondary,
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────────────
// DECORAÇÃO DE CANTOS PIXELADOS
// ─────────────────────────────────────────────
function CornerPixels() {
  return (
    <>
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
    </>
  );
}

// ─────────────────────────────────────────────
// LOGO DO GOOGLE EM PIXEL ART
// ─────────────────────────────────────────────
function GoogleLogoPixel() {
  return (
    <View style={styles.gLogo}>
      <View style={[styles.gBlock, { backgroundColor: '#EA4335' }]} />
      <View style={[styles.gBlock, { backgroundColor: '#4285F4' }]} />
      <View style={[styles.gBlock, { backgroundColor: '#FBBC05' }]} />
      <View style={[styles.gBlock, { backgroundColor: '#34A853' }]} />
    </View>
  );
}

// ─────────────────────────────────────────────
// TELA PRINCIPAL (INTRO SCREEN)
// ─────────────────────────────────────────────
export default function IntroScreen({ navigation }) {

  const titleAnim = useRef(new Animated.Value(0)).current;
  const iconAnim  = useRef(new Animated.Value(0)).current;
  const btnsAnim  = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.stagger(150, [
      Animated.timing(titleAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(iconAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(btnsAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();

    // Loop de flutuação
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -12, duration: 1200, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    floatLoop.start();

    return () => floatLoop.stop();
  }, []);

  const makeEntrance = (anim, yStart = 20) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [yStart, 0] }) }],
  });

  // AÇÃO DIRETA DE NAVEGAÇÃO
  const handleNavigation = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={[styles.container, { paddingTop: TOP_SPACE, paddingBottom: BOTTOM_SPACE }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} translucent={true} />

      <CornerPixels />

      {/* CABEÇALHO */}
      <Animated.View style={[styles.titleArea, makeEntrance(titleAnim, 16)]}>
        <Text style={styles.appTitle}>QUESTIFTY !!!</Text>
        <Text style={styles.appTagline}>ESTUDE. EVOLUA. CONQUISTE.</Text>
      </Animated.View>

      {/* ÍCONE FLUTUANTE */}
      <Animated.View style={[styles.iconContainer, makeEntrance(iconAnim, 28)]}>
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Image
            source={require('../assets/icone.png')}
            style={styles.floatingIcon}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>

      {/* BOTÕES */}
      <Animated.View style={[styles.buttonsArea, makeEntrance(btnsAnim, 20)]}>
        <PixelButton
          label="ENTRAR COM GOOGLE"
          onPress={handleNavigation}
          primary={false}
          icon={<GoogleLogoPixel />}
        />

        <Pressable onPress={handleNavigation} style={styles.guestRow}>
          <Text style={styles.guestLink}>CONTINUAR COMO CONVIDADO</Text>
          <View style={styles.guestUnderline} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────
const FONT_PIXEL = Platform.OS === 'ios' ? 'Courier New' : 'monospace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: U(6),
  },
  corner: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: C.pixelShadow,
    zIndex: 10,
  },
  cornerTL: { top: 16, left: 16 },
  cornerTR: { top: 16, right: 16 },
  cornerBL: { bottom: 16, left: 16 },
  cornerBR: { bottom: 16, right: 16 },

  titleArea: {
    alignItems: 'center',
    marginBottom: U(8),
  },
  appTitle: {
    fontFamily: FONT_PIXEL,
    fontSize: 32,
    fontWeight: '700',
    color: C.onSurface,
    letterSpacing: -0.5,
  },
  appTagline: {
    fontFamily: FONT_PIXEL,
    fontSize: 12,
    fontWeight: '700',
    color: C.tertiary,
    letterSpacing: 2,
    marginTop: U(2),
  },

  iconContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: U(12),
    marginTop: U(4),
  },
  floatingIcon: {
    width: 110,
    height: 110, 
  },

  buttonsArea: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },

  btnOuter: {
    position: 'relative',
    width: '100%',
    height: 54,
  },
  btnShadow: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    left: 4,
    top: 4,
    backgroundColor: C.pixelShadow,
  },
  btnFace: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: C.pixelShadow,
    backgroundColor: C.white,
  },
  btnLabel: {
    fontFamily: FONT_PIXEL,
    fontSize: 14,
    fontWeight: '700',
  },
  btnLabelSecondary: {
    color: C.onSurface,
  },
  btnIconWrap: {
    marginRight: U(3),
  },

  gLogo: {
    width: 16,
    height: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gBlock: {
    width: 8,
    height: 8,
  },

  guestRow: {
    alignItems: 'center',
    marginTop: U(6),
    paddingVertical: 4,
  },
  guestLink: {
    fontFamily: FONT_PIXEL,
    fontSize: 14,
    fontWeight: '700',
    color: C.onSurfaceVariant,
  },
  guestUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: C.onSurfaceVariant,
    marginTop: 2,
  },
});
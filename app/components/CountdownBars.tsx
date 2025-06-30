import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

// For circular, use react-native-svg or a library. Here is a simple static version:
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

export function PillGradientBar({ progress, daysLeft }: { progress: number; daysLeft: number }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: 4 }}>{daysLeft} days left</Text>
      <View style={{ height: 18, backgroundColor: '#e0e0e0', borderRadius: 9, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 }}>
        <LinearGradient
          colors={["#00c6fb", "#005bea"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{ width: `${progress * 100}%`, height: 18, borderRadius: 9 }}
        />
      </View>
    </View>
  );
}

export function StripesBar({ progress, daysLeft }: { progress: number; daysLeft: number }) {
  // This is a static stripes bar for demo; for animated stripes, use a custom SVG or Lottie
  return (
    <View style={{ marginBottom: 16 }}>
      <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: 4 }}>{daysLeft} days left</Text>
      <View style={{ height: 18, backgroundColor: '#e0e0e0', borderRadius: 9, overflow: 'hidden' }}>
        <View style={{ width: `${progress * 100}%`, height: 18, backgroundColor: '#007EE3', borderRadius: 9, flexDirection: 'row' }}>
          {[...Array(10)].map((_, i) => (
            <View key={i} style={{ width: 8, height: 18, backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'transparent' }} />
          ))}
        </View>
      </View>
    </View>
  );
}

export function ShimmerBar({ progress, daysLeft }: { progress: number; daysLeft: number }) {
  // For a real shimmer, use a Lottie or SVG shimmer; here is a static shimmer effect
  return (
    <View style={{ marginBottom: 16 }}>
      <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: 4 }}>{daysLeft} days left</Text>
      <View style={{ height: 18, backgroundColor: '#e0e0e0', borderRadius: 9, overflow: 'hidden' }}>
        <View style={{ width: `${progress * 100}%`, height: 18, backgroundColor: '#007EE3', borderRadius: 9 }}>
          <View style={{ position: 'absolute', left: '30%', top: 0, width: 40, height: 18, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 9, transform: [{ rotate: '20deg' }] }} />
        </View>
      </View>
    </View>
  );
}
export function CircularBar({ progress, daysLeft }: { progress: number; daysLeft: number }) {
  const size = 120; // Bigger size
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  return (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#ff6a00" />
            <Stop offset="40%" stopColor="#f7971e" />
            <Stop offset="70%" stopColor="#00c6fb" />
            <Stop offset="100%" stopColor="#005bea" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          stroke="#e0e0e0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference},${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <Text variant="titleLarge" style={{ position: 'absolute', top: size / 2 - 18, left: 0, right: 0, textAlign: 'center' }}>{daysLeft} days</Text>
    </View>
  );
}
export function LargeCircularBar({ progress, daysLeft }: { progress: number; daysLeft: number }) {
  const size = 120;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Animated progress value
  const animatedProgress = useSharedValue(1); // Start at full circle

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1200 });
  }, [progress]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgLinearGradient id="largeGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#ff6a00" />
            <Stop offset="20%" stopColor="#ffb347" />
            <Stop offset="40%" stopColor="#f9d423" />
            <Stop offset="60%" stopColor="#43e97b" />
            <Stop offset="80%" stopColor="#38f9d7" />
            <Stop offset="100%" stopColor="#667eea" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          stroke="#e0e0e0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke="url(#largeGrad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference},${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Text variant="titleLarge" style={{ position: 'absolute', top: size / 2 - 20, left: 0, right: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 28 }}>{daysLeft}d</Text>
    </View>
  );
}

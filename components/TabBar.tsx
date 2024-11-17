import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, View, StyleProp } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PressableScale } from "./PressableScale";
import { ViewStyle } from "react-native";

type TTab = {
  id: string;
  title: string;
};

type TTabBar = {
  tabs: TTab[];
  activeTab: string;
  onChangeTab: (id: string) => void;
  tabBarContainerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  tabBarTextStyle?: StyleProp<TextStyle>;
};

type TTabLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const initialTabLayout = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

type TCurrentTabLayout = Record<
  string,
  { width: number; height: number; x: number; y: number }
>;

const TabBar = ({
  activeTab,
  tabs,
  onChangeTab,
  tabBarContainerStyle,
  indicatorStyle,
  tabBarTextStyle,
  tabStyle,
}: TTabBar) => {
  const activeTabLayout = useSharedValue<TTabLayout>(initialTabLayout);
  const [layouts, setLayouts] = useState<TCurrentTabLayout>({});

  const handleLayout = (id: string, event: any, index: number) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    if (id === activeTab || index === 0) {
      activeTabLayout.value = { width, height, x, y };
    }
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      [id]: { width, height, x, y },
    }));
  };

  const onHandlePress = (item: TTab) => {
    onChangeTab(item.id);
    activeTabLayout.value = withTiming(layouts[item.id]);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: activeTabLayout.value.height,
      top: activeTabLayout.value.y,
      width: activeTabLayout.value.width,
      left: activeTabLayout.value.x,
    };
  });

  return (
    <View>
      <Animated.View
        style={[animatedStyle, styles.baseIndicatorStyle, indicatorStyle]}
      />
      <View style={[styles.baseTabBarContainerStyle, tabBarContainerStyle]}>
        {tabs.map((item, index) => (
          <PressableScale
            disabled={item.id === activeTab}
            key={item.id}
            onPress={() => onHandlePress(item)}
            onLayout={(event) => handleLayout(item.id, event, index)}
            style={tabStyle}
          >
            <Text style={tabBarTextStyle}>{item.title}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  baseTabBarContainerStyle: {
    flexDirection: "row",
  },
  baseIndicatorStyle: {
    position: "absolute",
  },
});

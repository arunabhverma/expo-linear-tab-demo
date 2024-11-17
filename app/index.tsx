import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import TabBar from "@/components/TabBar";

const TabData = [
  { id: "0", title: "All Issues" },
  { id: "1", title: "Active" },
  { id: "2", title: "Backlog" },
  { id: "3", title: "Current" },
];

const Main = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("");

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <TabBar
        tabs={TabData}
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabBarContainerStyle={styles.tabBarContainerStyle}
        tabStyle={[styles.tabStyle, { borderColor: theme.colors.border }]}
        indicatorStyle={[
          styles.indicatorStyle,
          { backgroundColor: theme.colors.border },
        ]}
        tabBarTextStyle={[styles.tabBarTextStyle, { color: theme.colors.text }]}
      />
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingVertical: 20,
  },
  tabBarContainerStyle: {
    gap: 10,
  },
  tabStyle: {
    borderWidth: 1,
    borderRadius: 10,
  },
  indicatorStyle: {
    borderRadius: 10,
  },
  tabBarTextStyle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.7,
  },
});

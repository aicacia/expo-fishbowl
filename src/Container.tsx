import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import { LARGE_WIDTH } from "./screens";
import { Layout } from "@ui-kitten/components";

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    maxWidth: LARGE_WIDTH,
    padding: 16,
  },
  content: {
    flex: 1,
  },
});

export interface IContainerProps {
  children: ReactNode;
}

export function Container(props: IContainerProps) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.content}>{props.children}</View>
        </View>
      </Layout>
    </SafeAreaView>
  );
}

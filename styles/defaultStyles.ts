import { StyleSheet } from "react-native";

export const SIZE = 100.0;
export const CIRCLE_RADIUS = SIZE * 2;
const secondary = "rgba(0, 0, 256, 0.5)";
const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "blue",
  },
  squareRgba: {
    width: SIZE,
    height: SIZE,
    backgroundColor: secondary,
    borderRadius: 20,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: secondary,
    margin: 10,
  },
});

export default defaultStyles;

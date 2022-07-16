import { Dimensions, StyleSheet } from "react-native";

export const { height, width } = Dimensions.get("window");
export const SIZE = 100.0;
export const SIZE07 = width * 0.7;
export const CIRCLE_RADIUS = SIZE * 2;

const secondary = "rgba(0, 0, 256, 0.5)";
const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    textAlign: "center",
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
  page: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "blue",
  },
  square07: {
    width: SIZE07,
    height: SIZE07,
    backgroundColor: "rgba(0,0,256, 0.5)",
  },
  squareRgba: {
    width: SIZE,
    height: SIZE,
    backgroundColor: secondary,
    borderRadius: 20,
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default defaultStyles;

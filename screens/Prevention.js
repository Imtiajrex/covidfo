import React, { useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Image,
	Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import layout from "../utils/layout";

export default function Prevention({ navigation }) {
	const scrollX = useRef(new Animated.Value(0)).current;
	const [state, setstate] = React.useState(0);
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="chevron-back" size={30} color={colors.accent} />
				</TouchableOpacity>
				<Text style={styles.title}>Prevention</Text>
			</View>
			<Animated.FlatList
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={layout.width - 40}
				scrollEventThrottle={16}
				decelerationRate={"fast"}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => {
					const inputRange = [
						(index - 1) * (layout.width - 40),
						index * (layout.width - 40),
						(index + 1) * (layout.width - 40),
					];
					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [20, 0, 20],
					});
					const textTranslateY = scrollX.interpolate({
						inputRange,
						outputRange: [10, 0, 10],
					});
					const scaleX = scrollX.interpolate({
						inputRange,
						outputRange: [0, 1, 0],
					});
					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0, 1, 0],
					});
					return (
						<View style={styles.tip}>
							<Animated.Image
								source={item.image}
								style={{
									...styles.image,
									opacity,
									transform: [{ scale: scaleX }],
								}}
							/>
							<Animated.Text
								style={{
									...styles.title,
									opacity,
									transform: [{ translateY: textTranslateY }],
								}}
							>
								{item.title}
							</Animated.Text>
							<Animated.View
								style={{
									...styles.underline,
									transform: [{ scaleX }],
								}}
							/>
							<Animated.Text
								style={{
									...styles.description,
									opacity,
									transform: [{ translateY }],
								}}
							>
								{item.description}
							</Animated.Text>
						</View>
					);
				}}
			/>
			<Animated.FlatList
				data={data}
				horizontal
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={{ justifyContent: "center", width: "100%" }}
				renderItem={({ _, index }) => {
					const inputRange = [
						(index - 5) * (layout.width - 40),
						(index - 1) * (layout.width - 40),

						index * (layout.width - 40),
						(index + 1) * (layout.width - 40),
						(index + 5) * (layout.width - 40),
					];
					const color = scrollX.interpolate({
						inputRange,
						outputRange: [
							"rgb(196,196,196)",
							"rgb(196,196,196)",
							"rgb(79,152,202)",
							"rgb(196,196,196)",
							"rgb(196,196,196)",
						],
					});
					return (
						<Animated.View
							style={[
								styles.indicator,
								{
									backgroundColor: color,
								},
							]}
						/>
					);
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 20,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	tip: {
		width: layout.width - 40,
		alignItems: "center",
	},
	image: {
		width: 350,
		height: 370,
		resizeMode: "cover",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 20,
		textAlign: "center",
		color: colors.accent,
	},
	underline: {
		padding: 5,
		borderRadius: 100,
		width: 80,
		height: 5,
		backgroundColor: colors.secondary,
	},
	description: {
		fontSize: 16,
		marginVertical: 20,
		textAlign: "center",
		color: colors.accent,
	},
	indicator: {
		width: 10,
		height: 10,
		borderRadius: 20,
		// backgroundColor: "#C4C4C4",
		margin: 7,
	},
});

const data = [
	{
		title: "Safe distancing",
		description:
			"Maintain a safe distance from anyone who is coughing or sneezing.",
		image: require("../assets/images/1.png"),
	},
	{
		title: "Hand washing",
		description:
			"Clean your hands often. Use soap and water, or an alcohol-based hand rub.",
		image: require("../assets/images/2.png"),
	},
	{
		title: "Wear mask",
		description: "Wear a mask when physical distancing is not possible.",
		image: require("../assets/images/3.png"),
	},
	{
		title: "At home",
		description: "Stay home if you feel unwell.",
		image: require("../assets/images/4.png"),
	},
	{
		title: "Seek Medical Attention",
		description:
			"If you have a fever, cough and difficulty breathing, seek medical attention.",
		image: require("../assets/images/5.png"),
	},
];

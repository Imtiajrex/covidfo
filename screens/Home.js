import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import colors from "../utils/colors";
import layout from "../utils/layout";
import AppLoading from "expo-app-loading";
import {
	Ionicons,
	MaterialCommunityIcons,
	AntDesign,
	Fontisto,
	Entypo,
} from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useState } from "react";
import { COVID_LINK, COVID_API_KEY, COVID_API_HOST } from "@env";
const d = new Date();
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
export default function Home({ navigation }) {
	const [data, setData] = useState(null);
	const _handlePressButtonAsync = async (url) => {
		WebBrowser.openBrowserAsync(url);
	};
	React.useEffect(() => {
		fetch(COVID_LINK, {
			method: "GET",
			headers: {
				"x-rapidapi-key": COVID_API_KEY,
				"x-rapidapi-host": COVID_API_HOST,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => setData(res[0]))
			.catch((err) => {
				console.error(err);
			});
	}, []);
	if (!data) return <AppLoading />;
	return (
		<ScrollView>
			<View style={styles.top}>
				<View style={styles.bd}>
					<Image
						source={require("../assets/images/bd.png")}
						style={{ width: 23, height: 15 }}
					/>
					<Text style={styles.small}>Bangladesh</Text>
				</View>
				<View style={[styles.bd, { marginTop: 10 }]}>
					<Text style={{ fontSize: 16, color: "#c4c4c4" }}>
						{d.getDate()}th {months[d.getMonth()]}
					</Text>
				</View>
				<View style={styles.chart_details}>
					<View style={styles.chart}>
						<AnimatedCircularProgress
							style={styles.progress}
							rotation={0}
							lineCap={"round"}
							size={layout.width - 165}
							width={18}
							fill={75}
							tintColor={colors.primary}
							backgroundColor="rgba(80, 216, 144, 0.5)"
						/>
						<AnimatedCircularProgress
							style={{ ...styles.progress, top: 30 }}
							rotation={0}
							lineCap={"round"}
							size={layout.width - 225}
							width={18}
							fill={35}
							tintColor={colors.tertiary}
							backgroundColor="rgba(221, 66, 76, 0.5)"
						/>
					</View>
					<View style={styles.details}>
						<MaterialCommunityIcons
							name="virus"
							size={30}
							color={colors.secondary}
						/>
						<Text style={styles.infected}>{data.confirmed}</Text>
						<Text
							style={{ marginTop: 10, color: colors.background, fontSize: 18 }}
						>
							<Text style={styles.recovered}>
								{parseInt((data.recovered / data.confirmed) * 100)}%{" "}
							</Text>{" "}
							/
							<Text style={styles.death}>
								{" "}
								{parseInt((data.deaths / data.confirmed) * 100)}%
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.infos}>
					<View style={styles.info}>
						<MaterialCommunityIcons
							name="virus"
							size={25}
							color={colors.secondary}
						/>
						<Text style={{ ...styles.number, color: colors.secondary }}>
							Infected
						</Text>
					</View>
					<View style={styles.info}>
						<AntDesign name="medicinebox" size={25} color={colors.primary} />
						<Text style={{ ...styles.number, color: colors.primary }}>
							Recovered
						</Text>
					</View>
					<View style={styles.info}>
						<Ionicons name="md-skull" size={25} color={colors.tertiary} />

						<Text style={{ ...styles.number, color: colors.tertiary }}>
							Dead
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottom}>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("Symptom")}
				>
					<View style={styles.screen_change}>
						<Image
							source={require("../assets/images/screen_change_2.png")}
							style={styles.image}
						/>
						<Text>Symptom Checker</Text>
						<Ionicons name="chevron-forward" size={30} color={colors.accent} />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("Prevention")}
				>
					<View style={styles.screen_change}>
						<Image
							source={require("../assets/images/screen_change_1.png")}
							style={styles.image}
						/>
						<Text>Covid Prevention</Text>
						<Ionicons name="chevron-forward" size={30} color={colors.accent} />
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						numberOfLines={2}
						onPress={() =>
							_handlePressButtonAsync("https://surokkha.gov.bd/enroll")
						}
					>
						<Fontisto
							name="injection-syringe"
							size={30}
							color={colors.secondary}
						/>
						<Text style={styles.button_text}>Vaccine Registration</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() =>
							_handlePressButtonAsync("https://surokkha.gov.bd/vaccine-status")
						}
					>
						<Entypo
							name="info-with-circle"
							size={30}
							color={colors.secondary}
						/>
						<Text
							style={styles.button_text}
							numberOfLines={2}
							lineBreakMode="tail"
						>
							Vaccine Info
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	top: {
		backgroundColor: colors.accent,
		borderBottomLeftRadius: 45,
		borderBottomRightRadius: 45,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	bd: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
	},
	small: {
		fontSize: 16,
		color: colors.background,
		fontFamily: "Roboto",
		marginLeft: 10,
	},
	chart_details: {
		marginTop: 20,
		width: layout.width - 150,
		height: layout.width - 150,
		position: "relative",
	},
	number: {
		marginLeft: 10,
	},
	chart: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		width: "100%",
	},
	progress: {
		position: "absolute",
		top: 0,
	},
	infos: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 10,
	},
	details: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: "30%",
	},
	infected: {
		color: colors.secondary,
		fontSize: 25,
	},
	recovered: {
		color: colors.primary,
		fontSize: 16,
		marginLeft: 10,
	},
	death: {
		color: colors.tertiary,
		fontSize: 16,
		marginRight: 10,
	},
	bottom: {
		padding: 20,
	},
	screen_change: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		alignItems: "center",
		marginVertical: 10,
		paddingHorizontal: 20,
	},
	info: {
		alignItems: "center",
		flexDirection: "row",
	},
	image: {
		width: 75,
		height: 55,
		resizeMode: "cover",
	},
	buttons: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginTop: 10,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		width: 120,
		height: 135,
		borderRadius: 12,
		backgroundColor: "rgba(79, 152, 202, 0.2)",
	},
	button_text: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.secondary,
		textAlign: "center",
		marginTop: 5,
	},
});

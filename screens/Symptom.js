import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import layout from "../utils/layout";
import { AnimatePresence, MotiText, MotiView, useAnimationState } from "moti";
import { useState } from "react";
import { SliderPicker } from "react-native-slider-picker";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AnimatedLottieView from "lottie-react-native";

const slideInLeft = {
	from: {
		opacity: 0,
		translateX: layout.width / 3,
	},
	animate: {
		opacity: 1,
		translateX: 0,
	},
	exit: {
		opacity: 0,
		translateX: -layout.width,
	},
};

export default function Symptom({ navigation }) {
	const [step, setStep] = useState(1);
	const [symptoms, setSymptoms] = useState({
		gender: null,
		age: null,
		symptoms: [],
	});
	const goBack = () => {
		if (step > 1) {
			setStep(step - 1);
		} else navigation.goBack();
	};
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/images/bg.png")}
				width={layout.width}
				height={layout.height}
				style={{ width: layout.width, height: layout.height, padding: 20 }}
			>
				<AnimatedCircularProgress
					rotation={0}
					lineCap={"round"}
					size={60}
					width={8}
					fill={step * 25}
					tintColor={colors.secondary}
					style={{ position: "absolute", top: 20, right: 20 }}
					backgroundColor="rgba(79, 152, 202, 0.3)"
				/>
				<View style={styles.top}>
					<TouchableOpacity onPress={goBack}>
						<Ionicons name="chevron-back" size={30} color={colors.accent} />
					</TouchableOpacity>
				</View>
				<AnimatePresence>
					{step == 1 && (
						<First
							setStep={setStep}
							setSymptoms={setSymptoms}
							symptoms={symptoms}
						/>
					)}
					{step == 2 && (
						<Second
							setStep={setStep}
							setSymptoms={setSymptoms}
							symptoms={symptoms}
						/>
					)}
					{step == 3 && (
						<Third
							setStep={setStep}
							setSymptoms={setSymptoms}
							symptoms={symptoms}
						/>
					)}
					{step == 4 && <Final symptoms={symptoms} navigation={navigation} />}
				</AnimatePresence>
			</ImageBackground>
		</View>
	);
}
const Final = ({ symptoms, navigation }) => {
	const animation = React.useRef();
	React.useEffect(() => {
		console.log(covid());
		if (!covid()) animation.current.play();
	}, []);
	const covid = () => symptoms.symptoms.length >= 3 && symptoms.age > 16;
	React;
	return (
		<MotiView style={styles.final}>
			{!covid() && (
				<AnimatedLottieView
					loop={false}
					autoPlay={covid()}
					speed={0.75}
					autoSize
					ref={animation}
					style={{
						width: layout.width,
						position: "absolute",
						transform: [{ scale: 1.5 }],
					}}
					source={require("../assets/animations/yay.json")}
				/>
			)}

			<MotiText
				style={{
					fontSize: 100,
					fontWeight: "bold",
					color: colors.accent,
					marginTop: 100,
				}}
			>
				{!covid() ? "Yay!" : "Sorry"}
			</MotiText>
			<MotiText
				style={{
					fontSize: 18,
					color: colors.background,
					marginTop: 120,
					marginLeft: 50,
					width: layout.width - 100,
					textAlign: "right",
				}}
			>
				{!covid()
					? "You most likely don’t have covid"
					: "You most likely have covid. You should consult a doctor for further assurance."}
			</MotiText>
			<MotiView {...slideInLeft} delay={100}>
				<TouchableOpacity
					style={{
						marginLeft: 50,
						width: layout.width - 100,
						paddingVertical: 10,
						backgroundColor: colors.tertiary,
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 50,
						borderRadius: 12,
					}}
					onPress={() => navigation.goBack()}
				>
					<Text style={styles.button_text}>Close</Text>
				</TouchableOpacity>
			</MotiView>
		</MotiView>
	);
};
const First = ({ setStep, setSymptoms, symptoms }) => {
	const next = () => {
		if (selection == null)
			return Alert.alert("No gender selected!", "You have to select a gender!");
		setSymptoms({ ...symptoms, gender: selection });
		setStep(2);
	};
	const [selection, setselection] = useState(symptoms.gender);
	return (
		<MotiView style={styles.step}>
			<MotiView style={styles.question_wrapper} {...slideInLeft}>
				<MotiView style={styles.number_wrapper}>
					<Text style={styles.number}>1</Text>
				</MotiView>
				<Text style={styles.question}>What is your sex?</Text>
			</MotiView>
			<MotiView style={styles.selection_wrapper}>
				<MotiView {...slideInLeft} delay={50}>
					<TouchableOpacity
						style={[
							styles.selection,
							{
								backgroundColor:
									selection == "F"
										? colors.secondary
										: "rgba(80, 216, 144, 0.2)",
							},
						]}
						onPress={() => setselection("F")}
					>
						<Ionicons
							name="female"
							size={30}
							color={selection == "F" ? colors.background : colors.primary}
						/>
						<Text
							style={[
								styles.selection_text,
								{
									color: selection == "F" ? colors.background : colors.primary,
								},
							]}
						>
							Female
						</Text>
					</TouchableOpacity>
				</MotiView>
				<MotiView {...slideInLeft} delay={80}>
					<TouchableOpacity
						style={[
							styles.selection,
							{
								backgroundColor:
									selection == "M"
										? colors.secondary
										: "rgba(80, 216, 144, 0.2)",
							},
						]}
						onPress={() => setselection("M")}
					>
						<Ionicons
							name="male"
							size={30}
							color={selection == "M" ? colors.background : colors.primary}
						/>
						<Text
							style={[
								styles.selection_text,
								{
									color: selection == "M" ? colors.background : colors.primary,
								},
							]}
						>
							Male
						</Text>
					</TouchableOpacity>
				</MotiView>
			</MotiView>
			<MotiView {...slideInLeft} delay={100}>
				<TouchableOpacity style={styles.button} onPress={next}>
					<Text style={styles.button_text}>Next</Text>
				</TouchableOpacity>
			</MotiView>
		</MotiView>
	);
};
const Second = ({ setStep, setSymptoms, symptoms }) => {
	const next = () => {
		setSymptoms({ ...symptoms, age });
		setStep(3);
	};
	const [age, setAge] = useState(symptoms.age);
	return (
		<MotiView style={styles.step}>
			<MotiView style={styles.question_wrapper}>
				<MotiView style={styles.number_wrapper} {...slideInLeft}>
					<MotiText style={styles.number}>2</MotiText>
				</MotiView>
				<MotiText style={styles.question} {...slideInLeft}>
					What is your age?
				</MotiText>
			</MotiView>
			<MotiView style={styles.age_wrapper}>
				<SliderPicker
					showFill={true}
					defaultValue={age}
					callback={(position) => {
						setAge(position);
					}}
					fillColor={colors.secondary}
					heightPercentage={2}
					buttonBackgroundColor={colors.secondary}
					showNumberScale={true}
					minValue={18}
					sliderInnerBackgroundColor={"rgba(79,152,202,0.5)"}
					maxValue={150}
				/>
				<Text style={styles.age}>I am {age} years old</Text>
			</MotiView>
			<MotiView {...slideInLeft} delay={100}>
				<TouchableOpacity style={styles.button} onPress={next} {...slideInLeft}>
					<Text style={styles.button_text}>Next</Text>
				</TouchableOpacity>
			</MotiView>
		</MotiView>
	);
};
const Third = ({ setStep, setSymptoms, symptoms }) => {
	const next = () => {
		setSymptoms({ ...symptoms, symptoms: problems });
		setStep(4);
	};
	const sickness = [
		"Fever",
		"Dry Cough",
		"Headache",
		"Throat Ache",
		"High blood pressure",
		"Weakness",
	];
	const [problems, setProblems] = useState(symptoms.symptoms);
	const toggleProblem = (sick) => {
		const newProblem = [...problems];
		const index = newProblem.indexOf(sick);
		if (index != -1) newProblem.splice(index, 1);
		else newProblem.push(sick);
		setProblems(newProblem);
	};
	const checkProblem = (sick) => problems.indexOf(sick) != -1;
	return (
		<MotiView style={styles.step}>
			<MotiView style={styles.question_wrapper}>
				<MotiView style={styles.number_wrapper} {...slideInLeft}>
					<Text style={styles.number}>3</Text>
				</MotiView>
				<MotiText style={styles.question} {...slideInLeft}>
					Check the symptoms that you have experienced within past 12 days?
				</MotiText>
			</MotiView>
			<MotiView style={styles.sick_wrapper}>
				{sickness.map((sick, index) => (
					<MotiView {...slideInLeft} delay={80} key={sick}>
						<TouchableOpacity
							style={[
								styles.sick,
								{
									backgroundColor: checkProblem(sick)
										? colors.secondary
										: "rgba(80, 216, 144, 0.2)",
								},
							]}
							onPress={() => toggleProblem(sick)}
						>
							<Text
								style={[
									styles.selection_text,
									{
										color: checkProblem(sick)
											? colors.background
											: colors.primary,
									},
								]}
							>
								{sick}
							</Text>
						</TouchableOpacity>
					</MotiView>
				))}
			</MotiView>

			<MotiView style={{}} {...slideInLeft} delay={100}>
				<TouchableOpacity style={styles.button} onPress={next}>
					<Text style={styles.button_text}>Next</Text>
				</TouchableOpacity>
			</MotiView>
		</MotiView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		// padding: 20,
	},
	final: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	step: {
		flex: 1,
		paddingVertical: 40,
		justifyContent: "space-between",
	},
	question_wrapper: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	number_wrapper: {
		justifyContent: "center",
		alignItems: "center",
		width: 45,
		height: 45,
		borderRadius: 50,
		borderColor: colors.accent,
		borderWidth: 2,
		marginRight: 10,
	},
	number: {
		fontSize: 20,
		fontWeight: "bold",
	},
	question: {
		width: "70%",
		fontSize: 18,
		fontWeight: "bold",
	},
	button: {
		width: "100%",
		borderRadius: 12,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
	},
	button_text: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.background,
	},
	age_wrapper: {
		marginTop: -80,
	},
	age: {
		fontSize: 25,
		color: colors.accent,
		textAlign: "center",
		marginVertical: 20,
	},
	selection_wrapper: {
		flexDirection: "row",
		width: "100%",
		flex: 1,
		// alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 40,
	},
	selection: {
		width: 150,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		backgroundColor: "rgba(80, 216, 144, 0.2)",
		borderRadius: 12,
	},
	sick_wrapper: {
		paddingVertical: 20,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		flex: 1,
		alignItems: "center",
	},
	sick: {
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		// paddingVertical: 5,
		paddingHorizontal: 20,
		backgroundColor: "rgba(80, 216, 144, 0.2)",
		borderRadius: 12,
	},
	selection_text: {
		marginVertical: 10,
		fontSize: 18,
		fontWeight: "bold",
	},
});

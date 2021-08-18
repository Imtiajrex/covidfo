import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native-reanimated";
import Home from "../screens/Home";
import Prevention from "../screens/Prevention";
import Symptom from "../screens/Symptom";
const forFade = ({ current, closing }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});
const Stack = createSharedElementStackNavigator();

const options = {
	animationTypeForReplace: "pop",
	gestureEnabled: false,
	headerBackTitleVisible: false,
	transitionSpec: {
		open: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
		close: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
	},
	cardStyleInterpolator: forFade,
};
export default function Root() {
	return (
		<Stack.Navigator headerMode="none" initialRouteName="Home">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Prevention" component={Prevention} />
			<Stack.Screen name="Symptom" component={Symptom} />
		</Stack.Navigator>
	);
}

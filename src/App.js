// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
// import Login from "./container/LoginContainer";
import SplashScreen from "./container/SplashScreenContainer";
import GridView from "./container/GridViewContainer";
import PaperView from "./container/PaperViewContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
	{
		// Login: { screen: Login },
        SplashScreen: { screen: SplashScreen },
        GridView: { screen: GridView },
		PaperView: { screen: PaperView },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "SplashScreen",
		headerMode: "none",
	}
);

export default () => (
	<Root>
		<App />
	</Root>
);

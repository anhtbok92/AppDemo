import * as React from "react";
import { Image } from "react-native";
const splashscreen = require("../../../../assets/splashscreen.png");
export interface Props {
    navigation: any;
}
export interface State {}
class SplashScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const navigation = this.props.navigation;
        setTimeout(() => {
            this.props.navigation.navigate("GridView");
        }, 1500);
    }

    render() {
        return (
            <Image
                source={splashscreen}
                style={{ flex: 1, height: null, width: null }}
            />
        );
    }
}

export default SplashScreen;

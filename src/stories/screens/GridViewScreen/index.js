import * as React from "react";
import { Container, Header, Title, Content, Left, Right, Body, Text } from "native-base";
import {
    ScrollView,
    View, Image,
    StyleSheet
} from "react-native";
import {
    RkText,
    RkButton,
    RkStyleSheet
} from "react-native-ui-kitten";
import { MainRoutes } from "../../../config/routes";

export interface Props {
    navigation: any;
}

export interface State {
}

class GridViewScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {dimensions: undefined};
    }

    _onLayout = event => {
        if (this.state.height) {
            return;
        }
        let dimensions = event.nativeEvent.layout;
        this.setState({dimensions});
    };

    _getEmptyCount(size) {
        let rowCount = Math.ceil((this.state.dimensions.height - 20) / size);
        return rowCount * 3 - MainRoutes.length;
    }

    render() {
        let navigate = this.props.navigation.navigate;
        let items = <View/>;

        if (this.state.dimensions) {
            let size = this.state.dimensions.width / 3;
            let emptyCount = this._getEmptyCount(size);

            items = MainRoutes.map(function (route, index) {
                return (
                    <RkButton rkType="tile"
                              style={{ height: size, width: size, borderRadius: 0, backgroundColor: "#333333" }}
                              key={index}
                              onPress={() => {
                                  navigate("PaperView", { router: route });
                              }}>
                        <View style={styles.wrapperRow}>
                            <Image
                                style={{width: 60, height: 60 }}
                                source={route.icon}
                                borderRadius={60 / 2}
                            />
                            <RkText rkType="small" style={{ textAlign: "center", marginTop: 5, color: "#FFFFFF", fontWeight: "bold" }}>{route.title}</RkText>
                        </View>
                    </RkButton>
                );
            });

            for (let i = 0; i < emptyCount; i++) {
                items.push(<View key={"empty" + i} style={[{height: size, width: size}, styles.empty]}/>);
            }
        }

        return (
            <Container>
                <Header style={{ backgroundColor: "#FF0000" }}>
                    <Left>
                        <Image source={require("../../../../assets/logo.jpg")} style={{width: 150, height: 35, resizeMode: "contain"}} />
                    </Left>
                    <Body>
                        <Title>Báo Net</Title>
                    </Body>
                </Header>
                <Content>
                    <ScrollView
                        style={styles.root}
                        onLayout={this._onLayout}
                        contentContainerStyle={styles.rootContainer}>
                        {items}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.screen.base
    },
    rootContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    empty: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border.base
    },
    icon: {
        marginBottom: 16
    },
    wrapperRow: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    }
}));

export default GridViewScreen;

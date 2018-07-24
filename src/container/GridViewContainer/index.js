// @flow
import * as React from "react";
import GridViewScreen from "../../stories/screens/GridViewScreen";
export interface Props {
    navigation: any,
    fetchNews: Function,
}
export interface State {}
export default class GridViewContainer extends React.Component<Props, State> {
    render() {
        console.log(this.props);
        return <GridViewScreen navigation={this.props.navigation} />;
    }
}

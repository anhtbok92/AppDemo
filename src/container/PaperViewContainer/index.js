// @flow
import * as React from "react";
import PaperView from "../../stories/screens/PaperView";

export interface Props {
    navigation: any,
}
export interface State {}

class PageViewContainer extends React.Component<Props, State> {
    render() {
        return <PaperView navigation={this.props.navigation}/>;
    }
}

export default PageViewContainer;

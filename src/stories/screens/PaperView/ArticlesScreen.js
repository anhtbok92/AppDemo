import React from "react";
import {
    FlatList,
    Image,
    View,
    TouchableOpacity
} from "react-native";
import {
    RkText,
    RkCard, RkStyleSheet
} from "react-native-ui-kitten";
let moment = require("moment");

export default class ArticlesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.data;
        console.log(this.data);
        this.renderItem = this._renderItem.bind(this);
    }

    _keyExtractor(post, index) {
        return post.id;
    }

    _renderItem(info) {
        return (
            <TouchableOpacity
                delayPressIn={70}
                activeOpacity={0.8}
                onPress={() => { console.log(222); }}>
                <RkCard rkType="imgBlock" style={styles.card}>
                    <Image rkCardImg source={info.thumbnail}/>

                    <View rkCardImgOverlay rkCardContent style={styles.overlay}>
                        <RkText rkType="header4 inverseColor">{info.title}</RkText>
                        {/*<RkText style={styles.time}*/}
                                {/*rkType="secondary2 inverseColor">{moment().add(info.item.time, "seconds").fromNow()}</RkText>*/}
                    </View>
                </RkCard>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                data={this.data}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.container}/>

        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 14
    },
    card: {
        marginVertical: 8,
    },
    time: {
        marginTop: 5
    }
}));

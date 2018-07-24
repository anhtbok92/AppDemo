import * as React from "react";
import { connect } from "react-redux";
import { View, TouchableHighlight, Image, FlatList } from "react-native";
import { Container, Header, Tab, Tabs, Text, Spinner, Left, Icon, Button, Body, Title, Right, ScrollableTab } from "native-base";
import { fetchNews } from "../../../container/GridViewContainer/actions";
import Timestamp from "../../../config/Timestamp";

export interface Props {
    navigation: any;
    data: Array,
}
export interface State {}
class PaperView extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    componentWillMount() {
        let router = this.props.navigation.state.params.router;
        console.log(router);
        this.props.fetchNews(router.children[0].link);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.articles !== nextProps.articles) {
            this.setState({ isLoading: false });
        }
    }

    onChangeTab(i) {
        this.setState({ isLoading: true });
        let children = this.props.navigation.state.params.router.children;
        let url = children[i];
        this.props.fetchNews(url.link);
    }

    renderNewsItem({item}) {
        let imageThumbnail = item.thumbnail === "" ? item.enclosure.link : item.thumbnail;
        return (
            <TouchableHighlight onPress={() => console.log(111)}>
                <View style={{ flex: 1, flexDirection: "row", borderWidth: 0.5 }}>
                    <View>
                        <Image
                            style={{width: 70, height: 70, marginTop: 5, marginLeft: 5, marginBottom: 5 }}
                            source={{uri: imageThumbnail}}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.itemView}>
                            <Text style={styles.item} numberOfLines={2} ellipsizeMode="tail">
                                {item.title}
                            </Text>
                            <Timestamp style={styles.published} dateTime={item.pubDate}/>
                        </View>
                    </View>
                    <View style={styles.div}/>
                </View>
            </TouchableHighlight>
        );
    }

    extractNewsItemKey(item) {
        return item.link;
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("GridView")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.router.title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs onChangeTab={({ i })=> this.onChangeTab(i)} renderTabBar={()=> <ScrollableTab />}>
                    {
                        this.props.navigation.state.params.router.children.map((value, index) => {
                            return (
                                <Tab heading={value.title} key={index} style={{flex: 1}}>
                                    {
                                        this.props.articles.length === 0 || this.state.isLoading ? <Spinner color="green"/> :
                                            <FlatList
                                                data={this.props.articles}
                                                renderItem={this.renderNewsItem}
                                                keyExtractor={this.extractNewsItemKey}
                                            />
                                    }
                                </Tab>
                            );
                        })
                    }
                </Tabs>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: url => dispatch(fetchNews(url)),
    };
};

const mapStateToProps = state => {
    return ({
        articles: state.newsReducer.articles,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PaperView);

const styles = {
    buttonContainer: {
        flexDirection: "row",
        marginRight: 10,
    },
    item: {
        marginVertical: 12,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: "bold",
        paddingHorizontal: 14,
    },
    div: {
        height: 0.5,
        backgroundColor: "#C0C0C0",
        marginHorizontal: 10,
    },
    itemView: {
        width: "92%",
    },
    published: {
        color: "#6C6C6C",
        paddingHorizontal: 14,
        marginBottom: 12,
    },
};

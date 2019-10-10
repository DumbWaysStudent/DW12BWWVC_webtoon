import React, { Component } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Text, Item, Input, View, Row, Button } from 'native-base';

export default class FavScreen extends Component {

    constructor() {
        super();
        this.state = {
            banners: [{
                title: 'Pasutri Gaje',
                image: 'https://4.bp.blogspot.com/-7RzHQQanlqY/XE7r94lzUCI/AAAAAAAACqI/keHhTWrJ1441h7vHWIL_FNf912DnsRMbQCLcBGAs/s1600/Pasutri%2BGaje%2BSeason%2B2%2BAnissa%2BNisfihani%2BWebtoon%2BIndonesia.JPG'
            }, {
                title: 'Young Mom',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmeLcEii64s4ZsDUz_Le5B504ibpjOQLvZlfMozb02YuwVhA6s3Q'
            }, {
                title: 'Born From Deadth',
                image: 'https://vignette.wikia.nocookie.net/webtoon/images/b/bd/SAMPUL_BFD.jpg/revision/latest?cb=20180715072050&path-prefix=id'
            }, {
                title: 'Terlalu Tampan',
                image: 'https://damniloveindonesia.com/image/catalog/explore_indonesia/Artikel/Terlalu_Tampan_1.jpg'
            }]
        }
    }

    render() {
        return (
            <Container>
                <Content>

                    <Header searchBar style={styles.header}>
                        <Item rounded>
                            <Input placeholder="Search Comics" />
                            <Icon name="ios-search" />
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                    </Header>

                    <FlatList
                        data={this.state.banners}
                        renderItem={({ item }) => (

                            <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                                <Row>
                                    <Image style={styles.imglist} source={{ uri: item.image }} />

                                    <View style={{ margin: 15 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {item.title} </Text>
                                        <Text style={{ marginTop: 10 }}> 90 Fav+ </Text>
                                    </View>
                                </Row>
                            </View>

                        )}
                        keyExtractor={item => item.id}
                    />
                </Content>

                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button onPress={() => this.props.navigation.navigate('ForYou')} >
                            <Icon name="apps" style={styles.icon} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('FavScreen')}>
                            <Icon name="star" style={styles.icon} />
                        </Button>
                        <Button>
                            <Icon name="person" style={styles.icon} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#38D40A'
    },

    footer: {
        backgroundColor: '#38D40A',
    },

    icon: {
        color: 'white'
    },

    imglist: {
        width: 120,
        height: 120,
        borderColor: 'black',
        borderWidth: 2
    }
})
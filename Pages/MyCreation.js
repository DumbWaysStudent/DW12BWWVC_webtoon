import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Text, View, Row, Fab } from 'native-base';

export default class MyCreation extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Webtoon',
            headerStyle: {
                backgroundColor: '#38D40A'
            },
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: '#fff',
        };
    };

    constructor() {
        super();
        this.state = {
            active: false,
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

                    <FlatList
                        data={this.state.banners}
                        renderItem={({ item }) => (

                            <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                                <Row>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditWebtoon', { title: item.title })} >
                                        <Image style={styles.imglist} source={{ uri: item.image }} />
                                    </TouchableOpacity>

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

                <View>
                    <Fab
                        active={this.state.active}
                        containerStyle={{}}
                        style={{ backgroundColor: '#38D40A' }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('CreateWebtoon')}>
                        <Icon name="ios-create" />
                    </Fab>
                </View>

            </Container >
        );
    }
}

const styles = StyleSheet.create({

    imglist: {
        width: 120,
        height: 120,
        borderColor: 'black',
        borderWidth: 2
    }
})
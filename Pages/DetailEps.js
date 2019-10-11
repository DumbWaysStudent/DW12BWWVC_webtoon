import React, { Component } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { View, Text, Content, Container } from 'native-base';

export default class DetailEps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banners: [{
                id: '1',
                image: 'https://summerballads.files.wordpress.com/2017/07/22.jpg?w=350&h=598',
            }, {
                id: '2',
                image: 'https://obs.line-scdn.net/0m0e2b0ed61b6d0130606e75107b21612b3d6f643d2516291a137b3d39282d3a366962613573303c5d3e2832346a/w644',
            }, {
                id: '3',
                image: 'https://i.pinimg.com/564x/2d/21/d1/2d21d1e480a0126bfc425ce9512d72b3.jpg',
            }, {
                id: '4',
                image: 'https://i.pinimg.com/564x/2d/21/d1/2d21d1e480a0126bfc425ce9512d72b3.jpg',
            },]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('eps'),
            headerStyle: {
                backgroundColor: '#38D40A'
            },
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: '#fff'

        };
    };

    render() {
        return (
            <Container>
                <Content>

                    <FlatList
                        data={this.state.banners}
                        renderItem={({ item }) => (
                            <View style={styles.comiccon}>
                                <Image style={styles.comicImage} source={{ uri: item.image }} />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    comiccon: {
        margin: 5,
        alignItems: 'center'
    },
    comicImage: {
        width: 400,
        height: 600,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 2
    }
});
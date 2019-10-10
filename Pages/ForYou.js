import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input, View, Row } from 'native-base';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

export default class ForYou extends Component {

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

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight, borderWidth: 2 }} source={{ uri: image }} />
      </View>
    );
  }

  render() {

    return (
      <Container>
        <Header searchBar style={styles.header}>
          <Item rounded>
            <Input placeholder="Search Comics" />
            <Icon name="ios-search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <View style={styles.carousel}>
            <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}
            >
              {this.state.banners.map((image, index) => this.renderPage(image.image, index))}
            </Carousel>
          </View>
          <View style={styles.scrolcon}>
            <Text style={styles.textFav}> Favorites </Text>
            <ScrollView horizontal={true} >
              {this.state.banners.map((image) => (

                <View style={styles.horizon} key={image.image}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen', { picture: image.image, title: image.title })}>
                    <Image source={{ uri: image.image }} style={styles.scrolimg} />
                    <Text style={styles.scroltxt}> {image.title} </Text>
                  </TouchableOpacity>
                </View>

              ))}
            </ScrollView>
          </View>
          <View styles={styles.allcon}>
            <Text style={styles.textAll}> All Comics </Text>
            {this.state.banners.map((image) => (
              <View key={image.image}>
                <Row>
                  <Image source={{ uri: image.image }} style={styles.rowimg} />
                  <View style={styles.titleall}>
                    <Text style={styles.rowtxt}> {image.title}  </Text>
                    <Button small success><Text> + Add To Favorite </Text></Button>
                  </View>

                </Row>
              </View>
            ))}
          </View>
        </Content>

        <Footer>
          <FooterTab style={styles.footer}>
            <Button>
              <Icon name="apps" style={styles.icon} />
            </Button>
            <Button>
              <Icon name="star" style={styles.icon} />
            </Button>
            <Button>
              <Icon name="person" style={styles.icon} />
            </Button>
          </FooterTab>
        </Footer>

      </Container>
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
  carousel: {
    flex: 1,
    alignSelf: 'center'
  },
  scrolcon: {
    margin: 10
  },
  textFav: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  horizon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  scrolimg: {
    width: 150,
    height: 150,
    marginRight: 25,
    marginTop: 5
  },
  scroltxt: {
    padding: 3,
    marginLeft: 5
  },
  textAll: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 2
  },
  allcon: {

  },
  rowimg: {
    width: 110,
    height: 110,
    marginTop: 5,
    borderWidth: 2,
    marginHorizontal: 15,
    marginVertical: 10
  },
  rowtxt: {
    marginTop: 10,
    padding: 15,
    fontWeight: 'bold'
  },
  titleall: {
    alignItems: 'center',
    marginLeft: 8
  }
})
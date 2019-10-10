import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Share } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Pages/Login';
import ForYou from './Pages/ForYou';
import DetailScreen from './Pages/DetailScreen'

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const signedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      title: 'Login',
      navigationOptions: { header: null }
    }
  }, {
  initialRouteName: 'Login'
}
);

const signedIn = createStackNavigator(
  {
    ForYou: {
      screen: ForYou,
      title: 'ForYou',
      navigationOptions: { header: null }
    },
    DetailScreen: {
      screen: DetailScreen,
      title: 'DetailScreen',
      navigationOptions: () => ({
        title: "Detail Webtoon",
        headerStyle: {
          backgroundColor: '#38D40A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
          <Icon name="share-alt" style={{ color: 'white', marginRight: 15, }} onPress={() => onShare()} />
        ),
      })
    }
  }, {
  initialRouteName: 'ForYou'
}
);

const Switch = createSwitchNavigator({
  signedIn: signedIn,
  signedOut: signedOut
}, {
  initialRouteName: 'signedOut'
});


export default createAppContainer(Switch);
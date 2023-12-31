import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import ProductsScreen from '../src/screens/ProductsScreen';
import WishListScreen from '../src/screens/WishListScreen';
import CartScreen from '../src/screens/CartScreen.js';
import ProfileScreen from '../src/screens/ProfileScreen.js';
import React from 'react';
import {View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Loader from '../src/components/Layout/Loader';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from '../src/components/Products/ProductDetails';
import {getCart, getWishList} from '../Redux/Actions/ProductAction';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import MyOrder from '../src/screens/MyOrder';
import OrderScreen from '../src/components/Order/OrderScreen';
import UpdateAccount from '../src/components/Profile/UpdateAccount';
import About from '../src/components/Home/About';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const {user, loading} = useSelector(state => state.user);
  const {wishlistData, error} = useSelector(state => state.wishList);
  const {cartData} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  console.log(cartData);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getWishList());
    dispatch(getCart());
  }, [dispatch, error, wishlistData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarHideOnKeyboard: true,
            }}
            initialRouteName="Home2">
            <Tab.Screen
              name="Home2"
              component={SimpleScreen}
              options={({route}) => ({
                tabBarStyle: {display: Visibility(route)},
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../src/Assets/BottomTab/home.png')}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        marginTop: 5,
                        tintColor: focused ? '#037730' : 'black',
                      }}
                    />
                    <Text style={{color: focused ? '#037730' : 'black'}}>
                      Home
                    </Text>
                  </View>
                ),
              })}
            />
            <Tab.Screen
              name="ProductsTab"
              component={ProductsScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../src/Assets/BottomTab/shop.png')}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        marginTop: 5,
                        tintColor: focused ? '#037730' : 'black',
                      }}
                    />
                    <Text style={{color: focused ? '#037730' : 'black'}}>
                      Products
                    </Text>
                  </View>
                ),
              }}
            />
            {/* <Tab.Screen
              name="wishlist"
              component={WishListScreen}
              options={{
                tabBarBadge: wishlistData?.length,
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../src/Assets/BottomTab/heart.png')}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        marginTop: 5,
                        tintColor: focused ? 'crimson' : 'black',
                      }}
                    />
                    <Text style={{color: focused ? 'crimson' : 'black'}}>
                      WishList
                    </Text>
                  </View>
                ),
              }}
            /> */}
            <Tab.Screen
              name="cart"
              component={CartScreen}
              options={{
                tabBarBadge: cartData?.length,
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../src/Assets/BottomTab/cart.png')}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        marginTop: 5,
                        tintColor: focused ? 'crimson' : 'black',
                      }}
                    />
                    <Text style={{color: focused ? 'crimson' : 'black'}}>
                      Cart
                    </Text>
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '-17%',
                    }}>
                    <Image
                      source={{
                        uri: user.photo_url,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 70,
                        marginTop: 5,
                        // border: '2%',
                        borderWidth: 2,
                        // borderColor: 'white',
                        borderColor: focused ? 'white' : 'white',
                      }}
                    />
                    <Text style={{color: focused ? '#037730' : 'black'}}>
                      {user.name}
                    </Text>
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </>
  );
}

const SimpleScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateAccount} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const Visibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if (routeName === 'ProductDetails') {
    return 'none';
  }

  if (routeName === 'MyOrder') {
    return 'none';
  }

  if (routeName === 'OrderScreen') {
    return 'none';
  }

  if (routeName === 'UpdateProfile') {
    return 'none';
  }

  if (routeName === 'Home') {
    return 'flex';
  }

  if (routeName == 'About') {
    return 'none';
  }
};

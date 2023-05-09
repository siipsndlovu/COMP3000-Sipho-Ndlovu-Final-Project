import SignInScreen from './Screens/SignInScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AccountInitContainer from '../AccountInit/AccountInitContainer'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountInitContainer: {
      screen: AccountInitContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default createAppContainer(AppNavigator);

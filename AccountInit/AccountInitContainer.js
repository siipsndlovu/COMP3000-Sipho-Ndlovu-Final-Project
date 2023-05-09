import AccountInitScreen from './Screens/AccountInitScreen';
import MainContainer from '../Navigation/MainContainer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
      AccountInit: {
        screen: AccountInitScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      MainContainer: {
        screen: MainContainer,
        navigationOptions: {
          headerShown: false,
        },
      },
    },
    {
      initialRouteName: 'AccountInit',
    }
  );
  
  export default createAppContainer(AppNavigator);

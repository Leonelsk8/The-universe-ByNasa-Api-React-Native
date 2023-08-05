import { StyleSheet, SafeAreaView, Platform} from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaView style={[styles.container,{paddingTop: Platform.OS === 'android' && 60}]}>
      <Routes />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(7,26,93,255)',
  }
});

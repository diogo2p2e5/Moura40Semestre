import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Header from './components/header/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
<>
{/* npx expo install react-native-safe-area-context */}
{/* Provê o suporte pra trablhar com a área segura visível do dispositivo móvel */}
<SafeAreaProvider>
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
    <Header />
      <Text style={styles.texto1}>Junior</Text>
      <Text style={styles.texto2}>Roberto</Text>
      <StatusBar style="auto" />
    </View>
  </SafeAreaView>
</SafeAreaProvider>
</>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeigth : 0
  },
  container: {
    width: "100%",
    height: "100%",
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "dashed"
  },
  texto1 : {
    color: "red"
  },
  texto2: {
    color: "blue"
  }
})
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,// mesma coisa que 100VH
//     backgroundColor: '#ccc',
//     borderWidth: 3,
//     borderStyle: 'solid',
//     borderColor: 'red'
//   },

// });
//  1245569
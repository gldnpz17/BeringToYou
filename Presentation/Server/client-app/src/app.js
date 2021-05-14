import { ThemeProvider } from "styled-components";
import NavigationBar from "./components/navigation-bar";
import NavigationOverlay from "./overlays/navigation-overlay";
import HomePage from "./pages/home-page";

const App = () => {
  const theme = {
    primary: '#427F66',
    primaryLight: '#70AF94',
    primaryDark: '#11523C',
    secondary: '#C5D784',
    secondaryLight: '#F9FFB5',
    secondaryDark: '#93A656',
    whitespace: '#F5F5F5',
    shadow: 'rgba(0, 0, 0, 0.5)'
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <NavigationOverlay id='navigation-overlay' />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { Header } from "./components/ui/layout/Header";
import CallToAction from "./components/CallToAction";
import AllSongs from "./components/AllSongs";
import Footer from "./components/Footer";
import theme from "./mui/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Header />
				<CallToAction />
				<AllSongs />
				<div style={{ height: "300px" }}></div>
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;

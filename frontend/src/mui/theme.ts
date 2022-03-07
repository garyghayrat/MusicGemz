import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
	palette: {
		mode: "dark",

		primary: {
			main: "#DE0050",
		},

		secondary: {
			main: "#001E3A",
		},
	},

	typography: {
		fontFamily: ["Rubik", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
			","
		),
	},

	shape: {
		borderRadius: 10,
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 100,
					fontSize: "1rem",
					fontWeight: 500,
				},
			},
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;

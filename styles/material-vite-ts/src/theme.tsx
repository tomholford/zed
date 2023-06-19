import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { TOKEN } from './tokens';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: TOKEN.PRIMARY,
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;

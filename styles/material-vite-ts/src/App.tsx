import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { TOKEN } from './tokens';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

const ZDSButton = () => {
    return (
        <button style={{
            color: `${TOKEN.PRIMARY}`,
            backgroundColor: `${TOKEN.BASE}`,
            border: `1px solid ${TOKEN.BORDER}`,
            padding: '8px 16px',
            borderRadius: '4px',
        }}>Button Text</button>
    )
}

const ZDSCard = () => {
    return (
        <div style={{
            color: `${TOKEN.PRIMARY}`,
            backgroundColor: `${TOKEN.SURFACE}`,
            border: `1px solid ${TOKEN.SURFACE_BORDER}`,
            padding: '8px 16px',
            borderRadius: '2px',
            width: '200px',
            height: '140px',
        }}>Card</div>
    )
}

const ZDSCardVariant = () => {
    return (
        <div style={{
            color: `${TOKEN.PRIMARY}`,
            backgroundColor: `${TOKEN.SURFACE_VARIANT}`,
            border: `1px solid ${TOKEN.SURFACE_VARIANT_BORDER}`,
            padding: '8px 16px',
            borderRadius: '2px',
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{
                color: `${TOKEN.PRIMARY}`
            }}>This is a headline</h1>
            <p style={{
                color: `${TOKEN.SUBTLE}`
            }}>This is a paragraph</p>
            <p style={{
                color: `${TOKEN.MUTED}`
            }}>This is muted text</p>
            <p style={{
                color: `${TOKEN.MINIMUM}`
            }}>This is a placholder</p>
            <ZDSButton />
        </div>
    )
}

type Color = keyof typeof TOKEN;

type Colors = Record<keyof typeof TOKEN, string>;

function createSquares(colorObject: Record<Color, string>) {
    const squares = Object.keys(colorObject).map((key) => {
        const keyColor = key as Color;

        console.log(key)
        const squareStyle: React.CSSProperties = {
            position: 'relative',
            width: '16px',
            height: '64px',
            backgroundColor: colorObject[keyColor],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        };

        const labelStyle: React.CSSProperties = {
            position: 'absolute',
            height: '8px',
            lineHeight: '8px',
            top: '60px',
            left: '4px',
            transform: 'rotate(90deg)',
            transformOrigin: 'bottom left',
            fontSize: '6px',
            whiteSpace: 'nowrap',
        };

        return (
            <div key={key} style={squareStyle}>
                <span style={labelStyle}>{key}</span>
            </div>
        );
    });

    return (
        <div style={{
            display: 'flex',
            gap: '1px'
        }}>
            {squares}
        </div>
    );
}

function ColorSquares() {
    const squares = createSquares(TOKEN);

    return (
        <div className='App'>
            {squares}
        </div>
    );
}

export default function App() {
    return (
        <Container maxWidth="sm">
            <ZDSButton />
            <ZDSCard />
            <ZDSCardVariant />
            <ColorSquares />
        </Container>
    );
}

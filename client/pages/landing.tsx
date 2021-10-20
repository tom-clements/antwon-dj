import { RootContainer } from 'components/core/RootContainer';
import { SpinnerQRCode } from 'components/atoms/QRCode';
import { Box, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const RootBox = styled(Box)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TextBox = styled(Box)`
    color: ${grey[500]};
    text-align: center;
    justify-content: center;
    margin: ${props => props.theme.spacing(5, 0)};
`;

// todo, move baseUrl determination to environment config!
const getQRData = (roomCode: string) => `https://www.djantwon.com/room?code=${roomCode}`;

export default function SpinnerPage() {
    return (
        <RootContainer>
            <RootBox>
                <SpinnerQRCode data={getQRData('soiree')} size={256} />
                <TextBox>
                    <Typography variant="h1">
                        djantwon.com
                    </Typography>
                    <Typography variant="h3">
                        Room code: <em><strong>SOIREE</strong></em>
                    </Typography>
                </TextBox>
            </RootBox>
        </RootContainer>
    );
}

import React from 'react';
import { useRouter } from 'next/router';
import { RootContainer } from 'components/core/RootContainer';
import { QRCodeModuleVariant, SpinnerQRCode } from 'components/atoms/QRCode';
import { Box, Link, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getClientBaseUrl } from 'service/Config';
import { getSingleFromUrlQuery } from 'service/GetFromUrlQuery';
import { ErrorCode } from 'model/enums/ErrorCode';
import { ErrorRedirect } from 'components/error/ErrorRedirect';

const RootBox = styled(Box)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const QRBox = styled(Box)`
    width: 16em;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextBox = styled(Box)`
    color: ${grey[500]};
    text-align: center;
    justify-content: center;
    margin: ${props => props.theme.spacing(5, 0)};
`;

export function getRoomUrl(roomCode: string) {
    const clientBaseUrl = getClientBaseUrl();
    return `${clientBaseUrl}room?code=${roomCode}`;
}

export default function SpinnerPage() {
    const router = useRouter();
    if (!router.isReady) return null;

    const roomCode = getSingleFromUrlQuery(router.query, 'roomCode');

    if (!roomCode) return <ErrorRedirect errorCode={ErrorCode.Unknown} />; 

    const roomUrl = getRoomUrl(roomCode);

    return (
        <RootContainer>
            <RootBox>
                <QRBox>
                    <SpinnerQRCode data={roomUrl} variant={QRCodeModuleVariant.DiamondWithSquareFinder} />
                </QRBox>
                <TextBox>
                    <Typography variant="h2">
                        djantwon.com
                    </Typography>
                    <Typography variant="h5">
                        Room code: <em><strong>{roomCode}</strong></em>
                    </Typography>
                    <br />
                    <Link variant='body2' underline="hover" href={roomUrl} target="_blank">
                        {roomUrl}
                    </Link>
                </TextBox>
            </RootBox>
        </RootContainer>
    );
}

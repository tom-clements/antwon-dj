import React from 'react';
import { useRouter } from 'next/router';
import { RootContainer } from 'common/components/RootContainer';
import { Box, Link, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getRelativeRoomUrl, getFullRoomUrl } from 'room/services/getRoomUrl';
import { getSingleFromUrlQuery } from 'common/services/getSingleFromUrlQuery';
import { ErrorCode } from 'common/model/ErrorCode';
import { ErrorRedirect } from 'common/components/ErrorRedirect';
import { QRCodeModuleVariant } from 'qr-code/QRCodeModule';
import { SpinnerQRCode } from 'qr-code/SpinnerQRCode';

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

export default function RoomSharePage() {
    const router = useRouter();
    if (!router.isReady) return null;

    const code = getSingleFromUrlQuery(router.query, 'code');

    if (!code) return <ErrorRedirect errorCode={ErrorCode.Unknown} />; 

    const relativeRoomUrl = getRelativeRoomUrl(code);
    const fullRoomUrl = getFullRoomUrl(code);

    return (
        <RootContainer>
            <RootBox>
                <QRBox>
                    <SpinnerQRCode data={fullRoomUrl} variant={QRCodeModuleVariant.DiamondWithSquareFinder} />
                </QRBox>
                <TextBox>
                    <Typography variant="h2">
                        djantwon.com
                    </Typography>
                    <Typography variant="h5">
                        Room code: <em><strong>{code}</strong></em>
                    </Typography>
                    <br />
                    <Link variant='body2' underline="hover" href={relativeRoomUrl} target="_blank">
                        {fullRoomUrl}
                    </Link>
                </TextBox>
            </RootBox>
        </RootContainer>
    );
}

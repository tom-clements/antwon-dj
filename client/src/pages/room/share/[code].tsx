import React from 'react';
import { RootContainer } from 'common/components/RootContainer';
import { Box, Link, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getRelativeRoomUrl, getFullRoomUrl } from 'room/services/getRoomUrl';
import { useDependencies } from 'common/hooks/useDependencies';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';
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
    const code = useDependencies(d => d.useParameterFromRouter)('code');
    useDependencies(d => d.useToastErrorRedirect)({
        condition: code === null,
        code: ToastErrorCode.RoomNotFound,
    });

    if (!code) return null;
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

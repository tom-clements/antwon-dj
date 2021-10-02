import { RootContainer } from 'components/core/RootContainer';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';
import { Box, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

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
    margin-bottom: ${props => props.theme.spacing(4)};
`;

const QRCode = styled('img')`
    width: 20%;
`;

export default function SpinnerPage() {
    return (
        <RootContainer>
            <RootBox>
                <SpinnerPageSize />
                <TextBox>
                    <Typography variant="h1">
                        djantwon.com
                    </Typography>
                    <Typography variant="h3">
                        Room code: <em><strong>SOIREE</strong></em>
                    </Typography>
                </TextBox>
                <QRCode src={'/soiree-qr.svg'}/>
            </RootBox>
        </RootContainer>
    );
}

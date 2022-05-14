import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import { HideOnView } from 'common/components/HideOnView';

const BackButtonContainer = styled(IconButton)`
    margin-right: ${props => props.theme.spacing(2)};
`;

interface Props {
    title: string;
    onGoBack?: () => void;
}

const BackButton: FC<Pick<Props, 'onGoBack'>> = props => {
    if (!props.onGoBack) return null;
    return (
        <BackButtonContainer edge="start" aria-label="go back" onClick={props.onGoBack}>
            <ArrowBack />
        </BackButtonContainer>
    );
};

export const SettingsView: FC<Props> = props => {
    return (
        <>
            <HideOnView>
                <AppBar>
                    <Toolbar>
                        <BackButton onGoBack={props.onGoBack} />
                        <Typography variant="h6" component="div">
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnView>
            <Toolbar />
            {props.children}
        </>
    );
};

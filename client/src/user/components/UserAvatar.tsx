import { FC } from 'react';
import { styled, Avatar } from '@mui/material';
import { UserModel } from 'user/model/UserModel';
import { isValidHttpUrl } from 'common/predicates/isValidHttpUrl';

const Container = styled('div')`
    display: flex;
    align-items: center;
`;

const StyledAvatar = styled(Avatar)`
`;

interface Props {
    user: UserModel | null;
}

const getInitial = (name: string) => {
    if (!name || name.length < 1) return '?';
    return name[0];
};

const getTitle = (name: string) => {
    if (!name) return '?';
    return name;
};

const AvatarIcon: FC<Props> = props => {
    if (!props.user) return (
        <StyledAvatar title='?' />
    );

    const title = getTitle(props.user.name);

    if (!isValidHttpUrl(props.user.imageUrl)) return (
        <StyledAvatar title={title}>{getInitial(props.user.name)}</StyledAvatar>
    );

    return (
        <StyledAvatar title={title} alt={title} src={props.user.imageUrl} />
    );
};

export const UserAvatar: FC<Props> = props => {
    return (
        <Container>
            <AvatarIcon {...props} />
        </Container>
    );
};

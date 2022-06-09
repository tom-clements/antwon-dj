import { RootContainer } from 'common/components/RootContainer';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useDependencies } from 'common/hooks/useDependencies';

export default function LogoutPage() {
    useDependencies(d => d.useLogoutLoop)();

    return (
        <RootContainer>
            <FullPageSpinner />
        </RootContainer>
    );
}

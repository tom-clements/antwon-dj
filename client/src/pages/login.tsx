import { RootContainer } from 'common/components/RootContainer';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useDependencies } from 'common/hooks/useDependencies';

export default function LoginPage() {
    useDependencies(d => d.useLoginLoop)();

    return (
        <RootContainer>
            <FullPageSpinner />
        </RootContainer>
    );
}

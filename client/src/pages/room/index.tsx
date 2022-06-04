import { RootContainer } from 'common/components/RootContainer';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useDependencies } from 'common/hooks/useDependencies';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export default function RoomPage() {
    // There is currently no content expected at /room, so redirect.
    // TODO, probably redirect as a general case at a custom 404 page? Yes.
    useDependencies(d => d.useToastErrorRedirect)({
        condition: true,
        code: ToastErrorCode.NotFound,
    });
    return (
        <RootContainer>
            <FullPageSpinner />
        </RootContainer>
    );
}

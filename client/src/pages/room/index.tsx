import { RootContainer } from 'common/components/RootContainer';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useToastErrorRedirect } from 'toastError/hooks/useToastErrorRedirect';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export default function RoomPage() {
    // There is currently no content expected at /room, so redirect.
    // TODO, probably redirect as a general case at a custom 404 page? Yes.
    useToastErrorRedirect(true, ToastErrorCode.NotFound);
    return (
        <RootContainer>
            <FullPageSpinner />
        </RootContainer>
    );
}

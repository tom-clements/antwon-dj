import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export const getToastErrorContent = (code?: ToastErrorCode | null) => {
    switch (code) {
        case ToastErrorCode.Unknown:
            return {
                title:
                    <>Uh-oh, &apos;something&apos; happened...</>,
                description:
                    <>An unexpected error has occurred, don&apos;t worry we&apos;re on it.</>,
                helpText:
                    <>Please try again or contact support.</>,
            };
        case ToastErrorCode.NotFound:
            return {
                title:
                    <>Mattsudaaa, where are youuu...</>,
                description:
                    <>Looks like something is missing. Either this is intended or we&apos;ve broken something.</>,
                helpText:
                    <>Please try again or contact support.</>,
            };
        case ToastErrorCode.RoomNotFound:
            return {
                title:
                    <>I can&apos;t hear you, Clem Fandango!</>,
                description:
                    <>Oops, it looks like the room you were looking for does not exist.</>,
                helpText:
                    <>Please try again or check the code with the host.</>,
            };
        default:
            return null;
    }
};

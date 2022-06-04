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
        case ToastErrorCode.BadRequest:
            return {
                title:
                    <>No. Try not. Do… or do not. There is no try.</>,
                description:
                    <>Looks like something is wrong with your request.</>,
                helpText:
                    <>Please try again.</>,
            };
        case ToastErrorCode.RoomValidation:
            return {
                title:
                    <>No. Try not. Do… or do not. There is no try.</>,
                description:
                    <>Looks like something is wrong with your room request.</>,
                helpText:
                    <>Please try again.</>,
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
        case ToastErrorCode.Unauthorized:
            return {
                title:
                    <>Who are you?</>,
                description:
                    <>You need to be logged in and authenticated to do that.</>,
                helpText:
                    <>Please try again or contact support.</>,
            };
        case ToastErrorCode.Forbidden:
            return {
                title:
                    <>Ah ah ah, you didn&apos;t say the magic word!</>,
                description:
                    <>Looks like you dont&apos;t have permission to do that.</>,
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
        case ToastErrorCode.Conflict:
            return {
                title:
                    <>Doppelgänger? No thanks</>,
                description:
                    <>It looks like that already exists.</>,
                helpText:
                    <>Please try again.</>,
            };
        case ToastErrorCode.RoomAlreadyExists:
            return {
                title:
                    <>Doppelgänger? No thanks</>,
                description:
                    <>The new room you have requested already exists..</>,
                helpText:
                    <>Please try again with a new room code.</>,
            };
        case ToastErrorCode.LikeAlreadyExists:
            return null; // Silently handle and log this to avoid blocking the UI
        default:
            return null;
    }
};

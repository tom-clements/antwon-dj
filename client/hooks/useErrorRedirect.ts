import { useEffect } from "react";
import { useRouter } from "next/router";
import { ErrorCode } from "model/enums/ErrorCode";
import { setError } from "model/slices/ErrorSlice";
import { useAppDispatch } from "model/Store";

export const useErrorRedirect = (
    condition: boolean,
    errorCode: ErrorCode,
    redirectPath: string
) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (condition) {
            router.push({ pathname: redirectPath });
            dispatch(setError(errorCode));
        }
    }, [router, dispatch, condition]);
}

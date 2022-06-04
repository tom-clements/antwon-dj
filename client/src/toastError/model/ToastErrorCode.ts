/**
 * List of known application error codes. These can be tracked in state
 * and displayed through the `ToastError` component.
 *
 * **Adding new codes**
 * Pop the following snippet into a JavaScript interpreter and check the result
 * for conflicts before adding a new case:
 *
 * ```js
 * Math.floor(Math.random() * 9999);
 * ```
 */
export enum ToastErrorCode {
    Unknown = 0,
    NotFound = 404,
    RoomNotFound = 4041,
}

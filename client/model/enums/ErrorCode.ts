/**
 * List of known application error codes. These can be tracked in state
 * and displayed through the `ErrorToast` component.
 *
 * **Adding new codes**
 * Pop the following snippet into a JavaScript interpreter and check the result
 * for conflicts before adding a new case:
 *
 * ```js
 * Math.floor(Math.random() * 1000);
 * ```
 */
export enum ErrorCode {
    RoomNotFound = 250,
}

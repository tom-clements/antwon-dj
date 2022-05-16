/**
 * Generic hook function to encapsulate imperative component logic.
 * This modelling purposefully mirrors a functional React component to indicate that their
 * semantics can be composable, mockable, and injectable in much the same way.
 */
export type HookFunction<TProps = Record<string, never>, TReturn = void> = (props: TProps) => TReturn;

/**
 * Alias of `HookFunction<TProps = {}, TReturn = void>`.
 */
export type HF<TProps = Record<string, never>, TReturn = void> = HookFunction<TProps, TReturn>;

/**
 * Gets the props or first argument of a given hook function.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HookProps<THook> = THook extends HF<infer _TProps, infer _TReturn>
    ? Parameters<THook>[0]
    : never;

/**
 * Gets the return type of a given hook function.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HookReturn<THook> = THook extends HF<infer _TProps, infer _TReturn>
    ? ReturnType<THook>
    : never;

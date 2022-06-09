import { UseRouter } from 'common/hooks/useRouter';

export const mockUseRouter = (props: Partial<ReturnType<UseRouter>> = {}): UseRouter => () => ({
    isHome: props.isHome ?? false,
    goTo: props.goTo ?? (() => undefined),
    goToExternal: props.goToExternal ?? (() => undefined),
    goBack: props.goBack ?? (() => undefined),
});

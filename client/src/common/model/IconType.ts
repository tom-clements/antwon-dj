import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

export type IconType = OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
};

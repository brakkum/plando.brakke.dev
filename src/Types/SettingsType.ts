import { SelectOptionType } from "./SelectOptionType";
import { BooleanOptionType } from "./BooleanOptionType";

export type SettingsType = {
    [setting: string]: SelectOptionType | BooleanOptionType
};

import { SelectOption } from "../Types/SelectOption";
import { BooleanOption } from "../Types/BooleanOption";

export type SettingsType = {
    [setting: string]: SelectOption | BooleanOption
};

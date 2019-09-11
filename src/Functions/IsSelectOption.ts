import { BooleanOption } from "../Types/BooleanOption";
import { SelectOption } from "../Types/SelectOption";

export function isSelectOption(option: BooleanOption | SelectOption): option is SelectOption {
    return (option as SelectOption).options !== undefined;
}


export type LocationPoolDisplayProps = {
    name: string,
    availableLocations: string[],
    locations: {[s: string]: string},
    items: string[],
    toggleLocationFunction: Function,
    updateLocationFunction: Function
};

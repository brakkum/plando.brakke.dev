
export type LocationPoolDisplayProps = {
    name: string,
    availableLocations: string[],
    locations: {[s: string]: string},
    items: string[],
    toggleLocationEnabled: Function,
    updateLocation: Function
};


export type OverworldPoolDisplayProps = {
    name: string,
    availableEntrances: string[],
    overworldEntrances: {[s: string]: object},
    toggleOverworldEntranceEnabled: Function,
    updateOverworldEntrance: Function
};

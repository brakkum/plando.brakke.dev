import { OverworldPoolDisplayProps } from "./Props/OverworldPoolDisplayProps";
import React from "react";

function OverworldPoolDisplay({
    name,
    availableEntrances,
    overworldEntrances,
    toggleOverworldEntranceEnabled,
    updateOverworldEntrance,
}: OverworldPoolDisplayProps) {

    let entranceObjects: object[] = [];
    availableEntrances.forEach(entrance => {
        let arr = entrance.split(" -> ");
        entranceObjects.push({"region": arr[0], "from": arr[1]});
    });

    return (
        <div className="locations-pool-display">
        <h3 className="is-size-3">{name}</h3>
        <div className={`locations ${name}`}>
            {availableEntrances.length > 0 ?
            availableEntrances.sort().map((entrance, i) => {
                let entranceIsEnabled = overworldEntrances[entrance] !== undefined;
                return <div key={i} className="location">
                    <h5
                        onClick={() => toggleOverworldEntranceEnabled(entrance)}
                        className={(entranceIsEnabled ? "enabled" : "disabled")}
                    >
                        {entrance}
                    </h5>
                    {entranceIsEnabled && <div className="">
                        <div className="select is-small setting-select">
                            <select
                                onChange={e => updateOverworldEntrance(entrance, e.target.value)}
                                defaultValue={entrance}
                            >
                                {entranceObjects.map((obj: any, j) => {
                                    return <option key={j} value={JSON.stringify(obj)}>
                                        {`${obj.region} -> ${obj.from}`}
                                    </option>
                                })}
                            </select>
                        </div>
                    </div>}
                </div>
            })
            :
            <h5 className="is-size-5">Not Available</h5>
            }
        </div>
    </div>
    )
}

export default OverworldPoolDisplay;

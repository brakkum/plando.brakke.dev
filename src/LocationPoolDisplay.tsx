import { LocationPoolDisplayProps } from "./Props/LocationPoolDisplayProps";
import React from "react";

function LocationPoolDisplay({
    name,
    availableLocations,
    locations,
    items,
    toggleLocationFunction,
    updateLocationFunction
}: LocationPoolDisplayProps) {

    return (
        <div className="locations-pool-display">
            <h3 className="is-size-3">{name}</h3>
            <div className={`locations ${name}`}>
                {availableLocations.length > 0 ?
                availableLocations.sort().map((location, i) => {
                    let locationIsEnabled = locations[location] !== undefined;
                    return <div key={i} className="location">
                        <h5
                            onClick={() => toggleLocationFunction(location)}
                            className={(locationIsEnabled ? "enabled" : "disabled")}
                        >
                            {location}
                        </h5>
                        {locationIsEnabled && <div className="">
                            <div className="select is-small setting-select">
                                <select
                                    onChange={e => updateLocationFunction(location, e.target.value)}
                                    defaultValue={locations[name]}
                                >
                                    {items.map((item, j) => {
                                        return <option key={j} value={item}>
                                            {item}
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
};

export default LocationPoolDisplay;

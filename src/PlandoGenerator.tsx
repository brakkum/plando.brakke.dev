import { VanillaLocationPool } from "./ItemLocations/VanillaLocationPool";
import { VanillaItemPool } from "./ItemPools/VanillaItemPool";
import { SelectOption } from "./Types/SelectOption";
import { Settings } from "./Settings/Settings";
import React, { useState } from "react";
import "./PlandoGenerator.css";

function PlandoGenerator() {

    const [settings, setSettings]: [{[s: string]: boolean | string }, Function] = useState({});
    const [locations, setLocations]: [string[], Function] = useState([]);

    // functions
    const toggleSettingEnabled = (name: string): void => {
        let _settings = settings;
        let defaultValue;
        if ((Settings[name] as SelectOption).options !== undefined) {
              defaultValue = (Settings[name] as SelectOption).options[0];
        } else {
            defaultValue = false;
        }
        _settings[name] !== undefined ? delete _settings[name] : _settings[name] = defaultValue;
        setSettings({..._settings});
    };

    const updateSetting = (name: string, value: string) => {
        let _settings = settings;
        _settings[name] = ["false", "true"].includes(value) ? Boolean(value) : value;
        setSettings({..._settings});
    };

    // populate options
    let availableLocations = VanillaLocationPool;
    let availableItems = VanillaItemPool;
console.log(settings)
    return (
        <div className="plando-generator">
            {/* Settings that influence what options are populated */}
            <div className="plando-settings">
                <h2>Settings</h2>
                <h4>Click setting name to enable/disable it</h4>
                {Object.keys(Settings).map(name => {
                    let settingEnabled = settings[name] !== undefined;
                    let options: JSX.Element[];
                    let arr = (Settings[name] as SelectOption).options !== undefined ? (Settings[name] as SelectOption).options : ["false", "true"];
                    options = arr.map((option: string, i: number) => {
                        return <option key={i} value={option}>
                            {option}
                        </option>
                    });
                    return <div>
                        <h4 onClick={() => toggleSettingEnabled(name)} className={settingEnabled ? "setting-enabled" : "setting-disabled"}>
                            {name}
                        </h4>
                        {settingEnabled && <select onChange={e => updateSetting(name, e.target.value)} defaultValue={settings[name].toString()}>
                            {options}
                        </select>}
                    </div>
                })}
            </div>
        </div>
    );
}

export default PlandoGenerator;

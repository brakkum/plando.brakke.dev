import { StartingItemPool } from "./ItemPools/StartingItemPool";
import { SelectOptionType } from "./Types/SelectOptionType";
import OverworldPoolDisplay from "./OverworldPoolDisplay";
import LocationPoolDisplay from "./LocationPoolDisplay";
import { Settings } from "./Settings/Settings";
import React, { useState } from "react";
import FileSaver from "file-saver";
import "./PlandoGenerator.css";
// location pools
import { BossKeyLocationPool } from "./ItemLocations/BossKeyLocationPool";
import { CompassLocationPool } from "./ItemLocations/CompassLocationPool";
import { CowLocationPool } from "./ItemLocations/CowLocationPool";
import { DekuScrubLocationPool } from "./ItemLocations/DekuScrubLocationPool";
import { DungeonLocationPool } from "./ItemLocations/DungeonLocationPool";
import { GanonsBossKeyLocationPool } from "./ItemLocations/GanonsBossKeyLocationPool";
import { GerudoCardLocationPool } from "./ItemLocations/GerudoCardLocationPool";
import { GoldSkulltulaDungeonLocationPool } from "./ItemLocations/GoldSkulltulaDungeonLocationPool";
import { GoldSkulltulaOverworldLocationPool } from "./ItemLocations/GoldSkulltulaOverworldLocationPool";
import { LocationPool } from "./ItemLocations/LocationPool";
import { MagicBeanLocationPool } from "./ItemLocations/MagicBeanLocationPool";
import { MapLocationPool } from "./ItemLocations/MapLocationPool";
import { OcarinaLocationPool } from "./ItemLocations/OcarinaLocationPool";
import { RutoLetterLocationPool } from "./ItemLocations/RutoLetterLocationPool";
import { ShopLocationPool } from "./ItemLocations/ShopLocationPool";
import { SmallKeyLocationPool } from "./ItemLocations/SmallKeyLocationPool";
import { SongLocationPool } from "./ItemLocations/SongLocationPool";
import { SwordLocationPool } from "./ItemLocations/SwordLocationPool";
import { WeirdEggLocationPool } from "./ItemLocations/WeirdEggLocationPool";
// item pools
import { BossKeyItemPool } from "./ItemPools/BossKeyItemPool";
import { CompassItemPool } from "./ItemPools/CompassItemPool";
import { GanonsBossKeyItemPool } from "./ItemPools/GanonsBossKeyItemPool";
import { GerudoCardItemPool } from "./ItemPools/GerudoCardItemPool";
import { GoldSkulltulaItemPool } from "./ItemPools/GoldSkulltulaItemPool";
import { MagicBeanItemPool } from "./ItemPools/MagicBeanItemPool";
import { MapItemPool } from "./ItemPools/MapItemPool";
import { OcarinaItemPool } from "./ItemPools/OcarinaItemPool";
import { RutoLetterItemPool } from "./ItemPools/RutoLetterItemPool";
import { SmallKeyItemPool } from "./ItemPools/SmallKeyItemPool";
import { SongItemPool } from "./ItemPools/SongItemPool";
import { SwordItemPool } from "./ItemPools/SwordItemPool";
import { VanillaItemPool } from "./ItemPools/VanillaItemPool";
import { WeirdEggItemPool } from "./ItemPools/WeirdEggItemPool";
// dungeon rewards
import { DungeonRewardLocationPool } from "./DungeonRewards/DungeonRewardLocationPool";
import { DungeonRewardItemPool } from "./DungeonRewards/DungeonRewardItemPool";
// entrances
import { DungeonEntrances } from "./Entrances/DungeonEntrances";
import { DungeonInteriors } from "./Entrances/DungeonInteriors";
import { NonSimpleEntrances } from "./Entrances/NonSimpleEntrances";
import { NonSimpleInteriors } from "./Entrances/NonSimpleInteriors";
import { OverworldEntrances } from "./Entrances/OverworldEntrances";
import { SimpleEntrances } from "./Entrances/SimpleEntrances";
import { SimpleInteriors } from "./Entrances/SimpleInteriors";



function PlandoGenerator() {

    const [settings, setSettings]: [{[s: string]: boolean | string }, Function] = useState({});
    const [locations, setLocations]: [{[l: string]: string}, Function] = useState({});
    const [entrances, setEntrances]: [{[e: string]: string}, Function] = useState({});
    const [overworldEntrances, setOverworldEntrances]: [{[e: string]: object}, Function] = useState({});
    const [startingItems, setStartingItems]: [{[i: string]: number}, Function] = useState({});

    // functions
    const toggleSettingEnabled = (name: string): void => {
        let _settings = settings;
        let defaultValue;
        if ((Settings[name] as SelectOptionType).options !== undefined) {
            defaultValue = (Settings[name] as SelectOptionType).options[0];
        } else {
            defaultValue = false;
        }
        _settings[name] !== undefined ? delete _settings[name] : _settings[name] = defaultValue;
        setSettings({..._settings});
    };

    const updateSetting = (name: string, value: string) => {
        let _settings = settings;
        _settings[name] = value === "true" ? true : value === "false" ? false : value;
        setSettings({..._settings});
    };

    const toggleLocationEnabled = (location: string) => {
        let _locations = locations;
        _locations[location] !== undefined ? delete _locations[location] : _locations[location] = VanillaItemPool[0];
        setLocations({..._locations});
    };

    const toggleDungeonRewardEnabled = (location: string) => {
        let _locations = locations;
        _locations[location] !== undefined ? delete _locations[location] : _locations[location] = DungeonRewardItemPool[0];
        setLocations({..._locations});
    };

    const updateLocation = (location: string, value: string) => {
        let _locations = locations;
        _locations[location] = value;
        setLocations({..._locations});
    };

    const toggleEntranceEnabled = (entrance: string) => {
        let _entrances = entrances;
        _entrances[entrance] !== undefined ? delete _entrances[entrance] : _entrances[entrance] = SimpleEntrances[0];
        setEntrances({..._entrances});
    };

    const updateEntrance = (entrance: string, value: string) => {
        let _entrances = entrances;
        _entrances[entrance] = value;
        setLocations({..._entrances});
    };

    const toggleOverworldEntranceEnabled = (entrance: string) => {
        let _overworldEntrances = overworldEntrances;
        let defaultOw = {"region": OverworldEntrances[0].split(" -> ")[0], "from": OverworldEntrances[0].split(" -> ")[1]};
        _overworldEntrances[entrance] !== undefined ? delete _overworldEntrances[entrance] : _overworldEntrances[entrance] = defaultOw;
        setOverworldEntrances({..._overworldEntrances});
    };

    const updateOverworldEntrance = (entrance: string, objString: string) => {
        let _overworldEntrances = overworldEntrances;
        _overworldEntrances[entrance] = JSON.parse(objString);
        setOverworldEntrances({..._overworldEntrances});
    };

    const addStartingItem = () => {
        let _startingItems = startingItems;
        let item;
        for (let i = 0; i < StartingItemPool.length; i++) {
            item = StartingItemPool[i];
            if (startingItems[item] !== undefined) {
                continue;
            }
            break;
        };
        if (!item) return;
        _startingItems[item] = 1;
        setStartingItems({..._startingItems});
    };

    const updateStartingItem = (oldItem: string, newItem: string) => {
        let _startingItems = startingItems;
        let val = _startingItems[oldItem];
        delete _startingItems[oldItem];
        _startingItems[newItem] = val;
        setStartingItems({..._startingItems});
    };

    const updateStartingItemCount = (item: string, count: string) => {
        let _startingItems = startingItems;
        _startingItems[item] = parseInt(count);
        setStartingItems({...startingItems});
    };

    const removeStartingItem = (item: string) => {
        let _startingItems = startingItems;
        delete _startingItems[item];
        setStartingItems({...startingItems});
    };

    const saveJSONFile = () => {
        let contents: any = {
            "settings": {
                ...settings
            },
            "locations": {
                ...locations
            }
        };
        if (settings.entrance_shuffle !== undefined && settings.entrance_shuffle !== "off") {
            contents["entrances"] = {
                ...entrances,
                ...overworldEntrances
            };
        }
        if (Object.keys(startingItems).length > 0) {
            contents["starting_items"] = {
                ...startingItems
            };
        }
        let blob = new Blob([JSON.stringify(contents, null, 4)], {type: "application/json"});
        FileSaver.saveAs(blob, `plando-${Date.now()}.json`);
    };

    // locations
    let overworldLocations = [...LocationPool];
    let dungeonLocations = [...DungeonLocationPool];
    let gsLocations = [];
    let shopLocations = [];
    let dekuScrubLocations = [];

    // items
    let overworldItems: string[] = [...VanillaItemPool];
    let dungeonItems: string[] = [...VanillaItemPool];
    let songItems: string[] = [];
    let gsItems: string[] = [];

    // entrances
    let availableOverworldEntrances = [];
    let availableEntrances = [];
    let availableInteriors = [];

    // populate options
    if (!settings.open_fountain) {
        overworldLocations.push(...RutoLetterLocationPool);
        overworldItems.push(...RutoLetterItemPool);
        dungeonItems.push(...RutoLetterItemPool);
    }

    if (settings.shuffle_kokiri_sword) {
        overworldLocations.push(...SwordLocationPool);
        overworldItems.push(...SwordItemPool);
        dungeonItems.push(...SwordItemPool);
    }

    if (settings.shuffle_ocarinas) {
        overworldLocations.push(...OcarinaLocationPool);
        overworldItems.push(...OcarinaItemPool);
        dungeonItems.push(...OcarinaItemPool);
    }

    if (settings.shuffle_weird_egg) {
        overworldLocations.push(...WeirdEggLocationPool);
        overworldItems.push(...WeirdEggItemPool);
        dungeonItems.push(...WeirdEggItemPool);
    }

    if (settings.shuffle_gerudo_card) {
        overworldLocations.push(...GerudoCardLocationPool);
        overworldItems.push(...GerudoCardItemPool);
        dungeonItems.push(...GerudoCardItemPool);
    }

    if (settings.shuffle_cows) {
        overworldLocations.push(...CowLocationPool);
    }

    if (settings.shuffle_beans) {
        overworldLocations.push(...MagicBeanLocationPool);
        overworldItems.push(...MagicBeanItemPool);
        dungeonItems.push(...MagicBeanItemPool);
    }

    if (settings.tokensanity) {
        if (settings.tokensanity === "dungeons" || settings.tokensanity === "all") {
            dungeonItems.push(...GoldSkulltulaItemPool);
            gsLocations.push(...GoldSkulltulaDungeonLocationPool);
            gsItems.push(...dungeonItems);
        }
        if (settings.tokensanity === "overworld" || settings.tokensanity === "all") {
            overworldItems.push(...GoldSkulltulaItemPool);
            gsLocations.push(...GoldSkulltulaOverworldLocationPool);
            gsItems.push(...overworldItems);
        }
        gsItems = gsItems.filter((v, i, a) => a.indexOf(v) === i);
    }

    if (settings.shuffle_mapcompass) {
        if (settings.shuffle_mapcompass === "dungeon" || settings.shuffle_mapcompass === "keysanity") {
            dungeonLocations.push(...MapLocationPool, ...CompassLocationPool);
            dungeonItems.push(...MapItemPool, ...CompassItemPool);
        }
        if (settings.shuffle_mapcompass === "keysanity") {
            overworldItems.push(...MapItemPool, ...CompassItemPool);
        }
    }

    if (settings.shuffle_smallkeys) {
        if (settings.shuffle_smallkeys === "dungeon" || settings.shuffle_smallkeys === "keysanity") {
            dungeonLocations.push(...SmallKeyLocationPool);
            dungeonItems.push(...SmallKeyItemPool);
        }
        if (settings.shuffle_smallkeys === "keysanity") {
            overworldItems.push(...SmallKeyItemPool);
        }
    }

    if (settings.shuffle_bosskeys) {
        if (settings.shuffle_bosskeys === "dungeon" || settings.shuffle_bosskeys === "keysanity") {
            dungeonLocations.push(...BossKeyLocationPool);
            dungeonItems.push(...BossKeyItemPool);
        }
        if (settings.shuffle_bosskeys === "keysanity") {
            overworldItems.push(...BossKeyItemPool);
        }
    }

    if (settings.shuffle_ganon_bosskey) {
        if (settings.shuffle_ganon_bosskey === "dungeon" || settings.shuffle_ganon_bosskey === "keysanity") {
            dungeonLocations.push(...GanonsBossKeyLocationPool);
            dungeonItems.push(...GanonsBossKeyItemPool);
        }
        if (settings.shuffle_ganon_bosskey === "keysanity") {
            overworldItems.push(...GanonsBossKeyItemPool);
        }
    }

    if (settings.shopsanity) {
        if (settings.shopsanity !== "off" && settings.shopsanity !== "0") {
            shopLocations.push(...ShopLocationPool);
        }
    }

    if (settings.shuffle_scrubs) {
        if (settings.shuffle_scrubs !== "off") {
            dekuScrubLocations.push(...DekuScrubLocationPool);
        }
    }

    if (settings.shuffle_song_items) {
        overworldItems.push(...SongItemPool);
        dungeonItems.push(...SongItemPool);
        songItems.push(...overworldItems);
    } else {
        songItems.push(...SongItemPool);
    }

    if (settings.entrance_shuffle) {
        // check to add dungeons
        if (["dungeons", "simple-indoors", "all-indoors", "all"].includes(settings.entrance_shuffle.toString())) {
            availableEntrances.push(...DungeonEntrances);
            availableInteriors.push(...DungeonInteriors);
        }
        if (["simple-indoors", "all-indoors", "all"].includes(settings.entrance_shuffle.toString())) {
            availableEntrances.push(...SimpleEntrances);
            availableInteriors.push(...SimpleInteriors);
        }
        if (["all-indoors", "all"].includes(settings.entrance_shuffle.toString())) {
            availableEntrances.push(...NonSimpleEntrances);
            availableInteriors.push(...NonSimpleInteriors);
        }
        if (settings.entrance_shuffle.toString() === "all") {
            availableOverworldEntrances.push(...OverworldEntrances);
        }
    }

    // map over location keys to check for removed locations
    let updated = false;
    let _locations = {...locations};
    let possibleLocations = [
        ...overworldLocations,
        ...dungeonLocations,
        ...gsLocations,
        ...shopLocations,
        ...dekuScrubLocations,
        ...DungeonRewardLocationPool,
        ...SongLocationPool
    ];
    Object.keys(_locations).forEach(location => {
        if (!possibleLocations.includes(location)) {
            delete _locations[location];
            updated = true;
        }
    });
    if (updated) {
        setLocations({..._locations});
    }
    updated = false;
    // check for change in entrances
    let _entrances = {...entrances};
    possibleLocations = [
        ...availableEntrances
    ];
    Object.keys(_entrances).forEach(entrance => {
        if (!possibleLocations.includes(entrance)) {
            delete _entrances[entrance];
            updated = true;
        }
    });
    if (updated) {
        setEntrances({..._entrances});
    }
    updated = false;
    // check for change in overworld entrances
    let _owEntrances = {...overworldEntrances};
    possibleLocations = [
        ...availableOverworldEntrances
    ];
    Object.keys(_owEntrances).forEach(entrance => {
        if (!possibleLocations.includes(entrance)) {
            delete _owEntrances[entrance];
            updated = true;
        }
    });
    if (updated) {
        setOverworldEntrances({..._owEntrances});
    }

    return (
        <div className="plando-generator">
            {/* top bar for outputting plando file */}
            <nav className="navbar is-dark is-fixed-top">
                <div className="navbar-brand is-pulled-right">
                    <a href="#download" className="navbar-item is-button" onClick={saveJSONFile}>
                        Download Plando
                    </a>
                    <a href="https://github.com/brakkum/plando.brakke.dev" className="navbar-item is-button">
                        GitHub
                    </a>
                </div>
            </nav>
            {/* Settings that influence what options are populated */}
            <div style={{height: "50px"}} />
            <div className="plando-settings section">
                <h3 className="is-size-3">Settings</h3>
                <h4 className="is-size-4">Click setting name to enable/disable</h4>
                <div className="settings">
                    {Object.keys(Settings).sort().map((name, i) => {
                        let settingEnabled = settings[name] !== undefined;
                        let arr = (Settings[name] as SelectOptionType).options !== undefined ? (Settings[name] as SelectOptionType).options : ["false", "true"];
                        return <div key={i} className="setting">
                            <h5 onClick={() => toggleSettingEnabled(name)} className={(settingEnabled ? "enabled" : "disabled")}>
                                {Settings[name].display ? Settings[name].display : name}
                            </h5>
                            {settingEnabled && <div className="">
                                <div className="select is-small setting-select">
                                    <select onChange={e => updateSetting(name, e.target.value)} defaultValue={settings[name].toString()}>
                                        {arr.map((option: string, j: number) => {
                                            return <option key={j} value={option}>
                                                {option}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>}
                        </div>;
                    })}
                </div>
            </div>
            {/* starting items */}
            <div className="starting-items section">
                <h3 className="is-size-3">Starting Items</h3>
                <button className="button add-starting-item" onClick={addStartingItem}>
                    Add
                </button>
                {Object.keys(startingItems).sort().map((item, i) => {
                    return <div key={i} className="starting-item">
                        <select className="input start-input" onChange={e => updateStartingItem(item, e.target.value)} defaultValue={item}>
                            <option>
                                {item}
                            </option>
                            {StartingItemPool.map((sItem, j) => {
                                if (Object.keys(startingItems).includes(sItem) ) {
                                    return null;
                                }
                                return <option key={j} value={sItem}>
                                    {sItem}
                                </option>
                            })}
                        </select>
                        <input className="input start-input" type="number" min="1" value={startingItems[item]} onChange={e => updateStartingItemCount(item, e.target.value)}>

                        </input>
                        <div>
                            <button className="button start-input" onClick={() => removeStartingItem(item)}>Remove</button>
                        </div>
                    </div>
                })}
            </div>
            {/* locations that are open based on settings */}
            <div className="plando-locations section">
                {/* cows */}
                <LocationPoolDisplay
                    name={"Cow Locations"}
                    availableLocations={settings.shuffle_cows ? CowLocationPool : []}
                    items={overworldItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* dungeons */}
                <LocationPoolDisplay
                    name={"Dungeon Locations"}
                    availableLocations={dungeonLocations}
                    items={dungeonItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* dungeon rewards */}
                <LocationPoolDisplay
                    name={"Dungeon Rewards"}
                    availableLocations={DungeonRewardLocationPool}
                    items={DungeonRewardItemPool.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleDungeonRewardEnabled}
                    updateLocation={updateLocation}
                />
                {/* entrances */}
                <LocationPoolDisplay
                    name={"House/Grotto/Dungeon Entrances"}
                    availableLocations={availableEntrances}
                    items={availableInteriors.sort()}
                    locations={entrances}
                    toggleLocationEnabled={toggleEntranceEnabled}
                    updateLocation={updateEntrance}
                />
                {/* overworld entrances */}
                <OverworldPoolDisplay
                    name={"Overworld Entrances"}
                    availableEntrances={availableOverworldEntrances}
                    overworldEntrances={overworldEntrances}
                    toggleOverworldEntranceEnabled={toggleOverworldEntranceEnabled}
                    updateOverworldEntrance={updateOverworldEntrance}
                />
                {/* overworld */}
                <LocationPoolDisplay
                    name={"Overworld Locations"}
                    availableLocations={overworldLocations}
                    items={overworldItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* scrubs */}
                <LocationPoolDisplay
                    name={"Scrub Locations"}
                    availableLocations={dekuScrubLocations}
                    items={overworldItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* shops */}
                <LocationPoolDisplay
                    name={"Shop Locations"}
                    availableLocations={shopLocations}
                    items={overworldItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* skulltulas */}
                <LocationPoolDisplay
                    name={"Skulltula Locations"}
                    availableLocations={gsLocations}
                    items={gsItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
                {/* songs */}
                <LocationPoolDisplay
                    name={"Song Locations"}
                    availableLocations={SongLocationPool}
                    items={songItems.sort()}
                    locations={locations}
                    toggleLocationEnabled={toggleLocationEnabled}
                    updateLocation={updateLocation}
                />
            </div>
        </div>
    );
}

export default PlandoGenerator;

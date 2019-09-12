import { SelectOptionType } from "./Types/SelectOptionType";
import LocationPoolDisplay from "./LocationPoolDisplay";
import { Settings } from "./Settings/Settings";
import React, { useState } from "react";
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

function PlandoGenerator() {

    const [settings, setSettings]: [{[s: string]: boolean | string }, Function] = useState({});
    const [locations, setLocations]: [{[l: string]: string}, Function] = useState({});

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

    const saveJSONFile = () => {
        let a = document.createElement("a");
        let contents = {
            "settings": {
                ...settings
            },
            "locations": {
                ...locations
            }
        };
        let file = new Blob([JSON.stringify(contents)], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = `plando-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
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

    // populate settings section
    let settingsJsx: JSX.Element[] = [];
    Object.keys(Settings).sort().forEach((name, i) => {
        let settingEnabled = settings[name] !== undefined;
        let options: JSX.Element[];
        let arr = (Settings[name] as SelectOptionType).options !== undefined ? (Settings[name] as SelectOptionType).options : ["false", "true"];
        options = arr.map((option: string, j: number) => {
            return <option key={j} value={option}>
                {option}
            </option>
        });
        settingsJsx.push(<div key={i} className="setting">
            <h5 onClick={() => toggleSettingEnabled(name)} className={(settingEnabled ? "enabled" : "disabled")}>
                {Settings[name].display ? Settings[name].display : name}
            </h5>
            {settingEnabled && <div className="">
                <div className="select is-small setting-select">
                    <select onChange={e => updateSetting(name, e.target.value)} defaultValue={settings[name].toString()}>
                        {options}
                    </select>
                </div>
            </div>}
        </div>);
    });

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

    return (
        <div className="plando-generator">
            {/* top bar for outputting plando file */}
            <nav className="navbar is-dark is-fixed-top">
                <div className="navbar-brand  is-pulled-right">
                    <a href="#download" className="navbar-item is-button" onClick={saveJSONFile}>
                        Download Plando
                    </a>
                </div>
            </nav>
            {/* Settings that influence what options are populated */}
            <div style={{height: "50px"}} />
            <div className="plando-settings section">
                <h3 className="is-size-3">Settings</h3>
                <h4 className="is-size-4">Click setting name to enable/disable</h4>
                <div className="settings">
                    {settingsJsx}
                </div>
            </div>

            {/* locations that are open based on settings */}
            <div className="plando-locations section">
                <h3 className="is-size-3">Locations</h3>
                <h4 className="is-size-4">Click locations to enable/disable</h4>
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

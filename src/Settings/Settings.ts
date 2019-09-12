import { SettingsType } from "../Types/SettingsType";

export let Settings: SettingsType = {
    "open_fountain": {
        "type": "boolean",
        "display": "Open Fountain"
    },
    "shuffle_kokiri_sword": {
        "type": "boolean",
        "display": "Shuffle Kokiri Sword"
    },
    "shuffle_ocarinas": {
        "type": "boolean",
        "display": "Shuffle Ocarinas"
    },
    "shuffle_weird_egg": {
        "type": "boolean",
        "display": "Shuffle Weird Egg"
    },
    "shuffle_gerudo_card": {
        "type": "boolean",
        "display": "Shuffle Gerudo Card"
    },
    "shuffle_song_items": {
        "type": "boolean",
        "display": "Shuffle Songs"
    },
    "shuffle_cows": {
        "type": "boolean",
        "display": "Shuffle Cows"
    },
    "shuffle_beans": {
        "type": "boolean",
        "display": "Shuffle Beans"
    },
    "shuffle_scrubs": {
        "type": "select",
        "display": "Scrubsanity",
        "options": [
            "off",
            "low",
            "regular",
            "random"
        ]
    },
    "entrance_shuffle": {
        "type": "select",
        "display": "Entrance Shuffle",
        "options": [
            "off",
            "dungeons",
            "simple-indoors",
            "all-indoors",
            "all"
        ]
    },
    "shopsanity": {
        "type": "select",
        "display": "Shopsanity",
        "options": [
            "off",
            "0",
            "1",
            "2",
            "3",
            "4",
            "random"
        ]
    },
    "tokensanity": {
        "type": "select",
        "display": "Tokensanity",
        "options": [
            "off",
            "dungeons",
            "overworld",
            "all"
        ]
    },
    "shuffle_mapcompass": {
        "type": "select",
        "display": "Shuffle Maps/Compasses",
        "options": [
            "remove",
            "startwith",
            "vanilla",
            "dungeon",
            "keysanity"
        ]
    },
    "shuffle_smallkeys": {
        "type": "select",
        "display": "Shuffle Small Keys",
        "options": [
            "remove",
            "vanilla",
            "dungeon",
            "keysanity"
        ]
    },
    "shuffle_bosskeys": {
        "type": "select",
        "display": "Shuffle Boss Keys",
        "options": [
            "remove",
            "vanilla",
            "dungeon",
            "keysanity"
        ]
    },
    "shuffle_ganon_bosskey": {
        "type": "select",
        "display": "Shuffle Ganons Boss Key",
        "options": [
            "remove",
            "vanilla",
            "dungeon",
            "keysanity",
            "lacs_vanilla",
            "lacs_medallions",
            "lacs_stones",
            "lacs_dungeons"
        ]
    },
    "correct_chest_sizes": {
        "type": "boolean",
        "display": "Chest Size Match Contents"
    },
    "clearer_hints": {
        "type": "boolean",
        "display": "Clearer Hints",
    },
    "hints": {
        "type": "select",
        "display": "Hints Require",
        "options": [
            "none",
            "mask",
            "agony",
            "always"
        ]
    },
    "hint_dist": {
        "type": "select",
        "display": "Hint Distribution",
        "options": [
            "useless",
            "balanced",
            "strong",
            "very_strong",
            "tournament"
        ]
    },
    "item_pool_value": {
        "type": "select",
        "display": "Item Pool Distribution",
        "options": [
            "plentiful",
            "balanced",
            "scarce",
            "minimal"
        ]
    },
    "damage_multiplier": {
        "type": "select",
        "display": "Damage Multiplier",
        "options": [
            "half",
            "normal",
            "double",
            "quadruple",
            "ohko"
        ]
    },
    "starting_tod": {
        "type": "select",
        "display": "Starting Time of Day",
        "options": [
            "default",
            "random",
            "sunrise",
            "morning",
            "noon",
            "afternoon",
            "sunset",
            "evening",
            "midnight",
            "witching-hour"
        ]
    },
    "starting_age": {
        "type": "select",
        "display": "Starting Age",
        "options": [
            "child",
            "adult",
            "random"
        ]
    }
}

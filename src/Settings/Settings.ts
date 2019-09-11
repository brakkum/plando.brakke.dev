import { SettingsType } from "../Types/SettingsType";

export let Settings: SettingsType = {
    "shuffle_kokiri_sword": {
        "type": "boolean"
    },
    "shuffle_ocarinas": {
        "type": "boolean"
    },
    "shuffle_weird_egg": {
        "type": "boolean"
    },
    "shuffle_gerudo_card": {
        "type": "boolean"
    },
    "shuffle_song_items": {
        "type": "boolean"
    },
    "shuffle_cows": {
        "type": "boolean"
    },
    "shuffle_beans": {
        "type": "boolean"
    },
    "shuffle_scrubs": {
        "type": "select",
        "options": [
            "off",
            "low",
            "regular",
            "random"
        ]
    },
    "shopsanity": {
        "type": "select",
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
        "options": [
            "off",
            "dungeons",
            "overworld",
            "all"
        ]
    },
    "shuffle_mapcompass": {
        "type": "select",
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
        "options": [
            "remove",
            "vanilla",
            "dungeon",
            "keysanity"
        ]
    },
    "shuffle_bosskeys": {
        "type": "select",
        "options": [
            "remove",
            "vanilla",
            "dungeon",
            "keysanity"
        ]
    },
    "shuffle_ganon_bosskey": {
        "type": "select",
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
        "type": "boolean"
    },
    "clearer_hints": {
        "type": "boolean"
    },
    "hints": {
        "type": "select",
        "options": [
            "none",
            "mask",
            "agony",
            "always"
        ]
    },
    "hint_dist": {
        "type": "select",
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
        "options": [
            "plentiful",
            "balanced",
            "scarce",
            "minimal"
        ]
    },
    "damage_multiplier": {
        "type": "select",
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
        "options": [
            "child",
            "adult",
            "random"
        ]
    }
}

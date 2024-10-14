﻿addLayer("in", {
    name: "Universe 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedInfinity: false,
        reachedInfinity: false,
        unlockedBreak: false,
        breakInfinity: false,

        infinityPoints: new Decimal(0),
        infinityPointsToGet: new Decimal(0),
        infinityPause: false,

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
            "background-origin": "border-box",
            "border-color": "#119B35",
        }
      },
    
    tooltip: "Universe 2 - Antimatter World",
    color: "white",
    branches: ["i"],
    update(delta) {
        // =================================================================
        // Miscellaneous logic

        if (player.subtabs['in']['stuff'] == 'Portal') {
            player.tab = 'po'
            player.subtabs['in']['stuff'] = 'Features'
        }

        if (player.in.infinityPoints.gt(0)) {
            player.in.unlockedInfinity = true
        }

        if (player.in.reachedInfinity
                && !inChallenge('ip', 11)
                && !player.in.breakInfinity
        ) {
            // TavDomain challenge: Tav's Domain
            if (inChallenge('tad', 11)) {
                const broInfGtShaInf = player.bi.brokenInfinities.gt(
                    player.tad.shatteredInfinitiesToGet)
                if (broInfGtShaInf
                    && player.po.hex
                    && !player.po.dice
                    && !player.po.rocketFuel
                    && player.tad.currentConversion.eq(0)
                ) {
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                }

                const broInfGtDisInf = player.bi.brokenInfinities.gt(
                    player.tad.disfiguredInfinitiesToGet)
                if (broInfGtDisInf
                    && !player.po.hex
                    && !player.po.dice
                    && player.po.rocketFuel
                    && player.tad.currentConversion.eq(1)
                ) {
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                }

                const broInfGtCorInf = player.bi.brokenInfinities.gt(
                    player.tad.corruptedInfinitiesToGet)
                if (broInfGtCorInf
                    && !player.po.hex
                    && player.po.dice
                    && !player.po.rocketFuel
                    && player.tad.currentConversion.eq(2)
                ) {
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                }
            }

            const skipBigCrunch = hasMilestone('ip', 21)
            if (skipBigCrunch) {
                layers.bigc.crunch()
            } else {
                player.tab = 'bigc'
            }

            // BreakInfinity upgrade: BI IP Upgrade 4
            if (hasUpgrade('bi', 14)) {
                if (player.po.dice) {
                    player.om.diceMasteryPoints = player.om.diceMasteryPoints
                        .add(player.om.diceMasteryPointsToGet)
                }

                if (player.po.rocketFuel) {
                    player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints
                        .add(player.om.rocketFuelMasteryPointsToGet)
                }

                if (player.po.hex) {
                    player.om.hexMasteryPoints = player.om.hexMasteryPoints
                        .add(player.om.hexMasteryPointsToGet)
                }
            }
        }

        // =================================================================
        // InfinityPointsToGet logic

        player.in.infinityPointsToGet = new Decimal(1)

        if (player.in.breakInfinity) {
            // BreakInfinity upgrade: BI IP Upgrade 1
            if (hasUpgrade('bi', 111)) {
                player.in.infinityPointsToGet = player.points
                    .div(1e308)
                    .plus(1)
                    .log10()
                    .div(2)
                    .pow(1.25)
            } else {
                player.in.infinityPointsToGet = player.points
                    .div(1e308)
                    .plus(1)
                    .log10()
                    .div(10)
            }

            // Incremental (layers.js) upgrade: Challenge 1. (sic)
            if (hasUpgrade('i', 31)) {
                player.in.infinityPointsToGet = player.points
                    .div(1e308)
                    .plus(1)
                    .log10()
                    .pow(1.5)
            }
        }

        player.in.infinityPointsToGet = player.in.infinityPointsToGet
            .mul(buyableEffect('h', 21))
            .mul(buyableEffect('h', 22))
            .mul(buyableEffect('ip', 11))
            .mul(player.d.diceEffects[11])
            .mul(player.rf.abilityEffects[5])
            .mul(buyableEffect('cb', 12))
            .mul(buyableEffect('ta', 33))
            .mul(buyableEffect('f', 41))
            .mul(buyableEffect('f', 42))
            .mul(buyableEffect('f', 43))
            .mul(buyableEffect('f', 44))
            .mul(buyableEffect('f', 45))
            .mul(buyableEffect('f', 46))
            .mul(buyableEffect('f', 47))
            .mul(buyableEffect('f', 48))
            .mul(player.om.diceMasteryPointsEffect)
            .mul(buyableEffect('tad', 21))
            .mul(buyableEffect('gh', 38))
            .mul(player.ca.replicantiEffect)
            .mul(buyableEffect('id', 24))
            .mul(buyableEffect('h', 23))
            .mul(player.rm.realmModsEffect[5])
            .mul(buyableEffect('ca', 24))

        // InfinityPoints upgrade: Upgrade (4, 2)
        if (hasUpgrade('ip', 42)) {
            player.in.infinityPointsToGet = player.in.infinityPointsToGet
                .mul(upgradeEffect('ip', 42))
        }

        // BreakInfinity upgrade: BI UP Upgrade 7
        if (hasUpgrade('bi', 23)) {
            player.in.infinityPointsToGet = player.in.infinityPointsToGet
                .mul(upgradeEffect('bi', 23))
        }
        
        // BreakInfinity upgrade: BI NIP Upgrade 1
        if (hasUpgrade('bi', 101)) {
            player.in.infinityPointsToGet = player.in.infinityPointsToGet
                .mul(upgradeEffect('bi', 101))
        }

        // bigCrunch ASAP, since we don't need player.points after this point
        if (player.points.gte(Number.MAX_VALUE)) {
            player.in.reachedInfinity = true

            // N.B. try doing bigCrunch as soon as we can
            layers.in.bigCrunch();
        }


        // =================================================================
        // InfinitiesToGet logic

        player.in.infinitiesToGet = new Decimal(1)
            .mul(buyableEffect('bi', 11))
            .mul(buyableEffect('tad', 11))
            .mul(buyableEffect('om', 11))
            .mul(buyableEffect('p', 15))

        // =================================================================
        // Multi-reset logic

        if (player.in.infinityPause) {
            // XXX: this may not be needed anymore; further testing required!
            //layers.in.bigCrunch();
            player.in.infinityPause = false
        }
    },
    bigCrunch() {
        // =================================================================
        // Rank

        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        player.r.pent = new Decimal(0)

        // InfinityPoints milestone, 6 Infinities
        // InfinityPoints challenge, Challenge 4
        if (!hasMilestone('ip', 15) && !inChallenge('ip', 14)) {
            player.r.milestones = player.r.milestones
                .filter((o) => (+o) >= 20)
        }

        // =================================================================
        // Factor

        player.f.factorUnlocks = [
            true, true, true, false,
            false, false, false, false
        ]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [
            true, true, true, false,
            false, false, false, false
        ]

        for (let i = 1; i <= 36; ++i) {
            player.f.buyables[i] = new Decimal(0)
        }

        // =================================================================
        // Prestige

        player.p.prestigePoints = new Decimal(0)

        // InfinityPoints milestone, 2 Infinities
        // InfinityPoints challenga, Challenge 4
        if (!hasMilestone('ip', 11) && !inChallenge('ip', 14)) {
            player.p.upgrades = player.p.upgrades
                .filter((o) => (+o) >= 24)
        }

        // =================================================================
        // Trees

        for (let i = 11; i <= 18; ++i) {
            player.t.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        // =================================================================
        // Grass

        for (let i = 11; i <= 18; ++i) {
            player.g.buyables[i] = new Decimal(0)
        }

        // InfinityPoints milestone, 2 Infinities
        // InfinityPoints challenge, Challenge 4
        if (!hasMilestone('ip', 11) && !inChallenge('ip', 14)) {
            player.g.upgrades = player.g.upgrades
                .filter((o) => (+o) >= 22)
        }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        // =================================================================
        // Grasshop

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        for (let i = 11; i <= 22; ++i) {
            // There is no 20
            if (i === 20) {
                continue
            }

            player.gh.buyables[i] = new Decimal(0)
        }

        // =================================================================
        // Mods

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        for (let i = 11; i <= 14; ++i) {
            player.m.buyables[i] = new Decimal(0)
        }

        // =================================================================
        // Dice

        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)] 
        player.d.dice = new Decimal(1)

        for (let i = 11; i <= 15; ++i) {
            player.d.buyables[i] = new Decimal(0)
        }

        for (let i = 0; i < 11; i++) {
            player.d.diceEffects[i] = new Decimal(1)
        }

        if (!inChallenge("ip", 15)) {
          player.d.challengeDicePoints = new Decimal(0)
          for (let i = 21; i <= 24; ++i) {
              player.d.buyables[i] = new Decimal(0)
          }

          for (let i = 0; i < player.d.upgrades.length; i++) {
              player.d.upgrades = player.d.upgrades
                  .filter((o) => (+o) >= 100)
          }
        }

        // =================================================================
        // Rocket fuel

        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++) {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < 4; i++) {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            player.rf.upgrades = player.rf.upgrades
                .filter((o) => (+o) >= 18)
        }

        // =================================================================
        // Infinity

        for (let i = 0; i < player.i.upgrades.length; i++) {
            player.i.upgrades = player.i.upgrades
                .filter((o) => (+o) >= 22)
        }

        // =================================================================
        // Portal

        // Portal, keep OTFs on reset
        // InfinityPoints challenge, Challenge 5
        // InfinityPoints challenge, Challenge 6
        if (
            !player.po.keepOTFS
            || inChallenge('ip', 15)
            || inChallenge('ip', 16)
        ) {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.breakInfinity = false
            player.po.realmMods = false
            player.po.featureSlots = player.po.featureSlotsMax
        }
        
        // =================================================================
        // Antimatter Dimensions

        if (!hasMilestone('ip', 14)) {
            if (player.in.infinities.lt(1)) {
                player.ad.antimatter = new Decimal(10)
            }

            player.ad.buyables[1] = new Decimal(0)
    
            for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
                player.ad.dimensionAmounts[i] = new Decimal(0)
                player.ad.dimensionsPurchased[i] = new Decimal(0)
            }
    
            for (let i = 4; i <= 7; ++i) {
                player.ad.dimensionsUnlocked[i] = false
            }
            
            player.ad.dimBoostAmount = new Decimal(0)
            player.ad.galaxyAmount = new Decimal(0)
        }

        // =================================================================
        // Pests

        player.pe.pests = new Decimal(0)

        // =================================================================
        // Debuff

        player.de.antidebuffPoints = new Decimal(0)

        // =================================================================
        // Core

        player.points = new Decimal(10)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", [
                            ["ad", "ip", "id"],
                            ["ga", "ta", "bi", "om"],
                            ["ca"]
                        ]]
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("ad", 13) },
                content:
                [
                ]
            },
            "Settings": settingsMicrotab,
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter, which boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown: () => player.startedGame && player.in.unlockedInfinity
})

addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {     
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc")
        {
            removeWisps();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"

                layers.bigc.crunch()
            },
            style: { width: '300px', "min-height": '120px' },
        },
        
    },
    crunch(){
        player.in.infinityPoints = player.in.infinityPoints
            .add(player.in.infinityPointsToGet)
        player.in.infinityPointsToGet = new Decimal(0)

        player.in.infinities = player.in.infinities
            .add(player.in.infinitiesToGet)
        player.in.infinitiesToGet = new Decimal(0)

        if (player.po.dice)
        {
            player.ip.diceRuns = player.ip.diceRuns.add(1)
        }
        if (player.po.rocketFuel)
        {
            player.ip.rocketFuelRuns = player.ip.rocketFuelRuns.add(1)
        }
        if (player.po.hex)
        {
            player.ip.hexRuns = player.ip.hexRuns.add(1)
        }
        player.in.infinityPause = true
        player.in.reachedInfinity = false

        if (inChallenge("ip", 11))
        {
            completeChallenge("ip", 11)
        }
        if (inChallenge("ip", 12))
        {
            completeChallenge("ip", 12)
        }
        if (inChallenge("ip", 13))
        {
            completeChallenge("ip", 13)
        }
        if (inChallenge("ip", 14))
        {
            completeChallenge("ip", 14)
        }
        if (inChallenge("ip", 15))
        {
            completeChallenge("ip", 15)
        }
        if (inChallenge("ip", 16))
        {
            completeChallenge("ip", 16)
        }
        if (inChallenge("ip", 18))
        {
            completeChallenge("ip", 18)
        }

        if (hasUpgrade("ta", 17))
        {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints))
            {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel))
            {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoints[0].gt(player.ta.highestHex1Points))
            {
                if (player.po.hex) player.ta.highestHex1Points = player.h.hexPoints[0]
            }
        }

        if (player.rm.halterBoostCheck && player.po.realmMods)
        {
            player.rm.halterBoost = player.po.pointHalt
        }

        player.rm.halterBoostCheck = true
    }, 
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },

    tabFormat: [
                    ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "150px"],
                    ["row", [["clickable", 11]]],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});

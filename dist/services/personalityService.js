"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/personalityService.ts
const personalityModel_1 = require("../models/personalityModel");
async function generateAssessment(answers) {
    // 1. Big Five (OCEAN)
    const bigFiveResult = await personalityModel_1.BigFive.evaluate(answers);
    // 2. Millon's Typology
    const millonResult = await personalityModel_1.Millon.evaluate(answers);
    // 3. Eysenck's Psychobiological Model
    const eysenckResult = await personalityModel_1.Eysenck.evaluate(answers);
    // 4. Criminal Profiling
    const criminalProfileResult = await personalityModel_1.CriminalProfile.evaluate(answers);
    return {
        bigFive: bigFiveResult,
        millon: millonResult,
        eysenck: eysenckResult,
        criminalProfile: criminalProfileResult,
    };
}
exports.default = { generateAssessment };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScores = calculateScores;
exports.validateGroupedAnswers = validateGroupedAnswers;
/**
 * Calculate personality scores from grouped answers.
 * Answers are expected to be numeric (e.g. 1-5 Likert). The returned scores are 0-100.
 *
 * @param groupedAnswers - an object containing arrays of numeric answers per trait
 * @param scale - optional [min,max] of the answer scale (defaults to [1,5])
 */
function calculateScores(groupedAnswers, scale = { min: 1, max: 5 }) {
    validateGroupedAnswers(groupedAnswers);
    const normalize = (avg) => {
        const { min, max } = scale;
        if (max === min)
            return 0;
        // map avg from [min, max] -> [0, 100]
        const percent = ((avg - min) / (max - min)) * 100;
        return Math.round(clamp(percent, 0, 100));
    };
    return {
        openness: normalize(average(groupedAnswers.openness)),
        conscientiousness: normalize(average(groupedAnswers.conscientiousness)),
        extraversion: normalize(average(groupedAnswers.extraversion)),
        agreeableness: normalize(average(groupedAnswers.agreeableness)),
        neuroticism: normalize(average(groupedAnswers.neuroticism)),
    };
}
function average(arr) {
    if (!arr || arr.length === 0)
        return 0;
    const sum = arr.reduce((s, v) => s + v, 0);
    return sum / arr.length;
}
function clamp(n, min, max) {
    return n < min ? min : n > max ? max : n;
}
function validateGroupedAnswers(input) {
    const traits = [
        "openness",
        "conscientiousness",
        "extraversion",
        "agreeableness",
        "neuroticism",
    ];
    if (typeof input !== "object" || input === null) {
        throw new TypeError("Grouped answers must be an object with trait arrays");
    }
    for (const t of traits) {
        if (!Array.isArray(input[t])) {
            throw new TypeError(`Trait '${t}' must be an array of numbers`);
        }
        for (const v of input[t]) {
            if (typeof v !== "number" || Number.isNaN(v)) {
                throw new TypeError(`All values for trait '${t}' must be numbers`);
            }
        }
    }
}
exports.default = { calculateScores, validateGroupedAnswers };

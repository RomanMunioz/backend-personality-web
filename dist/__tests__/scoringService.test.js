"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoringService_1 = require("../services/scoringService");
describe("scoringService", () => {
    test("calculates expected normalized scores", () => {
        const grouped = {
            openness: [5, 4, 4, 5],
            conscientiousness: [3, 4, 2],
            extraversion: [4, 4, 3, 5],
            agreeableness: [2, 3, 2],
            neuroticism: [1, 2, 1],
        };
        const scores = (0, scoringService_1.calculateScores)(grouped, { min: 1, max: 5 });
        expect(scores.openness).toBeGreaterThanOrEqual(0);
        expect(scores.openness).toBeLessThanOrEqual(100);
        // openness avg = 4.5 -> mapped to 87.5 -> rounded 88
        expect(scores.openness).toBe(88);
        // neuroticism avg = 1.333... -> percent ~8.33 -> rounded 8
        expect(scores.neuroticism).toBe(8);
    });
    test("validateGroupedAnswers throws on bad input", () => {
        // @ts-ignore
        expect(() => (0, scoringService_1.validateGroupedAnswers)(null)).toThrow();
        // missing trait
        // @ts-ignore
        expect(() => (0, scoringService_1.validateGroupedAnswers)({ openness: [1, 2] })).toThrow();
        // non-number in array
        // @ts-ignore
        expect(() => (0, scoringService_1.validateGroupedAnswers)({
            openness: [1],
            conscientiousness: [2],
            extraversion: [3],
            agreeableness: [4],
            neuroticism: ["a"],
        })).toThrow();
    });
});

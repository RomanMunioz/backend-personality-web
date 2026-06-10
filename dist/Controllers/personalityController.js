"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePersonality = void 0;
const zod_1 = require("zod");
const assessmentResult_1 = require("../models/assessmentResult");
const personalityService_1 = __importDefault(require("../services/personalityService"));
const scoringService_1 = __importDefault(require("../services/scoringService"));
const analyzePersonalitySchema = zod_1.z.object({
    answers: zod_1.z.any().optional(),
    groupedAnswers: zod_1.z
        .object({
        openness: zod_1.z.array(zod_1.z.number()),
        conscientiousness: zod_1.z.array(zod_1.z.number()),
        extraversion: zod_1.z.array(zod_1.z.number()),
        agreeableness: zod_1.z.array(zod_1.z.number()),
        neuroticism: zod_1.z.array(zod_1.z.number()),
    })
        .optional(),
});
const analyzePersonality = async (req, res) => {
    const parsed = analyzePersonalitySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Invalid request body",
            details: parsed.error.format(),
        });
    }
    const { answers, groupedAnswers } = parsed.data;
    const report = await personalityService_1.default.generateAssessment(answers);
    const scores = groupedAnswers
        ? scoringService_1.default.calculateScores(groupedAnswers)
        : undefined;
    if (process.env.MONGODB_URI) {
        await assessmentResult_1.AssessmentResult.create({
            answers,
            groupedAnswers,
            scores,
            report,
        });
    }
    return res.json({ scores, report });
};
exports.analyzePersonality = analyzePersonality;

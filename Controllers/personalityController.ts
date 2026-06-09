import { Request, Response } from "express";
import { z } from "zod";
import { AssessmentResult } from "../models/assessmentResult";
import personalityService from "../services/personalityService";
import scoringService from "../services/scoringService";

const analyzePersonalitySchema = z.object({
  answers: z.any().optional(),
  groupedAnswers: z
    .object({
      openness: z.array(z.number()),
      conscientiousness: z.array(z.number()),
      extraversion: z.array(z.number()),
      agreeableness: z.array(z.number()),
      neuroticism: z.array(z.number()),
    })
    .optional(),
});

export const analyzePersonality = async (req: Request, res: Response) => {
  const parsed = analyzePersonalitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.format(),
    });
  }

  const { answers, groupedAnswers } = parsed.data;

  const report = await personalityService.generateAssessment(answers);
  const scores = groupedAnswers
    ? scoringService.calculateScores(groupedAnswers)
    : undefined;

  if (process.env.MONGODB_URI) {
    await AssessmentResult.create({
      answers,
      groupedAnswers,
      scores,
      report,
    });
  }

  return res.json({ scores, report });
};

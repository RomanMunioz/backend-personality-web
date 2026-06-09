// services/personalityService.ts
import { BigFive, Millon, Eysenck, CriminalProfile } from "../models/personalityModel";

async function generateAssessment(answers: any): Promise<any> {
  // 1. Big Five (OCEAN)
  const bigFiveResult = await BigFive.evaluate(answers);

  // 2. Millon's Typology
  const millonResult = await Millon.evaluate(answers);

  // 3. Eysenck's Psychobiological Model
  const eysenckResult = await Eysenck.evaluate(answers);

  // 4. Criminal Profiling
  const criminalProfileResult = await CriminalProfile.evaluate(answers);

  return {
    bigFive: bigFiveResult,
    millon: millonResult,
    eysenck: eysenckResult,
    criminalProfile: criminalProfileResult,
  };
}

export default { generateAssessment };

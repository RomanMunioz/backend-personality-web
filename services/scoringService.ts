export type Trait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export interface PersonalityScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface GroupedAnswers {
  openness: number[];
  conscientiousness: number[];
  extraversion: number[];
  agreeableness: number[];
  neuroticism: number[];
}

/**
 * Calculate personality scores from grouped answers.
 * Answers are expected to be numeric (e.g. 1-5 Likert). The returned scores are 0-100.
 *
 * @param groupedAnswers - an object containing arrays of numeric answers per trait
 * @param scale - optional [min,max] of the answer scale (defaults to [1,5])
 */
export function calculateScores(
  groupedAnswers: GroupedAnswers,
  scale: { min: number; max: number } = { min: 1, max: 5 },
): PersonalityScores {
  validateGroupedAnswers(groupedAnswers);

  const normalize = (avg: number) => {
    const { min, max } = scale;
    if (max === min) return 0;
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

function average(arr: number[]): number {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((s, v) => s + v, 0);
  return sum / arr.length;
}

function clamp(n: number, min: number, max: number) {
  return n < min ? min : n > max ? max : n;
}

export function validateGroupedAnswers(
  input: any,
): asserts input is GroupedAnswers {
  const traits: Trait[] = [
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

export default { calculateScores, validateGroupedAnswers };

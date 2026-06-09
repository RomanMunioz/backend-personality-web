import mongoose, { Schema, Document } from 'mongoose';

export interface AssessmentResultDocument extends Document {
  answers?: unknown;
  groupedAnswers?: Record<string, number[]>;
  scores?: Record<string, number>;
  report?: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentResultSchema = new Schema<AssessmentResultDocument>(
  {
    answers: { type: Schema.Types.Mixed, default: undefined },
    groupedAnswers: { type: Schema.Types.Mixed, default: undefined },
    scores: { type: Schema.Types.Mixed, default: undefined },
    report: { type: Schema.Types.Mixed, default: undefined },
  },
  { timestamps: true },
);

AssessmentResultSchema.index({ createdAt: -1 });

export const AssessmentResult = mongoose.model<AssessmentResultDocument>(
  'AssessmentResult',
  AssessmentResultSchema,
);

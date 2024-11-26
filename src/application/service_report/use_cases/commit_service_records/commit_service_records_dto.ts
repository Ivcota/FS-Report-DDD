import { z } from "zod";

export type CommitServiceRecordsUseCaseInputDTO = {
  serviceRecords: CommitServiceRecord[];
};

export const CommitServiceRecordSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  serviceMonth: z.string(),
  createdAt: z.string(),
  placeholder: z.boolean().optional(),
  bibleStudies: z.number().optional(),
  creditHours: z.number().optional(),
  serviceHours: z.number().optional(),
  comments: z.string().optional(),
  isResolved: z.boolean().optional(),
});

export const CommitServiceRecordsSchema = z.array(CommitServiceRecordSchema);

export type CommitServiceRecord = z.infer<typeof CommitServiceRecordSchema>;

export type CommitServiceRecordsUseCaseOutput = {
  success: boolean;
  error?: string;
};

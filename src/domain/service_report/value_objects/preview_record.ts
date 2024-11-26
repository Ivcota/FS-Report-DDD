import { z } from "zod";

export const PreviewRecordSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  serviceMonth: z.string(), // e.g. January 2024
  bibleStudies: z.number().optional(),
  creditHours: z.number().optional(),
  serviceHours: z.number().optional(),
  comments: z.string().optional(),
});

export const PreviewRecordListSchema = z.object({
  records: z.array(PreviewRecordSchema),
  error: z.string(),
});

export type PreviewRecord = z.infer<typeof PreviewRecordSchema>;
export type PreviewRecordList = z.infer<typeof PreviewRecordListSchema>;

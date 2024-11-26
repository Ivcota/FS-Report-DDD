export type ParseServiceRecordsUseCaseInputDTO = {
  rawString: string;
};

export type ParseServiceRecordsUseCaseOutput = {
  serviceRecords: SimplifiedServiceRecord[];
  error?: string;
};

export type SimplifiedServiceRecord = {
  id: string;
  firstName: string;
  lastName: string;
  serviceMonth: string;
  createdAt: string;
  bibleStudies: number;
  isResolved: boolean;
  creditHours?: number;
  serviceHours?: number;
  comments?: string;
  placeholder?: boolean;
};

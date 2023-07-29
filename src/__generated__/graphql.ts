/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

export type Accessory = {
  __typename?: 'Accessory';
  amount?: Maybe<Scalars['Int']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  consumption?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  minamount?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type AccessoryCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  consumption?: InputMaybe<Scalars['Int']['input']>;
  minamount?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type AccessoryUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  consumption?: InputMaybe<Scalars['Int']['input']>;
  minamount?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type AddHrvSignature = {
  testSuggest: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type AddSignature = {
  testSuggest: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type AllFactorInfo = {
  __typename?: 'AllFactorInfo';
  questionList: Array<QuestionList>;
  scaleFactor: FactorInfo;
};

export type Answer = {
  __typename?: 'Answer';
  answerGroupCode?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  question?: Maybe<ScaleQuestion>;
  questionId?: Maybe<Scalars['Int']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  scale?: Maybe<Scale>;
  scaleName?: Maybe<Scalars['String']['output']>;
  scaleTypeId?: Maybe<Scalars['Int']['output']>;
  score: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type AnswerInput = {
  answerGroupCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  number: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['Int']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleName?: InputMaybe<Scalars['String']['input']>;
  scaleTypeId?: InputMaybe<Scalars['Int']['input']>;
  score: Scalars['Int']['input'];
  type: Scalars['Int']['input'];
  uuid: Scalars['String']['input'];
};

export type AnswerQueryInput = {
  answerGroupCode?: InputMaybe<Scalars['String']['input']>;
  answerName?: InputMaybe<Scalars['String']['input']>;
};

export type AnswerResult = {
  __typename?: 'AnswerResult';
  data?: Maybe<Array<Answer>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  id: Scalars['Int']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
  user: User;
};

export type ChDetectionResult = {
  __typename?: 'ChDetectionResult';
  beatType: Scalars['Int']['output'];
  heartRate: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  morphId: Scalars['Int']['output'];
  morphType: Scalars['Int']['output'];
  qrsDelay: Scalars['Int']['output'];
  qrsIndex: Scalars['Int']['output'];
  rrInterval: Scalars['Int']['output'];
  scaleId: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ChDetectionResultInput = {
  beatType: Scalars['Int']['input'];
  heartRate: Scalars['Int']['input'];
  morphId: Scalars['Int']['input'];
  morphType: Scalars['Int']['input'];
  qrsDelay: Scalars['Int']['input'];
  qrsIndex: Scalars['Int']['input'];
  rrInterval: Scalars['Int']['input'];
  scaleId: Scalars['Int']['input'];
  time: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
  uuid: Scalars['String']['input'];
};

export type ChangeInformationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  educationId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ethnicityId?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  identificationCard?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  jobNumber?: InputMaybe<Scalars['Int']['input']>;
  marital?: InputMaybe<Scalars['Int']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
  realname?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
  workingYear?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ConsulationRecord = {
  __typename?: 'ConsulationRecord';
  address: Scalars['String']['output'];
  analyse?: Maybe<Scalars['String']['output']>;
  behaviorRecord?: Maybe<Scalars['String']['output']>;
  consulationEffect: Scalars['String']['output'];
  consulationTimes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  describe?: Maybe<Scalars['String']['output']>;
  diagnostic?: Maybe<Scalars['String']['output']>;
  doctorName: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  evaluate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metacheirisis?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  result?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['DateTime']['output'];
  treatmentPlan?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ConsulationRecordPaginationInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type CreacteFactorInput = {
  average?: InputMaybe<Scalars['Float']['input']>;
  baseLineScore?: InputMaybe<Scalars['Int']['input']>;
  calformula?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questionList?: InputMaybe<Array<Scalars['Int']['input']>>;
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId: Scalars['Int']['input'];
  sd?: InputMaybe<Scalars['Float']['input']>;
  tranformula?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
};

export type CreatAccessoryResponse = {
  __typename?: 'CreatAccessoryResponse';
  message?: Maybe<Scalars['String']['output']>;
  new?: Maybe<Accessory>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreatResponse = {
  __typename?: 'CreatResponse';
  message?: Maybe<Scalars['String']['output']>;
  new?: Maybe<TSubsidiaryDepartment>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAnswerInput = {
  answerGroupCode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  number: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  score: Scalars['Int']['input'];
  type: Scalars['Int']['input'];
};

export type CreateConsulationRecordInput = {
  address: Scalars['String']['input'];
  analyse?: InputMaybe<Scalars['String']['input']>;
  behaviorRecord?: InputMaybe<Scalars['String']['input']>;
  consulationEffect: Scalars['String']['input'];
  consulationTimes: Scalars['Int']['input'];
  describe?: InputMaybe<Scalars['String']['input']>;
  diagnostic?: InputMaybe<Scalars['String']['input']>;
  doctorName: Scalars['String']['input'];
  endTime: Scalars['DateTime']['input'];
  evaluate?: InputMaybe<Scalars['String']['input']>;
  metacheirisis?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
  result?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  treatmentPlan?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateDeInput = {
  departmentId?: InputMaybe<Array<Scalars['Int']['input']>>;
  effectiveEndTime: Scalars['DateTime']['input'];
  effectiveStartTime: Scalars['DateTime']['input'];
  isEnable: Scalars['Boolean']['input'];
  releaseTopic: Scalars['String']['input'];
  releaseType: Scalars['Int']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId?: InputMaybe<Array<Scalars['Int']['input']>>;
  subDepartmentId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateDiagnosticInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  diagnosticInfo?: InputMaybe<Scalars['String']['input']>;
  isEnable: Scalars['Boolean']['input'];
  proposal?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId: Scalars['Int']['input'];
  severity?: InputMaybe<Scalars['String']['input']>;
};

export type CreateIndividualEvaluationInput = {
  effectiveEndTime: Scalars['DateTime']['input'];
  effectiveStartTime: Scalars['DateTime']['input'];
  id: Scalars['Int']['input'];
  isEnable: Scalars['Int']['input'];
  releaseTopic: Scalars['String']['input'];
  releaseType: Scalars['Int']['input'];
  scaleList: Array<Scalars['Int']['input']>;
  userList: Array<Scalars['Int']['input']>;
};

export type CreateResponse = {
  __typename?: 'CreateResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateScaleAnswerResponse = {
  __typename?: 'CreateScaleAnswerResponse';
  message: Scalars['String']['output'];
};

export type CreateScaleQuestionResponse = {
  __typename?: 'CreateScaleQuestionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateSubsidiaryDepartmentInput = {
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  institutionCode: Scalars['String']['input'];
  isEnable: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUpbringingHistoryInput = {
  endAge: Scalars['Int']['input'];
  provider: Scalars['String']['input'];
  startAge: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateWarningInput = {
  isEnable: Scalars['Boolean']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId: Scalars['Int']['input'];
  warningColor: Scalars['String']['input'];
  warningExpression: Scalars['String']['input'];
  warningResult: Scalars['String']['input'];
  warningType: Scalars['Int']['input'];
};

export type CreatfatherResponse = {
  __typename?: 'CreatfatherResponse';
  message?: Maybe<Scalars['String']['output']>;
  new?: Maybe<Department>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CustomAnswerInput = {
  answerId: Scalars['Int']['input'];
  customAnswer: Scalars['String']['input'];
  questionId: Scalars['Int']['input'];
};

export type DePaginationInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Department = {
  __typename?: 'Department';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institutionCode: Scalars['String']['output'];
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type DepartmentEvaluation = {
  __typename?: 'DepartmentEvaluation';
  createdAt: Scalars['DateTime']['output'];
  effectiveEndTime: Scalars['DateTime']['output'];
  effectiveStartTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnable: Scalars['Boolean']['output'];
  releaseTopic: Scalars['String']['output'];
  releaseType: Scalars['Int']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type DepartmentEvaluationWithId = {
  __typename?: 'DepartmentEvaluationWithId';
  createdAt: Scalars['DateTime']['output'];
  departmentId?: Maybe<Array<Scalars['Int']['output']>>;
  effectiveEndTime: Scalars['DateTime']['output'];
  effectiveStartTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnable: Scalars['Boolean']['output'];
  releaseTopic: Scalars['String']['output'];
  releaseType: Scalars['Int']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  scaleId?: Maybe<Array<Scalars['Int']['output']>>;
  subDepartmentId?: Maybe<Array<Scalars['Int']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type DepartmentWithSub = {
  __typename?: 'DepartmentWithSub';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institutionCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subsidiaryDepartment: Array<Subdepartment>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type DepartmentfCreateInput = {
  institutionCode: Scalars['String']['input'];
  isEnable: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
};

export type DiagnosticPaginationInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type EcgHrvReportInput = {
  hf: Scalars['Float']['input'];
  hfNorm: Scalars['Float']['input'];
  intervalStatistics: Array<Scalars['Int']['input']>;
  lf: Scalars['Float']['input'];
  lfNorm: Scalars['Float']['input'];
  mean: Scalars['Float']['input'];
  pnn50: Scalars['Float']['input'];
  powerData: Array<Scalars['Float']['input']>;
  ratioLHF: Scalars['Float']['input'];
  rmsssd: Scalars['Float']['input'];
  scaleId: Scalars['Float']['input'];
  sdann: Scalars['Float']['input'];
  sdnn: Scalars['Float']['input'];
  sdnni: Scalars['Float']['input'];
  tp: Scalars['Int']['input'];
  triangularIndex: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
  uuid: Scalars['String']['input'];
  vlf: Scalars['Float']['input'];
};

export type Education = {
  __typename?: 'Education';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type Ethnicity = {
  __typename?: 'Ethnicity';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type FactorInfo = {
  __typename?: 'FactorInfo';
  average?: Maybe<Scalars['Float']['output']>;
  baseLineScore?: Maybe<Scalars['Int']['output']>;
  calformula?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  scaleId: Scalars['Int']['output'];
  sd?: Maybe<Scalars['Float']['output']>;
  tranformula?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type FindDeInput = {
  depIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  scaleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  subDepIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type FindDiagnosticInput = {
  diagnosticInfo?: InputMaybe<Scalars['String']['input']>;
  scaleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type FindScaleEvaluationInput = {
  scaleName?: InputMaybe<Scalars['String']['input']>;
};

export type FindScaleEvaluationPage = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type FindWarningInput = {
  scaleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  warningResult?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllConsulationRecord = {
  __typename?: 'GetAllConsulationRecord';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<ConsulationRecord>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllDepartmentEvaluation = {
  __typename?: 'GetAllDepartmentEvaluation';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<DepartmentEvaluationWithId>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllScaleDiagnostic = {
  __typename?: 'GetAllScaleDiagnostic';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<ScaleDiagnostic>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllScaleEvaluation = {
  __typename?: 'GetAllScaleEvaluation';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<ScaleEvaluation>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllScaleQuestionReturnType = {
  __typename?: 'GetAllScaleQuestionReturnType';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<ScaleQuestionWithScale>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllScaleWarning = {
  __typename?: 'GetAllScaleWarning';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<ScaleWarning>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetAllUpbringingHistory = {
  __typename?: 'GetAllUpbringingHistory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  data: Array<UpbringingHistory>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetArchivesListInput = {
  page: Scalars['Int']['input'];
  pageNumber: Scalars['Int']['input'];
  searchName: Scalars['String']['input'];
};

export type GetArchivesListResult = {
  __typename?: 'GetArchivesListResult';
  createdAt: Scalars['DateTime']['output'];
  realname: Scalars['String']['output'];
  reportInfo: Array<ReportInfoResult>;
  subDepartment?: Maybe<SubsidiaryDepartment>;
  username: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type GetArchivesListReturnType = {
  __typename?: 'GetArchivesListReturnType';
  count: Scalars['Int']['output'];
  users: Array<GetArchivesListResult>;
};

export type GetBaseDataInput = {
  currentPage: Scalars['Int']['input'];
  pageNumber: Scalars['Int']['input'];
};

export type GetBaseInformationTableData = {
  currentPage: Scalars['Int']['input'];
  pageNumber: Scalars['Int']['input'];
  scaleName?: InputMaybe<Scalars['String']['input']>;
  scaleType?: InputMaybe<Scalars['Int']['input']>;
};

export type GetFactorListInput = {
  factorName: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  scaleName: Scalars['String']['input'];
  scaleType?: InputMaybe<Scalars['Int']['input']>;
};

export type GetIndividualScalesTableData = {
  currentPage: Scalars['Int']['input'];
  pageNumber: Scalars['Int']['input'];
  realname?: InputMaybe<Scalars['String']['input']>;
  scaleName?: InputMaybe<Scalars['String']['input']>;
};

export type GetScaleTestSearchListReturnType = {
  __typename?: 'GetScaleTestSearchListReturnType';
  count: Scalars['Int']['output'];
  scaleTestSearch: Array<ScaleTestSearchList>;
};

export type GetUserInformationTableData = {
  account?: InputMaybe<Scalars['String']['input']>;
  currentPage: Scalars['Int']['input'];
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  pageNumber: Scalars['Int']['input'];
  realname?: InputMaybe<Scalars['String']['input']>;
  subDepartmentId?: InputMaybe<Scalars['Int']['input']>;
};

export type GrowthHistory = {
  __typename?: 'GrowthHistory';
  atmosphere?: Maybe<Scalars['String']['output']>;
  brosRealtion?: Maybe<Scalars['String']['output']>;
  childExperience?: Maybe<Scalars['String']['output']>;
  collegeSituation?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dadEducation?: Maybe<Scalars['String']['output']>;
  dadTrait?: Maybe<Scalars['String']['output']>;
  earlyMemory?: Maybe<Scalars['String']['output']>;
  emotion?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  importantEvent?: Maybe<Scalars['String']['output']>;
  impressiveEvent?: Maybe<Scalars['String']['output']>;
  interperRelation?: Maybe<Scalars['String']['output']>;
  juniorCollegeSituation?: Maybe<Scalars['String']['output']>;
  juniorSituation?: Maybe<Scalars['String']['output']>;
  kindergartenSituation?: Maybe<Scalars['String']['output']>;
  momDadRelation?: Maybe<Scalars['String']['output']>;
  momEducation?: Maybe<Scalars['String']['output']>;
  momTarit?: Maybe<Scalars['String']['output']>;
  providerBedAge?: Maybe<Scalars['Int']['output']>;
  providerEducation?: Maybe<Scalars['String']['output']>;
  providerTrait?: Maybe<Scalars['String']['output']>;
  pupilSituation?: Maybe<Scalars['String']['output']>;
  rewardAndPunish?: Maybe<Scalars['String']['output']>;
  seniorSituation?: Maybe<Scalars['String']['output']>;
  successAndFailure?: Maybe<Scalars['String']['output']>;
  technicalSituation?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type GrowthHistoryInput = {
  atmosphere?: InputMaybe<Scalars['String']['input']>;
  brosRealtion?: InputMaybe<Scalars['String']['input']>;
  childExperience?: InputMaybe<Scalars['String']['input']>;
  collegeSituation?: InputMaybe<Scalars['String']['input']>;
  dadEducation?: InputMaybe<Scalars['String']['input']>;
  dadTrait?: InputMaybe<Scalars['String']['input']>;
  earlyMemory?: InputMaybe<Scalars['String']['input']>;
  emotion?: InputMaybe<Scalars['String']['input']>;
  importantEvent?: InputMaybe<Scalars['String']['input']>;
  impressiveEvent?: InputMaybe<Scalars['String']['input']>;
  interperRelation?: InputMaybe<Scalars['String']['input']>;
  juniorCollegeSituation?: InputMaybe<Scalars['String']['input']>;
  juniorSituation?: InputMaybe<Scalars['String']['input']>;
  kindergartenSituation?: InputMaybe<Scalars['String']['input']>;
  momDadRelation?: InputMaybe<Scalars['String']['input']>;
  momEducation?: InputMaybe<Scalars['String']['input']>;
  momTarit?: InputMaybe<Scalars['String']['input']>;
  providerBedAge?: InputMaybe<Scalars['Int']['input']>;
  providerEducation?: InputMaybe<Scalars['String']['input']>;
  providerTrait?: InputMaybe<Scalars['String']['input']>;
  pupilSituation?: InputMaybe<Scalars['String']['input']>;
  rewardAndPunish?: InputMaybe<Scalars['String']['input']>;
  seniorSituation?: InputMaybe<Scalars['String']['input']>;
  successAndFailure?: InputMaybe<Scalars['String']['input']>;
  technicalSituation?: InputMaybe<Scalars['String']['input']>;
};

export type HrvReportOutput = {
  __typename?: 'HrvReportOutput';
  analysis_chart?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ecg_info?: Maybe<Scalars['String']['output']>;
  end_time?: Maybe<Scalars['DateTime']['output']>;
  heart_rate_chart?: Maybe<Scalars['String']['output']>;
  hrv_frequency_domain_analysis?: Maybe<Scalars['String']['output']>;
  hrv_time_domain_analysis?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  realname?: Maybe<Scalars['String']['output']>;
  scale_id?: Maybe<Scalars['Int']['output']>;
  scalename?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['DateTime']['output']>;
  test_analysis?: Maybe<Scalars['String']['output']>;
  test_chart?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  user_info?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  usetime?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type IndividualEvaluation = {
  __typename?: 'IndividualEvaluation';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  effectiveEndTime?: Maybe<Scalars['DateTime']['output']>;
  effectiveStartTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  realnames?: Maybe<Array<Scalars['String']['output']>>;
  releaseTopic?: Maybe<Scalars['String']['output']>;
  releaseType?: Maybe<Scalars['Int']['output']>;
  scaleNames?: Maybe<Array<Scalars['String']['output']>>;
  scalesList?: Maybe<Array<Scalars['Int']['output']>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  usersList?: Maybe<Array<Scalars['Int']['output']>>;
};

export type IndividualEvaluationDetail = {
  __typename?: 'IndividualEvaluationDetail';
  individualEvaluationDetail: IndividualEvaluation;
  scaleList?: Maybe<Array<Scalars['Int']['output']>>;
  userList?: Maybe<Array<Scalars['Int']['output']>>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MergeUserScale = {
  __typename?: 'MergeUserScale';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateAccessory: CreatAccessoryResponse;
  CreateFatherDepartment: CreatfatherResponse;
  UpdateSubsidiaryDepartment: UpdateResponse;
  addConsulationRecord: ConsulationRecord;
  addDepartmentEvaluation: DepartmentEvaluation;
  addFactor: ScaleFactor;
  addHrvSignature: Scalars['Boolean']['output'];
  addScaleDiagnostic: ScaleDiagnostic;
  addScaleWarning: ScaleWarning;
  addSignature: Scalars['Boolean']['output'];
  addUpbringingHistory: UpbringingHistory;
  changePassword: User;
  createAnswer: CreateScaleAnswerResponse;
  createIndividualEvaluation: CreateResponse;
  createMergeUserScale: MergeUserScale;
  createScaleQuestion: CreateScaleQuestionResponse;
  createSubsidiaryDepartment: CreatResponse;
  deleteAccessory: Scalars['String']['output'];
  deleteAnswer: Answer;
  deleteConsulationRecord: ConsulationRecord;
  deleteDepartmentEvaluation: DepartmentEvaluation;
  deleteDiagnostic: ScaleDiagnostic;
  deleteFactor: ScaleFactor;
  deleteIndividualEvaluation: CreateResponse;
  deleteScaleQuestionById: ScaleQuestion;
  deleteUpbringingHistory: UpbringingHistory;
  deleteUser: User;
  deleteWarning: ScaleWarning;
  deletesubDepartmentById: SubsidiaryDepartment;
  login: Auth;
  refreshToken: Token;
  saveChDetectionResult: Scalars['Boolean']['output'];
  saveEcgHrvReport: Scalars['Boolean']['output'];
  saveReportQuestionChoose: Scalars['Boolean']['output'];
  saveReportQuestionChooseUseQuestionidAndAnswerid: Scalars['Boolean']['output'];
  signup: Auth;
  submitBaseInformation: Scale;
  submitUserInformation: User;
  updateAccessory: CreatAccessoryResponse;
  updateAnswer: Answer;
  updateConsulationRecord: ConsulationRecord;
  updateDepartmentEvaluation: DepartmentEvaluation;
  updateDiagnostic: ScaleDiagnostic;
  updateOrCreateGrowthHistory: GrowthHistory;
  updateScaleQuestion: UpdateScaleQuestionResponse;
  updateSignatureById: User;
  updateTestAnalysis: Scalars['Boolean']['output'];
  updateUpbringingHistory: UpbringingHistory;
  updateUserById: User;
  updateWarning: ScaleWarning;
};


export type MutationCreateAccessoryArgs = {
  data: AccessoryCreateInput;
};


export type MutationCreateFatherDepartmentArgs = {
  data: DepartmentfCreateInput;
};


export type MutationUpdateSubsidiaryDepartmentArgs = {
  data: SubsidiaryDepartmentUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationAddConsulationRecordArgs = {
  input: CreateConsulationRecordInput;
};


export type MutationAddDepartmentEvaluationArgs = {
  data: CreateDeInput;
};


export type MutationAddFactorArgs = {
  data: CreacteFactorInput;
};


export type MutationAddHrvSignatureArgs = {
  data: AddHrvSignature;
};


export type MutationAddScaleDiagnosticArgs = {
  data: CreateDiagnosticInput;
};


export type MutationAddScaleWarningArgs = {
  data: CreateWarningInput;
};


export type MutationAddSignatureArgs = {
  data: AddSignature;
};


export type MutationAddUpbringingHistoryArgs = {
  input: CreateUpbringingHistoryInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateAnswerArgs = {
  data: CreateAnswerInput;
};


export type MutationCreateIndividualEvaluationArgs = {
  data: CreateIndividualEvaluationInput;
};


export type MutationCreateMergeUserScaleArgs = {
  individualEvaluationId: Scalars['Int']['input'];
  scaleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateScaleQuestionArgs = {
  data: ScaleQuestionInput;
};


export type MutationCreateSubsidiaryDepartmentArgs = {
  data: CreateSubsidiaryDepartmentInput;
};


export type MutationDeleteAccessoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteAnswerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteConsulationRecordArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDepartmentEvaluationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDiagnosticArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFactorArgs = {
  data: Scalars['String']['input'];
};


export type MutationDeleteIndividualEvaluationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteScaleQuestionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUpbringingHistoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  data: Scalars['String']['input'];
};


export type MutationDeleteWarningArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletesubDepartmentByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT']['input'];
};


export type MutationSaveChDetectionResultArgs = {
  chDetectionResultInput: ChDetectionResultInput;
};


export type MutationSaveEcgHrvReportArgs = {
  ecgHrvReportInput: EcgHrvReportInput;
};


export type MutationSaveReportQuestionChooseArgs = {
  reportQuestionChooseInput: ReportQuestionChooseInput;
};


export type MutationSaveReportQuestionChooseUseQuestionidAndAnsweridArgs = {
  reportQuestionChooseUseQuestionidAndAnsweridInput: ReportQuestionChooseUseQuestionidAndAnsweridInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationSubmitBaseInformationArgs = {
  data: SubmitBaseInformation;
};


export type MutationSubmitUserInformationArgs = {
  data: SubmitUserInformation;
};


export type MutationUpdateAccessoryArgs = {
  data: AccessoryUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateAnswerArgs = {
  id: Scalars['Int']['input'];
  updateAnswerInput: UpdateAnswerInput;
};


export type MutationUpdateConsulationRecordArgs = {
  id: Scalars['Int']['input'];
  input: UpdateConsulationRecordInput;
};


export type MutationUpdateDepartmentEvaluationArgs = {
  data: CreateDeInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateDiagnosticArgs = {
  data: UpdateDiagnosticInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOrCreateGrowthHistoryArgs = {
  input: GrowthHistoryInput;
  userId: Scalars['Int']['input'];
};


export type MutationUpdateScaleQuestionArgs = {
  data: ScaleQuestionUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateSignatureByIdArgs = {
  id: Scalars['Int']['input'];
  signature: Scalars['String']['input'];
};


export type MutationUpdateTestAnalysisArgs = {
  data: UpdateTestAnalysis;
};


export type MutationUpdateUpbringingHistoryArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUpbringingHistoryInput;
};


export type MutationUpdateUserByIdArgs = {
  data: ChangeInformationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateWarningArgs = {
  data: UpdateWarningInput;
  id: Scalars['Int']['input'];
};

export type PagResponse = {
  __typename?: 'PagResponse';
  accessories?: Maybe<Array<Accessory>>;
  totalCount: Scalars['Int']['output'];
};

export type PaginationArg = {
  page?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type PaginationArgs = {
  page?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type PaginationInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type QrCodeType = {
  __typename?: 'QrCodeType';
  qrCode?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  answerGetAllSclaeQuestion: GetAllScaleQuestionReturnType;
  consulationRecords: GetAllConsulationRecord;
  departmentEvaluations: GetAllDepartmentEvaluation;
  departments: Array<Department>;
  findAccessory: Array<Accessory>;
  findAccessoryByCode?: Maybe<Array<Accessory>>;
  findAccessoryById: Accessory;
  findAccessoryPagination: PagResponse;
  findDepartments: Array<Department>;
  findSubDepartments: Array<Subdepartment>;
  findSubOfDepartments?: Maybe<DepartmentWithSub>;
  generateQrCode: QrCodeType;
  getAllChDetectionResult: Array<ChDetectionResult>;
  getAllEcgHrvReport: Array<ChDetectionResult>;
  getAllHrvReport: Array<HrvReportOutput>;
  getAllHrvReportOnOnePage: Array<HrvReportOutput>;
  getAllScaleTypeAndName: ScaleTypeReturnType;
  getAllSclaeQuestion: GetAllScaleQuestionReturnType;
  getAnswer: AnswerResult;
  getArchivesList: GetArchivesListReturnType;
  getBaseInformationTableData: Array<Scale>;
  getEducations: Array<Education>;
  getEthnicities: Array<Ethnicity>;
  getFactor: AllFactorInfo;
  getFactorList: Array<ScaleFactor>;
  getFactorNumber: Scalars['Int']['output'];
  getFactorScaleType: Scalars['Int']['output'];
  getGrowthHistoryById?: Maybe<GrowthHistory>;
  getIndividualEvaluationDetail: IndividualEvaluationDetail;
  getIndividualScalesTableData: Array<IndividualEvaluation>;
  getQuestionByScaleName: Array<ScaleQuestion>;
  getReportInfo: ReportInfo;
  getScaleByType: ScaleReturnType;
  getScaleDetail: Scale;
  getScaleIdByName: QueryScaleIdByNameReturnType;
  getScaleName: Array<Scale>;
  getScaleQuestionByScaleUUID: Array<ScaleQuestionRender>;
  getScaleQuestionByScaleUUIDWithTitleAndInstructions: ScaleQuestionWithTitleAndInstructionsRender;
  getScaleTestSearchList: GetScaleTestSearchListReturnType;
  getScaleType: Array<ScaleType>;
  getScaleTypes: Array<ScaleType>;
  getUserById: User;
  getUserDetail: User;
  getUserInformationTableData: Array<User>;
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  me: User;
  scaleDiagnostics: GetAllScaleDiagnostic;
  scaleEvaluations: GetAllScaleEvaluation;
  scaleTypes: Array<ScaleType>;
  scaleWarnings: GetAllScaleWarning;
  scales: Array<Scale>;
  subdepartment: SubsidiaryDepartment;
  subdepartments: Array<Subdepartment>;
  subsidiaryDepartments: Array<SubsidiaryDepartment>;
  totalCount: Scalars['Int']['output'];
  upbringingHistorys: GetAllUpbringingHistory;
  users: Array<User>;
};


export type QueryAnswerGetAllSclaeQuestionArgs = {
  data?: InputMaybe<QuestionQueryInput>;
};


export type QueryConsulationRecordsArgs = {
  page: ConsulationRecordPaginationInput;
  userId: Scalars['Int']['input'];
};


export type QueryDepartmentEvaluationsArgs = {
  input: FindDeInput;
  pagination: DePaginationInput;
};


export type QueryFindAccessoryArgs = {
  type: Scalars['String']['input'];
};


export type QueryFindAccessoryByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryFindAccessoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindAccessoryPaginationArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type QueryFindSubOfDepartmentsArgs = {
  data: Scalars['Int']['input'];
};


export type QueryGenerateQrCodeArgs = {
  data: Scalars['String']['input'];
};


export type QueryGetAllChDetectionResultArgs = {
  data: GetBaseDataInput;
};


export type QueryGetAllEcgHrvReportArgs = {
  data: GetBaseDataInput;
};


export type QueryGetAllHrvReportArgs = {
  data: GetBaseDataInput;
};


export type QueryGetAllSclaeQuestionArgs = {
  data?: InputMaybe<QuestionQueryInput>;
  pagination: PaginationArgs;
};


export type QueryGetAnswerArgs = {
  data?: InputMaybe<AnswerQueryInput>;
  pagination: PaginationArg;
};


export type QueryGetArchivesListArgs = {
  data: GetArchivesListInput;
};


export type QueryGetBaseInformationTableDataArgs = {
  data: GetBaseInformationTableData;
};


export type QueryGetFactorArgs = {
  data: Scalars['String']['input'];
};


export type QueryGetFactorListArgs = {
  data: GetFactorListInput;
};


export type QueryGetFactorNumberArgs = {
  data: GetFactorListInput;
};


export type QueryGetFactorScaleTypeArgs = {
  data: Scalars['String']['input'];
};


export type QueryGetGrowthHistoryByIdArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetIndividualEvaluationDetailArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetIndividualScalesTableDataArgs = {
  data: GetIndividualScalesTableData;
};


export type QueryGetQuestionByScaleNameArgs = {
  data: Scalars['Int']['input'];
};


export type QueryGetReportInfoArgs = {
  data: Scalars['String']['input'];
};


export type QueryGetScaleByTypeArgs = {
  scaleTypeId: Scalars['Int']['input'];
};


export type QueryGetScaleDetailArgs = {
  data: Scalars['Int']['input'];
};


export type QueryGetScaleIdByNameArgs = {
  data: QueryScaleIdByNameInput;
};


export type QueryGetScaleQuestionByScaleUuidArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryGetScaleQuestionByScaleUuidWithTitleAndInstructionsArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryGetScaleTestSearchListArgs = {
  data: ScaleTestSearchInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserDetailArgs = {
  data: Scalars['Int']['input'];
};


export type QueryGetUserInformationTableDataArgs = {
  data: GetUserInformationTableData;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};


export type QueryScaleDiagnosticsArgs = {
  data: FindDiagnosticInput;
  pagination: DiagnosticPaginationInput;
};


export type QueryScaleEvaluationsArgs = {
  input: FindScaleEvaluationInput;
  pagination: FindScaleEvaluationPage;
  userId: Scalars['Int']['input'];
};


export type QueryScaleWarningsArgs = {
  data: FindWarningInput;
  pagination: PaginationInput;
};


export type QuerySubdepartmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTotalCountArgs = {
  data: GetBaseInformationTableData;
};


export type QueryUpbringingHistorysArgs = {
  page: UpbringPaginationInput;
  userId: Scalars['Int']['input'];
};

export type QueryScaleIdByNameInput = {
  scaleName: Scalars['String']['input'];
  scaleTypeId: Scalars['Int']['input'];
};

export type QueryScaleIdByNameReturnType = {
  __typename?: 'QueryScaleIdByNameReturnType';
  data: Array<Scale>;
};

export type QuestionList = {
  __typename?: 'QuestionList';
  factorId: Scalars['Int']['output'];
  questionId: Scalars['Int']['output'];
};

export type QuestionQueryInput = {
  questionName?: InputMaybe<Scalars['String']['input']>;
  scaleName?: InputMaybe<Scalars['String']['input']>;
  scaleTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type QuestionidAndAnsweridInput = {
  customAnswer?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  questionId: Scalars['Int']['input'];
  type: Scalars['Int']['input'];
};

export type ReportInfo = {
  __typename?: 'ReportInfo';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rawScore: Scalars['Int']['output'];
  report_result_id: Scalars['Int']['output'];
  scaleId: Scalars['Int']['output'];
  testAnalysis?: Maybe<Scalars['String']['output']>;
  testChart?: Maybe<Scalars['String']['output']>;
  testInfo?: Maybe<Scalars['String']['output']>;
  testPrompt?: Maybe<Scalars['String']['output']>;
  testResult?: Maybe<Scalars['String']['output']>;
  testSuggest?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  userInfo?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type ReportInfoResult = {
  __typename?: 'ReportInfoResult';
  createdAt: Scalars['DateTime']['output'];
  rawScore: Scalars['Int']['output'];
  scale: Scale;
  testAnalysis?: Maybe<Scalars['String']['output']>;
  testPrompt?: Maybe<Scalars['String']['output']>;
  testSuggest?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type ReportQuestionChooseInput = {
  answer: Array<AnswerInput>;
  customAnswer: Array<CustomAnswerInput>;
  departmentEvaluationId?: InputMaybe<Scalars['Int']['input']>;
  individualEvaluationId?: InputMaybe<Scalars['Int']['input']>;
  scaleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type ReportQuestionChooseUseQuestionidAndAnsweridInput = {
  QuestionidAndAnsweridInput: Array<QuestionidAndAnsweridInput>;
  scaleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
  uuid: Scalars['String']['input'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Directior = 'DIRECTIOR',
  Doctor = 'DOCTOR',
  User = 'USER'
}

export type Scale = {
  __typename?: 'Scale';
  average?: Maybe<Scalars['Float']['output']>;
  calformula?: Maybe<Scalars['String']['output']>;
  chartType?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  introduction?: Maybe<Scalars['String']['output']>;
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  isFactor?: Maybe<Scalars['Boolean']['output']>;
  isSkip?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  scacleCode?: Maybe<Scalars['String']['output']>;
  scaleTypeId?: Maybe<Scalars['Int']['output']>;
  sd?: Maybe<Scalars['Float']['output']>;
  skipRule?: Maybe<Scalars['String']['output']>;
  tranformula?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ScaleDiagnostic = {
  __typename?: 'ScaleDiagnostic';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  diagnosticInfo?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEnable: Scalars['Boolean']['output'];
  proposal?: Maybe<Scalars['String']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  scaleId: Scalars['Int']['output'];
  severity?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ScaleEvaluation = {
  __typename?: 'ScaleEvaluation';
  createdAt: Scalars['DateTime']['output'];
  departmentEvaluationId?: Maybe<Scalars['Int']['output']>;
  effectiveEndTime?: Maybe<Scalars['DateTime']['output']>;
  effectiveStartTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  individualEvaluationId?: Maybe<Scalars['Int']['output']>;
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  isSkip?: Maybe<Scalars['Boolean']['output']>;
  isTest?: Maybe<Scalars['Boolean']['output']>;
  releaseTopic?: Maybe<Scalars['String']['output']>;
  releaseType?: Maybe<Scalars['Int']['output']>;
  scaleId?: Maybe<Scalars['Int']['output']>;
  scaleInstructions?: Maybe<Scalars['String']['output']>;
  scaleIsEnable?: Maybe<Scalars['Boolean']['output']>;
  scaleName?: Maybe<Scalars['String']['output']>;
  skipRule?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ScaleFactor = {
  __typename?: 'ScaleFactor';
  average?: Maybe<Scalars['Float']['output']>;
  baseLineScore?: Maybe<Scalars['Int']['output']>;
  calformula?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  questionList?: Maybe<Array<Scalars['Int']['output']>>;
  remark?: Maybe<Scalars['String']['output']>;
  scaleId: Scalars['Int']['output'];
  sd?: Maybe<Scalars['Float']['output']>;
  tranformula?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ScaleQuestion = {
  __typename?: 'ScaleQuestion';
  answerGroupCode?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  questionCode?: Maybe<Scalars['String']['output']>;
  questionImg?: Maybe<Scalars['String']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  scale?: Maybe<Scale>;
  timeLimit?: Maybe<Scalars['Int']['output']>;
  type: Scalars['Int']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type ScaleQuestionInput = {
  answerGroupCode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questionCode?: InputMaybe<Scalars['String']['input']>;
  questionImg?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleName: Scalars['String']['input'];
  scaleTypeId: Scalars['Int']['input'];
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['Int']['input'];
};

export type ScaleQuestionRender = {
  __typename?: 'ScaleQuestionRender';
  answer: Array<Answer>;
  answerGroupCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  questionCode?: Maybe<Scalars['String']['output']>;
  questionImg?: Maybe<Scalars['String']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  scaleId: Scalars['Int']['output'];
  timeLimit?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ScaleQuestionUpdateInput = {
  answerGroupCode?: InputMaybe<Scalars['String']['input']>;
  createdAt: Scalars['DateTime']['input'];
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  questionCode?: InputMaybe<Scalars['String']['input']>;
  questionImg?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleName: Scalars['String']['input'];
  scaleTypeId: Scalars['Int']['input'];
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
};

export type ScaleQuestionWithScale = {
  __typename?: 'ScaleQuestionWithScale';
  answerGroupCode?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  questionCode?: Maybe<Scalars['String']['output']>;
  questionImg?: Maybe<Scalars['String']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  scale: ScaleWithType;
  timeLimit?: Maybe<Scalars['Int']['output']>;
  type: Scalars['Int']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type ScaleQuestionWithTitleAndInstructionsRender = {
  __typename?: 'ScaleQuestionWithTitleAndInstructionsRender';
  ScaleQuestionRender: Array<ScaleQuestionRender>;
  instructions: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScaleReturnType = {
  __typename?: 'ScaleReturnType';
  data: Array<Scale>;
};

export type ScaleTestSearchInput = {
  currentPage: Scalars['Int']['input'];
  endTime?: InputMaybe<Scalars['Float']['input']>;
  realName?: InputMaybe<Scalars['String']['input']>;
  scaleName?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Float']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type ScaleTestSearchList = {
  __typename?: 'ScaleTestSearchList';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rawScore: Scalars['Int']['output'];
  report_result_id: Scalars['Int']['output'];
  scale: Scale;
  scaleId: Scalars['Int']['output'];
  testAnalysis?: Maybe<Scalars['String']['output']>;
  testChart?: Maybe<Scalars['String']['output']>;
  testInfo?: Maybe<Scalars['String']['output']>;
  testPrompt?: Maybe<Scalars['String']['output']>;
  testResult?: Maybe<Scalars['String']['output']>;
  testSuggest?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  userInfo?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type ScaleType = {
  __typename?: 'ScaleType';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ScaleTypeReturnType = {
  __typename?: 'ScaleTypeReturnType';
  data: Array<ScaleType>;
};

export type ScaleWarning = {
  __typename?: 'ScaleWarning';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnable: Scalars['Boolean']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  scaleId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  warningColor: Scalars['String']['output'];
  warningExpression: Scalars['String']['output'];
  warningResult: Scalars['String']['output'];
  warningType: Scalars['Int']['output'];
};

export type ScaleWithType = {
  __typename?: 'ScaleWithType';
  average?: Maybe<Scalars['Float']['output']>;
  averageSourceMethod?: Maybe<Scalars['String']['output']>;
  baselineScore?: Maybe<Scalars['Int']['output']>;
  calformula?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  introduction?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rawSourceMethod?: Maybe<Scalars['String']['output']>;
  scacleCode?: Maybe<Scalars['String']['output']>;
  scaleInterpretationResult?: Maybe<Scalars['String']['output']>;
  scaleTimeKeeping?: Maybe<Scalars['Boolean']['output']>;
  scaleTimeLimit?: Maybe<Scalars['Int']['output']>;
  scaleType: ScaleType;
  scaleTypeId: Scalars['Int']['output'];
  sd?: Maybe<Scalars['Int']['output']>;
  standardSourceMethod?: Maybe<Scalars['String']['output']>;
  tranformula?: Maybe<Scalars['String']['output']>;
  tranformulakey?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type SignupInput = {
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Subdepartment = {
  __typename?: 'Subdepartment';
  createdAt: Scalars['DateTime']['output'];
  department: Department;
  departmentId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  institutionCode: Scalars['String']['output'];
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type SubmitBaseInformation = {
  average?: InputMaybe<Scalars['Float']['input']>;
  calformula?: InputMaybe<Scalars['String']['input']>;
  chartType?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  isEnable: Scalars['Boolean']['input'];
  isFactor: Scalars['Boolean']['input'];
  isSkip: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  scacleCode?: InputMaybe<Scalars['String']['input']>;
  scaleTypeId: Scalars['Int']['input'];
  sd?: InputMaybe<Scalars['Float']['input']>;
  skipRule?: InputMaybe<Scalars['String']['input']>;
  tranformula?: InputMaybe<Scalars['String']['input']>;
};

export type SubmitUserInformation = {
  address?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  educationId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ethnicityId?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  identificationCard?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isEnable?: InputMaybe<Scalars['Boolean']['input']>;
  jobNumber?: InputMaybe<Scalars['Int']['input']>;
  marital?: InputMaybe<Scalars['Int']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  qualification?: InputMaybe<Scalars['String']['input']>;
  realname: Scalars['String']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  signature?: InputMaybe<Scalars['String']['input']>;
  subDepartmentId?: InputMaybe<Scalars['Int']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  workingYear?: InputMaybe<Scalars['Int']['input']>;
};

export type SubsidiaryDepartment = {
  __typename?: 'SubsidiaryDepartment';
  createdAt: Scalars['DateTime']['output'];
  departmentId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  institutionCode: Scalars['String']['output'];
  isEnable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<Array<User>>;
  uuid: Scalars['String']['output'];
};

export type SubsidiaryDepartmentUpdateInput = {
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  institutionCode: Scalars['String']['input'];
  isEnable: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  id: Scalars['Int']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UpbringPaginationInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type UpbringingHistory = {
  __typename?: 'UpbringingHistory';
  createdAt: Scalars['DateTime']['output'];
  endAge: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  provider: Scalars['String']['output'];
  startAge: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type UpdateAnswerInput = {
  answerGroupCode: Scalars['String']['input'];
  createdAt: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  number: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  score: Scalars['Int']['input'];
  type: Scalars['Int']['input'];
};

export type UpdateConsulationRecordInput = {
  address: Scalars['String']['input'];
  analyse?: InputMaybe<Scalars['String']['input']>;
  behaviorRecord?: InputMaybe<Scalars['String']['input']>;
  consulationEffect: Scalars['String']['input'];
  consulationTimes: Scalars['Int']['input'];
  describe?: InputMaybe<Scalars['String']['input']>;
  diagnostic?: InputMaybe<Scalars['String']['input']>;
  doctorName: Scalars['String']['input'];
  endTime: Scalars['DateTime']['input'];
  evaluate?: InputMaybe<Scalars['String']['input']>;
  metacheirisis?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
  result?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  treatmentPlan?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDiagnosticInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  diagnosticInfo?: InputMaybe<Scalars['String']['input']>;
  isEnable: Scalars['Boolean']['input'];
  proposal?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId: Scalars['Int']['input'];
  severity?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  id: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  new?: Maybe<TSubsidiaryDepartment>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateScaleQuestionResponse = {
  __typename?: 'UpdateScaleQuestionResponse';
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateTestAnalysis = {
  testAnalysis: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type UpdateUpbringingHistoryInput = {
  endAge: Scalars['Int']['input'];
  provider: Scalars['String']['input'];
  startAge: Scalars['Int']['input'];
};

export type UpdateWarningInput = {
  isEnable: Scalars['Boolean']['input'];
  remark?: InputMaybe<Scalars['String']['input']>;
  scaleId: Scalars['Int']['input'];
  warningColor: Scalars['String']['input'];
  warningExpression: Scalars['String']['input'];
  warningResult: Scalars['String']['input'];
  warningType: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  departmentId?: Maybe<Scalars['Int']['output']>;
  educationId?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  ethnicityId?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  identificationCard?: Maybe<Scalars['String']['output']>;
  introduction?: Maybe<Scalars['String']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  isDelete: Scalars['Boolean']['output'];
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  jobNumber?: Maybe<Scalars['Int']['output']>;
  marital?: Maybe<Scalars['Int']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  qualification?: Maybe<Scalars['String']['output']>;
  realname: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  role: Role;
  signature?: Maybe<Scalars['String']['output']>;
  subDepartmentId?: Maybe<Scalars['Int']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
  workingYear?: Maybe<Scalars['Int']['output']>;
};

export type TSubsidiaryDepartment = {
  __typename?: 'tSubsidiaryDepartment';
  createdAt: Scalars['DateTime']['output'];
  departmentId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  institutionCode: Scalars['String']['output'];
  isEnable?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type GetEvaluationsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetEvaluationsQuery = { __typename?: 'Query', scaleEvaluations: { __typename?: 'GetAllScaleEvaluation', data: Array<{ __typename?: 'ScaleEvaluation', scaleName?: string | null, uuid?: string | null, individualEvaluationId?: number | null, departmentEvaluationId?: number | null, createdAt: any, isTest?: boolean | null, releaseType?: number | null, effectiveStartTime?: any | null, effectiveEndTime?: any | null, isEnable?: boolean | null, skipRule?: string | null, isSkip?: boolean | null, id: string }> } };

export type GetScaleQuestionsQueryVariables = Exact<{
  scaleId: Scalars['String']['input'];
}>;


export type GetScaleQuestionsQuery = { __typename?: 'Query', getScaleQuestionByScaleUUIDWithTitleAndInstructions: { __typename?: 'ScaleQuestionWithTitleAndInstructionsRender', title: string, ScaleQuestionRender: Array<{ __typename?: 'ScaleQuestionRender', answerGroupCode?: string | null, name?: string | null, questionImg?: string | null, type?: number | null, id: number, answer: Array<{ __typename?: 'Answer', answerGroupCode?: string | null, name: string, id: number, uuid: string }> }> } };

export type SaveReportMutationVariables = Exact<{
  report: ReportQuestionChooseUseQuestionidAndAnsweridInput;
}>;


export type SaveReportMutation = { __typename?: 'Mutation', saveReportQuestionChooseUseQuestionidAndAnswerid: boolean };


export const GetEvaluationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEvaluations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scaleEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"scaleName"},"value":{"kind":"StringValue","value":"","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"1000"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scaleName"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"individualEvaluationId"}},{"kind":"Field","name":{"kind":"Name","value":"departmentEvaluationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isTest"}},{"kind":"Field","name":{"kind":"Name","value":"releaseType"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveEndTime"}},{"kind":"Field","name":{"kind":"Name","value":"isEnable"}},{"kind":"Field","name":{"kind":"Name","value":"skipRule"}},{"kind":"Field","name":{"kind":"Name","value":"isSkip"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetEvaluationsQuery, GetEvaluationsQueryVariables>;
export const GetScaleQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getScaleQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scaleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScaleQuestionByScaleUUIDWithTitleAndInstructions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scaleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ScaleQuestionRender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answerGroupCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"answerGroupCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionImg"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetScaleQuestionsQuery, GetScaleQuestionsQueryVariables>;
export const SaveReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"report"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportQuestionChooseUseQuestionidAndAnsweridInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveReportQuestionChooseUseQuestionidAndAnswerid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reportQuestionChooseUseQuestionidAndAnsweridInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"report"}}}]}]}}]} as unknown as DocumentNode<SaveReportMutation, SaveReportMutationVariables>;
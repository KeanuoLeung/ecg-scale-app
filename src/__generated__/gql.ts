/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getEvaluations($userId: Int!) {\n    scaleEvaluations(\n      input: { scaleName: \"\" }\n      pagination: { page: 1, pageSize: 1000 }\n      userId: $userId\n    ) {\n      data {\n        scaleName\n        uuid\n        individualEvaluationId\n        departmentEvaluationId\n        createdAt\n        isTest\n        releaseType\n        effectiveStartTime\n        effectiveEndTime\n        isEnable\n        skipRule\n        isSkip\n      }\n    }\n  }\n": types.GetEvaluationsDocument,
    "\n  query getScaleQuestions($scaleId: String!) {\n    getScaleQuestionByScaleUUIDWithTitleAndInstructions(uuid: $scaleId) {\n      ScaleQuestionRender {\n        answer {\n          answerGroupCode\n          name\n          id\n          uuid\n          picture\n        }\n        answerGroupCode\n        name\n        questionImg\n        type\n        id\n      }\n      title\n    }\n  }\n": types.GetScaleQuestionsDocument,
    "\n  mutation saveReport(\n    $report: ReportQuestionChooseUseQuestionidAndAnsweridInput!\n  ) {\n    saveReportQuestionChooseUseQuestionidAndAnswerid(\n      reportQuestionChooseUseQuestionidAndAnsweridInput: $report\n    )\n  }\n": types.SaveReportDocument,
    "\n  mutation saveHrvReport($report: EcgHrvReportInput!) {\n    saveEcgHrvReport(ecgHrvReportInput: $report)\n  }\n": types.SaveHrvReportDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    login(data: { username: $username, password: $password }) {\n      accessToken\n      user {\n        id\n        isAdmin\n        username\n        realname\n      }\n    }\n  }\n": types.LoginDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getEvaluations($userId: Int!) {\n    scaleEvaluations(\n      input: { scaleName: \"\" }\n      pagination: { page: 1, pageSize: 1000 }\n      userId: $userId\n    ) {\n      data {\n        scaleName\n        uuid\n        individualEvaluationId\n        departmentEvaluationId\n        createdAt\n        isTest\n        releaseType\n        effectiveStartTime\n        effectiveEndTime\n        isEnable\n        skipRule\n        isSkip\n      }\n    }\n  }\n"): (typeof documents)["\n  query getEvaluations($userId: Int!) {\n    scaleEvaluations(\n      input: { scaleName: \"\" }\n      pagination: { page: 1, pageSize: 1000 }\n      userId: $userId\n    ) {\n      data {\n        scaleName\n        uuid\n        individualEvaluationId\n        departmentEvaluationId\n        createdAt\n        isTest\n        releaseType\n        effectiveStartTime\n        effectiveEndTime\n        isEnable\n        skipRule\n        isSkip\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getScaleQuestions($scaleId: String!) {\n    getScaleQuestionByScaleUUIDWithTitleAndInstructions(uuid: $scaleId) {\n      ScaleQuestionRender {\n        answer {\n          answerGroupCode\n          name\n          id\n          uuid\n          picture\n        }\n        answerGroupCode\n        name\n        questionImg\n        type\n        id\n      }\n      title\n    }\n  }\n"): (typeof documents)["\n  query getScaleQuestions($scaleId: String!) {\n    getScaleQuestionByScaleUUIDWithTitleAndInstructions(uuid: $scaleId) {\n      ScaleQuestionRender {\n        answer {\n          answerGroupCode\n          name\n          id\n          uuid\n          picture\n        }\n        answerGroupCode\n        name\n        questionImg\n        type\n        id\n      }\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation saveReport(\n    $report: ReportQuestionChooseUseQuestionidAndAnsweridInput!\n  ) {\n    saveReportQuestionChooseUseQuestionidAndAnswerid(\n      reportQuestionChooseUseQuestionidAndAnsweridInput: $report\n    )\n  }\n"): (typeof documents)["\n  mutation saveReport(\n    $report: ReportQuestionChooseUseQuestionidAndAnsweridInput!\n  ) {\n    saveReportQuestionChooseUseQuestionidAndAnswerid(\n      reportQuestionChooseUseQuestionidAndAnsweridInput: $report\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation saveHrvReport($report: EcgHrvReportInput!) {\n    saveEcgHrvReport(ecgHrvReportInput: $report)\n  }\n"): (typeof documents)["\n  mutation saveHrvReport($report: EcgHrvReportInput!) {\n    saveEcgHrvReport(ecgHrvReportInput: $report)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($username: String!, $password: String!) {\n    login(data: { username: $username, password: $password }) {\n      accessToken\n      user {\n        id\n        isAdmin\n        username\n        realname\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(data: { username: $username, password: $password }) {\n      accessToken\n      user {\n        id\n        isAdmin\n        username\n        realname\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
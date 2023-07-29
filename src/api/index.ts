import { gql } from '../__generated__';
import {
  ReportQuestionChooseUseQuestionidAndAnsweridInput,
  ScaleEvaluation,
} from '../__generated__/graphql';
import client from './client';

const GET_LIST = gql(/* GraphQL */ `
  query getEvaluations($userId: Int!) {
    scaleEvaluations(
      input: { scaleName: "" }
      pagination: { page: 1, pageSize: 1000 }
      userId: $userId
    ) {
      data {
        scaleName
        uuid
        individualEvaluationId
        departmentEvaluationId
        createdAt
        isTest
        releaseType
        effectiveStartTime
        effectiveEndTime
        isEnable
        skipRule
        isSkip
        id
      }
    }
  }
`);

const GET_SCALE_DETAIL = gql(/* GraphQL */ `
  query getScaleQuestions($scaleId: String!) {
    getScaleQuestionByScaleUUIDWithTitleAndInstructions(uuid: $scaleId) {
      ScaleQuestionRender {
        answer {
          answerGroupCode
          name
          id
          uuid
        }
        answerGroupCode
        name
        questionImg
        type
        id
      }
      title
    }
  }
`);

const SAVE_REPORT = gql(/* GraphQL */ `
  mutation saveReport(
    $report: ReportQuestionChooseUseQuestionidAndAnsweridInput!
  ) {
    saveReportQuestionChooseUseQuestionidAndAnswerid(
      reportQuestionChooseUseQuestionidAndAnsweridInput: $report
    )
  }
`);

async function getList(userId: number) {
  const result = await client.query({
    query: GET_LIST,
    variables: { userId },
  });
  return result?.data?.scaleEvaluations?.data ?? [];
}

async function getScaleDetail(scaleId: string) {
  const result = await client.query({
    query: GET_SCALE_DETAIL,
    variables: { scaleId },
  });
  return (
    result?.data?.getScaleQuestionByScaleUUIDWithTitleAndInstructions ?? {}
  );
}

async function saveReport(
  report: ReportQuestionChooseUseQuestionidAndAnsweridInput
) {
  const result = await client.mutate({
    mutation: SAVE_REPORT,
    variables: { report },
  });
  return result.data?.saveReportQuestionChooseUseQuestionidAndAnswerid;
}

export { getList, getScaleDetail, saveReport };

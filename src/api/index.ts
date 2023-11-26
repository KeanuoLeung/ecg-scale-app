import { gql } from '../__generated__';
import {
  EcgHrvReportInput,
  LoginMutation,
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
          picture
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

const SAVE_HRV_REPORT = gql(/* GraphQL */ `
  mutation saveHrvReport($report: EcgHrvReportInput!) {
    saveEcgHrvReport(ecgHrvReportInput: $report) {
      success
      message
    }
  }
`);

const LOGIN = gql(/* GraphQL */ `
  mutation login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      accessToken
      user {
        id
        isAdmin
        username
        realname
      }
      role
    }
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
  return result.data;
}

async function saveHrvReport(report: EcgHrvReportInput) {
  const result = await client.mutate({
    mutation: SAVE_HRV_REPORT,
    variables: { report },
  });
  return result.data?.saveEcgHrvReport;
}

async function login(username: string, password: string) {
  const result = await client.mutate({
    mutation: LOGIN,
    variables: { username, password },
  });
  return result?.data?.login;
}

async function saveOriginalCsv(props: {
  time: number;
  userId: string;
  scaleId: string;
  uuid: string;
  type: 'originalEcgData' | 'chDetectionResult';
  value: string;
  reportUUIDList: string[];
}) {
  const file = new File(
    [new Blob([props.value])],
    `${props.time}_${props.userId}_${props.scaleId}_${props.uuid}_${props.type}.csv`
  );
  
  const formdata = new FormData();
  formdata.append('file', file);
  formdata.append('reportUuidList', JSON.stringify(props.reportUUIDList));

  await fetch(localStorage.getItem('endpoint') + '/ecg/upload', {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });
}

export type UserInfo = LoginMutation['login'];

export {
  getList,
  getScaleDetail,
  saveReport,
  login,
  saveHrvReport,
  saveOriginalCsv,
};

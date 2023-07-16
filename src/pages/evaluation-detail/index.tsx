import React, { useEffect, useMemo, useRef, useState } from 'react';

import './index.css';
import { IonPage } from '@ionic/react';

const TEMP_QUESTIONS = [
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '恋爱或订婚事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 1,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '恋爱或订婚性质',
    questionImg: null,
    type: 1,
    id: 2,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '恋爱或订婚精神影响程度',
    questionImg: null,
    type: 1,
    id: 3,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '恋爱或订婚影响持续时间',
    questionImg: null,
    type: 1,
    id: 4,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '恋爱失败、破裂事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 5,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '恋爱失败、破裂性质',
    questionImg: null,
    type: 1,
    id: 6,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '恋爱失败、破裂精神影响程度',
    questionImg: null,
    type: 1,
    id: 7,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '恋爱失败、破裂影响持续时间',
    questionImg: null,
    type: 1,
    id: 8,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '结婚事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 9,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '结婚性质',
    questionImg: null,
    type: 1,
    id: 10,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '结婚精神影响程度',
    questionImg: null,
    type: 1,
    id: 11,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '结婚影响持续时间',
    questionImg: null,
    type: 1,
    id: 12,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '自己（爱人）怀孕事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 13,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '自己（爱人）怀孕性质',
    questionImg: null,
    type: 1,
    id: 14,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '自己（爱人）怀孕精神影响程度',
    questionImg: null,
    type: 1,
    id: 15,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '自己（爱人）怀孕影响持续时间',
    questionImg: null,
    type: 1,
    id: 16,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '自己（爱人）流产事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 17,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '自己（爱人）流产性质',
    questionImg: null,
    type: 1,
    id: 18,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '自己（爱人）流产精神影响程度',
    questionImg: null,
    type: 1,
    id: 19,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '自己（爱人）流产影响持续时间',
    questionImg: null,
    type: 1,
    id: 20,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '家庭增添新成员事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 21,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '家庭增添新成员性质',
    questionImg: null,
    type: 1,
    id: 22,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '家庭增添新成员精神影响程度',
    questionImg: null,
    type: 1,
    id: 23,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '家庭增添新成员影响持续时间',
    questionImg: null,
    type: 1,
    id: 24,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '与爱人父母不和事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 25,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '与爱人父母不和性质',
    questionImg: null,
    type: 1,
    id: 26,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '与爱人父母不和精神影响程度',
    questionImg: null,
    type: 1,
    id: 27,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '与爱人父母不和影响持续时间',
    questionImg: null,
    type: 1,
    id: 28,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '夫妻感情不好事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 29,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '夫妻感情不好性质',
    questionImg: null,
    type: 1,
    id: 30,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '夫妻感情不好精神影响程度',
    questionImg: null,
    type: 1,
    id: 31,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '夫妻感情不好影响持续时间',
    questionImg: null,
    type: 1,
    id: 32,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '夫妻分居（因不和）事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 33,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '夫妻分居（因不和）性质',
    questionImg: null,
    type: 1,
    id: 34,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '夫妻分居（因不和）精神影响程度',
    questionImg: null,
    type: 1,
    id: 35,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '夫妻分居（因不和）影响持续时间',
    questionImg: null,
    type: 1,
    id: 36,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '性生活不满意或独身事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 37,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '性生活不满意或独身性质',
    questionImg: null,
    type: 1,
    id: 38,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '性生活不满意或独身精神影响程度',
    questionImg: null,
    type: 1,
    id: 39,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '性生活不满意或独身影响持续时间',
    questionImg: null,
    type: 1,
    id: 40,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '夫妻两地分居（工作需要）事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 41,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '夫妻两地分居（工作需要）性质',
    questionImg: null,
    type: 1,
    id: 42,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '夫妻两地分居（工作需要）精神影响程度',
    questionImg: null,
    type: 1,
    id: 43,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '夫妻两地分居（工作需要）影响持续时间',
    questionImg: null,
    type: 1,
    id: 44,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '配偶一方有外遇事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 45,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '配偶一方有外遇性质',
    questionImg: null,
    type: 1,
    id: 46,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '配偶一方有外遇精神影响程度',
    questionImg: null,
    type: 1,
    id: 47,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '配偶一方有外遇影响持续时间',
    questionImg: null,
    type: 1,
    id: 48,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '夫妻重归于好事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 49,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '夫妻重归于好性质',
    questionImg: null,
    type: 1,
    id: 50,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '夫妻重归于好精神影响程度',
    questionImg: null,
    type: 1,
    id: 51,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '夫妻重归于好影响持续时间',
    questionImg: null,
    type: 1,
    id: 52,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '超指标生育事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 53,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '超指标生育性质',
    questionImg: null,
    type: 1,
    id: 54,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '超指标生育精神影响程度',
    questionImg: null,
    type: 1,
    id: 55,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '超指标生育影响持续时间',
    questionImg: null,
    type: 1,
    id: 56,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '本人（爱人）作绝育手术事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 57,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '本人（爱人）作绝育手术性质',
    questionImg: null,
    type: 1,
    id: 58,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '本人（爱人）作绝育手术精神影响程度',
    questionImg: null,
    type: 1,
    id: 59,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '本人（爱人）作绝育手术影响持续时间',
    questionImg: null,
    type: 1,
    id: 60,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '配偶死亡事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 61,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '配偶死亡性质',
    questionImg: null,
    type: 1,
    id: 62,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '配偶死亡精神影响程度',
    questionImg: null,
    type: 1,
    id: 63,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '配偶死亡影响持续时间',
    questionImg: null,
    type: 1,
    id: 64,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '离婚事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 65,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '离婚性质',
    questionImg: null,
    type: 1,
    id: 66,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '离婚精神影响程度',
    questionImg: null,
    type: 1,
    id: 67,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '离婚影响持续时间',
    questionImg: null,
    type: 1,
    id: 68,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '子女升学（就业）失败事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 69,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '子女升学（就业）失败性质',
    questionImg: null,
    type: 1,
    id: 70,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '子女升学（就业）失败精神影响程度',
    questionImg: null,
    type: 1,
    id: 71,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '子女升学（就业）失败影响持续时间',
    questionImg: null,
    type: 1,
    id: 72,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '子女管教困难事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 73,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '子女管教困难性质',
    questionImg: null,
    type: 1,
    id: 74,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '子女管教困难精神影响程度',
    questionImg: null,
    type: 1,
    id: 75,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '子女管教困难影响持续时间',
    questionImg: null,
    type: 1,
    id: 76,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES001',
        name: '未发生',
        id: 2,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1a',
      },
      {
        answerGroupCode: 'LES001',
        name: '\t1年内',
        id: 4,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3a',
      },
      {
        answerGroupCode: 'LES001',
        name: '1年前',
        id: 1,
        uuid: '8f0fce8e-7c86-4d3a-89d7-24d67cea7bb5',
      },
      {
        answerGroupCode: 'LES001',
        name: '长期性',
        id: 3,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2a',
      },
    ],
    answerGroupCode: 'LES001',
    name: '子女长期离家事件发生次数/时间',
    questionImg: null,
    type: 1,
    id: 77,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES002',
        name: '好事',
        id: 5,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f4a',
      },
      {
        answerGroupCode: 'LES002',
        name: '坏事',
        id: 6,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f5a',
      },
    ],
    answerGroupCode: 'LES002',
    name: '子女长期离家性质',
    questionImg: null,
    type: 1,
    id: 78,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES003',
        name: '无影响',
        id: 8,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f7a',
      },
      {
        answerGroupCode: 'LES003',
        name: '轻度',
        id: 10,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f9a',
      },
      {
        answerGroupCode: 'LES003',
        name: '中度',
        id: 7,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f6a',
      },
      {
        answerGroupCode: 'LES003',
        name: '重度',
        id: 9,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f8a',
      },
      {
        answerGroupCode: 'LES003',
        name: '极重',
        id: 11,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f0b',
      },
    ],
    answerGroupCode: 'LES003',
    name: '子女长期离家精神影响程度',
    questionImg: null,
    type: 1,
    id: 79,
  },
  {
    answer: [
      {
        answerGroupCode: 'LES004',
        name: '3个月内',
        id: 12,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f1b',
      },
      {
        answerGroupCode: 'LES004',
        name: '半年内',
        id: 15,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3c',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年内',
        id: 14,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f3b',
      },
      {
        answerGroupCode: 'LES004',
        name: '1年以上',
        id: 13,
        uuid: '0c19756e-6cdb-4209-b92a-9272444a3f2b',
      },
    ],
    answerGroupCode: 'LES004',
    name: '子女长期离家影响持续时间',
    questionImg: null,
    type: 1,
    id: 80,
  },
];

const tempSkipRule = '1-A-5|3-A-5|5-A-9';

enum QuestionType {
  Single = 1,
  Multiple = 2,
  Blank = 3,
}

const QuestionTypeTitle = {
  [QuestionType.Single]: '单选题',
  [QuestionType.Multiple]: '多选题',
  [QuestionType.Blank]: '填空题',
};

function EvaluationDetail() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answerMap, setAnswerMap] = useState<
    Record<number, number | number[] | string>
  >({});
  const barRef = useRef<HTMLDivElement>(null);

  const skipRule = useMemo(() => {
    const rawRules = tempSkipRule.split('|');
    if (!questions.length) return [];
    const finalRules = rawRules.map((raw) => {
      const RE = /(?<when>\d+)-(?<select>[A-Za-z])-(?<to>\d+)/;
      const { when, select, to } = RE.exec(raw)?.groups ?? {};
      console.log({ when, select, to });
      const selectIdx = select.toUpperCase().charCodeAt(0) - 65;
      console.log('cur question', questions[Number(when) - 1]);
      const rule = {
        whenIdx: Number(when) - 1, // 改成正常的 idx
        selectIdx, // A to 0
        select: questions[Number(when) - 1].answer[selectIdx]?.id,
        toIdx: Number(to) - 1,
      };
      return rule;
    });
    return finalRules;
  }, [tempSkipRule, questions]);

  const skipedQuestions = useMemo(() => {
    const finalQuestions = [];
    for (let idx = 0; idx < questions.length; idx++) {
      const question = questions[idx];
      finalQuestions.push(question);
      if (question.type === QuestionType.Single) {
        // 泽洋说只有单选题会skip，如果后边改了，泽洋来改
        if (answerMap[question.id] !== undefined) {
          // 如果这道题选了，才可能触发跳题逻辑
          const rule = skipRule?.find((rule) => rule.whenIdx === idx); // 泽洋说一道题只会配置一个skip rule
          if (rule && answerMap[question.id] === rule.select) {
            idx = rule.toIdx - 1;
          }
        }
      }
    }
    return finalQuestions;
  }, [questions, skipRule, answerMap]);

  console.log('skip questions', skipedQuestions);
  console.log('skip rule', skipRule);
  useEffect(() => {
    setQuestions(TEMP_QUESTIONS);
  }, []);

  const renderSingleSelect = (question: any) =>
    question?.answer?.map((answer: any) => (
      <div
        className={`question-item${
          answerMap[question?.id] === answer?.id ? ' checkedrow' : ''
        }`}
        key={answer?.id}
        onTouchEnd={() =>
          setAnswerMap((am) => ({ ...am, [question.id]: answer.id }))
        }
      >
        <input
          type="radio"
          className="option-input radio"
          onChange={() => void 0}
          checked={answerMap[question?.id] === answer?.id}
        />
        {answer?.name}
      </div>
    ));

  const renderMultiSelect = (question: any) =>
    question?.answer?.map((answer: any) => (
      <div
        className={`question-item${
          Array.isArray(answerMap[question?.id]) &&
          (answerMap[question?.id] as number[])?.includes(answer.id)
            ? ' checkedrow'
            : ''
        }`}
        key={answer?.id}
        onTouchEnd={() => {
          let selected: number[] = (answerMap[question.id] as number[]) ?? [];
          selected = selected.includes(answer.id)
            ? selected.filter((i) => i !== answer.id)
            : [...selected, answer.id];
          setAnswerMap((am) => ({ ...am, [question.id]: selected }));
        }}
      >
        <input
          type="checkbox"
          className={'option-input checkbox'}
          onChange={() => void 0}
          checked={
            Array.isArray(answerMap[question?.id]) &&
            (answerMap[question?.id] as number[])?.includes(answer.id)
          }
        />
        {answer?.name}
      </div>
    ));

  return (
    <IonPage>
      <div className="progress-bar" ref={barRef}></div>
      <div
        className="detail"
        id="question-con"
        onScroll={(e) => {
          const progress =
            (e.target as any).scrollTop /
            ((e.target as any).scrollHeight - window.innerHeight);
          const vh = Math.round(progress * 100);
          barRef.current && (barRef.current.style.height = `${vh}vh`);
          console.log(progress);
        }}
      >
        {skipedQuestions.map((question, idx) => (
          <div
            className="detail-card-container"
            key={question.id}
            id={`question-${idx}`}
          >
            <div className="detail-card">
              <div className="question-type">
                {QuestionTypeTitle[question.type as QuestionType]}
              </div>
              <div className="detail-title">{question.name}</div>
              {question.type === QuestionType.Single &&
                renderSingleSelect(question)}
              {question.type === QuestionType.Multiple &&
                renderMultiSelect(question)}
              <div className="question-spacer"></div>
              <div
                className="next-question"
                onClick={() => {
                  const nextId = `#question-${idx + 1}`;
                  const nextBox = document
                    ?.querySelector(nextId)
                    ?.getBoundingClientRect();
                  const con = document.querySelector('#question-con');
                  console.log('con con', con, con?.scrollTop, nextBox);
                  if (!con) return;
                  con?.scrollTo({
                    top: (con?.scrollTop ?? 0) + (nextBox?.top ?? 0) - 20,
                    behavior: 'smooth',
                  });
                }}
              >
                下一题
              </div>
            </div>
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default EvaluationDetail;

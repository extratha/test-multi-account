import { ExampleDataResult, InterpretResult } from "@/types/aiInterpret";

export const mockLoginResponse = {
  accessToken: "mockAccessToken",
  refreshToken: "mockRefreshToken",
  user: {
    id: "mockUserId",
    email: "test@example.com",
    passwordChanged: true,
  },
  userProfile: {
    ID: "mockUserProfileId",
    userID: "mockUserId",
    email: "test@example.com",
    prefix: "Mr.",
    firstName: "John",
    lastName: "Doe",
    corporate: "Example Corp",
    isActive: true,
  },
};

export const MOCK_ACCESS_TOKEN = "TOKENTOKENTOKEN";

export const mockExampleDataList: ExampleDataResult[] = [
  {
    id: "1",
    caseName: "Example Case 1",
    gender: "male",
    age: "30",
    aiModelVersion: "1.0.0",
  },
  {
    id: "2",
    caseName: "Example Case 2",
    gender: "female",
    age: "25",
    aiModelVersion: "1.0.1",
  },
];

export const mockAiInterpretResult: InterpretResult = {
  id: "mock_id",
  caseName: "case name",
  inputData: [
    {
      groupName: "generalCheckUp",
      data: [
        {
          key: "age",
          value: "40",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "gender",
          value: "Male",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "temperature",
          value: "38.00",
          unit: "°C",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
      ],
    },
    {
      groupName: "hematologyCBC",
      data: [
        {
          key: "hb_value",
          value: "13.80",
          unit: "g/dL",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "hct_value",
          value: "40.60",
          unit: "%",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "mcv_value",
          value: "82.70",
          unit: "fl",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "mch_value",
          value: "28.10",
          unit: "pg",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "mchc_value",
          value: "34.00",
          unit: "g/dL",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "wbc_value",
          value: "5.08",
          unit: "*10^3/mm^3",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "neutrophil_value",
          value: "58.30",
          unit: "%",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "lymphocyte_value",
          value: "28.50",
          unit: "%",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "monocyte_value",
          value: "5.90",
          unit: "%",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "eosinophil_value",
          value: "6.30",
          unit: "%",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "basophil_value",
          value: "1.00",
          unit: "%",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "platelet_count_value",
          value: "243",
          unit: "*10^3/mm^3",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
      ],
    },
    {
      groupName: "lipidProfile",
      data: [
        {
          key: "cholesterol_value",
          value: "208",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "triglyceride_value",
          value: "72",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "hdl_value",
          value: "45.00",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "ldl_value",
          value: "155",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
      ],
    },
    {
      groupName: "bloodChemistry",
      data: [
        {
          key: "uric_acid_value",
          value: "6.80",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "fbs_value",
          value: "93",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
      ],
    },
    {
      groupName: "renalFunctionTest",
      data: [
        {
          key: "creatinine_value",
          value: "0.89",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "bun_value",
          value: "10.70",
          unit: "mg/dL",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
      ],
    },
    {
      groupName: "liverFunctionTest",
      data: [
        {
          key: "sgot_value",
          value: "18",
          unit: "U/L",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "sgpt_value",
          value: "17",
          unit: "U/L",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "alp_value",
          value: "71",
          unit: "U/L",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
      ],
    },
    {
      groupName: "urineAnalysis",
      data: [
        {
          key: "urine_color_value",
          value: "Yellow",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_sp_gr_value",
          value: "1.006",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_ph_value",
          value: "6.50",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_wbc_value",
          value: "0-1 Cells/HPF",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_protein_value",
          value: "Negative",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_glucose_value",
          value: "0-1 Cells/HPF",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
        {
          key: "urine_erythrocyte_value",
          value: "Negative",
          unit: "",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
        {
          key: "urine_rbc_value",
          value: "0-1 Cells/HPF",
          unit: "",
          range: [
            {
              value: "-",
              description: "normal",
            },
          ],
        },
      ],
    },
    {
      groupName: "papSmear",
      data: [
        {
          key: "papsmear_finding",
          value: "-1",
          unit: "",
          range: [
            {
              value: "-",
              description: "abnormal",
            },
          ],
        },
      ],
    },
  ],
  aiResult: {
    transactionID: "mock tid",
    version: "1.0.0",
    timeStamp: "",
    data: [
      {
        title: "title-ai-result",
        description: "description-ai-result",
      },
    ],
  },
  gender: "Male",
  age: "29",
  ranking: 1,
  aiModelVersion: "1.0.0",
  createdAt: "",
  updatedAt: "",
};

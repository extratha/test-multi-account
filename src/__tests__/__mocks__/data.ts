import { ConsentResult, ExampleDataResult, InterpretResult, SubmitLabInterpretsRequest } from "@/types/model.api";

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
          key: "body_weight",
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
          key: "body_height",
          value: "150",
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
          value: "0-5",
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
          value: "0-5",
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
          value: "Normal",
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

export const mockInputFieldConfig = JSON.stringify([
  {
    groupName: "generalCheckUp",
    data: [
      {
        key: "age",
        value: "",
        unit: "Year",
        required: true,
        fieldType: "Number",
        minValue: "15",
        maxValue: "150",
      },
      {
        key: "gender",
        value: "",
        unit: "",
        required: true,
        fieldType: "Dropdown",
        dropdownValue: ["Male", "Female"],
      },
      {
        key: "body_weight",
        value: "",
        unit: "Kg",
        required: true,
        fieldType: "Number",
        minValue: "20",
        maxValue: "650",
      },
      {
        key: "body_height",
        value: "",
        unit: "Cm",
        required: true,
        fieldType: "Number",
        minValue: "100",
        maxValue: "250",
      },
      {
        key: "waist_line",
        value: "",
        unit: "Cm",
        required: false,
        fieldType: "Number",
        minValue: "50",
        maxValue: "250",
        range: [
          { value: "<90", description: "normal", type: "male" },
          { value: "<80", description: "normal", type: "female" },
        ],
      },
      {
        key: "blood_pressure_systolic",
        value: "",
        unit: "mmhg",
        required: false,
        fieldType: "Number",
        minValue: "70",
        maxValue: "250",
        range: [
          { value: "<135", description: "normal", type: "male" },
          { value: "<120", description: "normal", type: "female" },
        ],
      },
      {
        key: "blood_pressure_diastolic",
        value: "",
        unit: "mmhg",
        required: false,
        fieldType: "Number",
        minValue: "50",
        maxValue: "130",
        range: [
          { value: "60-90", description: "normal", type: "male" },
          { value: "60-90", description: "normal", type: "female" },
        ],
      },
      {
        key: "pulse",
        value: "",
        unit: "Bpm",
        required: false,
        fieldType: "Number",
        minValue: "40",
        maxValue: "220",
        range: [
          { value: "60-100", description: "normal", type: "male" },
          { value: "60-100", description: "normal", type: "female" },
        ],
      },
      {
        key: "respiratory_rate",
        value: "",
        unit: "Bpm",
        required: false,
        fieldType: "Number",
        minValue: "10",
        maxValue: "30",
        range: [
          { value: "16-18", description: "normal", type: "male" },
          { value: "16-18", description: "normal", type: "female" },
        ],
      },
      {
        key: "temperature",
        value: "",
        unit: "°C",
        required: false,
        fieldType: "Number",
        minValue: "33",
        maxValue: "42",
        range: [
          { value: "36.5-37.5", description: "normal", type: "male" },
          { value: "36.5-37.5", description: "normal", type: "female" },
        ],
      },
    ],
  },
]);

export const mockSubmitHealthDataBody: SubmitLabInterpretsRequest = {
  labInfo: [
    {
      groupName: "generalCheckUp",
      data: [
        {
          key: "age",
          unit: "Year",
          value: "20",
          range: [
            {
              value: "",
              description: "",
            },
          ],
        },
        {
          key: "gender",
          unit: "",
          value: "Male",
          range: [
            {
              value: "",
              description: "",
            },
          ],
        },
        {
          key: "body_weight",
          unit: "Kg",
          value: "40",
          range: [
            {
              value: "",
              description: "",
            },
          ],
        },
        {
          key: "body_height",
          unit: "Cm",
          value: "150",
          range: [
            {
              value: "",
              description: "",
            },
          ],
        },
        {
          key: "waist_line",
          unit: "Cm",
          value: undefined,
          range: [
            {
              description: "normal",
              value: "<90",
            },
            {
              description: "normal",
              value: "<80",
            },
          ],
        },
        {
          key: "blood_pressure_systolic",
          unit: "mmhg",
          value: undefined,
          range: [
            {
              description: "normal",
              value: "<135",
            },
            {
              description: "normal",
              value: "<120",
            },
          ],
        },
        {
          key: "blood_pressure_diastolic",
          unit: "mmhg",
          value: undefined,
          range: [
            {
              description: "normal",
              value: "60-90",
            },
            {
              description: "normal",
              value: "60-90",
            },
          ],
        },
        {
          key: "pulse",
          unit: "Bpm",
          value: undefined,
          range: [
            {
              description: "normal",
              value: "60-100",
            },
            {
              description: "normal",
              value: "60-100",
            },
          ],
        },
        {
          key: "respiratory_rate",
          unit: "Bpm",
          value: undefined,
          range: [
            {
              description: "normal",
              value: "16-18",
            },
            {
              description: "normal",
              value: "16-18",
            },
          ],
        },
        {
          key: "temperature",
          unit: "°C",
          value: "38",
          range: [
            {
              description: "normal",
              value: "36.5-37.5",
            },
            {
              description: "normal",
              value: "36.5-37.5",
            },
          ],
        },
      ],
    },
  ],
};

export const mockTermsAndConsData: ConsentResult = {
  consent: {
    content:
      "**Terms of Service**\n\nWelcome to our service. By using our service, you agree to the following terms...\n\n**Privacy Policy**\n\nWe value your privacy. This policy explains how we collect and use your information...",
    services: [
      {
        content:
          "**Service Overview**\n\nAI Interpret provides advanced language translation capabilities...\n\n**Features**\n\n- Real-time translation\n- Multi-language support\n- High accuracy rates\n\n**Usage Instructions**\n\n1. Select your input and output languages.\n2. Speak or type your text.\n3. Receive the translated output.",
        logo: "https://cdn-dev-playground.cariva.co.th/terms/images/logo.png",
        title: "mock-test-title",
      },
      {
        content:
          "**Service Overview**\n\nHealth Visualization helps you understand your health data through visual representations...\n\n**Features**\n\n- Detailed health metrics\n- Trend analysis\n- Personalized insights\n\n**Usage Instructions**\n\n1. Upload your health data.\n2. Choose the metrics you want to visualize.\n3. View the visualized data and insights.",
        logo: "https://cdn-dev-playground.cariva.co.th/terms/images/logo.png",
        title: "Health Visualization",
      },
      {
        content:
          "**Service Overview**\n\nASR (Automatic Speech Recognition) converts spoken language into text...\n\n**Features**\n\n- High accuracy speech-to-text\n- Supports multiple languages\n- Real-time processing\n\n**Usage Instructions**\n\n1. Select your language.\n2. Speak into the microphone.\n3. View the transcribed text.",
        logo: "https://cdn-dev-playground.cariva.co.th/terms/images/logo.png",
        title: "ASR",
      },
      {
        content:
          "**Service Overview**\n\nSymptom Checker helps you understand potential causes for your symptoms...\n\n**Features**\n\n- Symptom input\n- Potential diagnoses\n- Suggested next steps\n\n**Usage Instructions**\n\n1. Enter your symptoms.\n2. View the potential diagnoses.\n3. Follow the suggested next steps for further action.",
        logo: "https://cdn-dev-playground.cariva.co.th/terms/images/logo.png",
        title: "Symptom Checker",
      },
    ],
  },
  isConsent: false,
  version: "01-01-2024",
};

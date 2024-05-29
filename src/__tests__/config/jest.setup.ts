import '@testing-library/jest-dom';

import mockRouter from "next-router-mock";
import { server } from '../__mocks__/server';
import "jest-canvas-mock";


jest.mock("next/navigation", () => require("next-router-mock"));

jest.mock("next/config", () => () => ({
    setConfig: jest.fn(),
    publicRuntimeConfig: {
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY2NzUzNDQsImlhdCI6MTcwNjU4ODk0NCwicHJvZmlsZUlkIjoiZDU1YWY3NDUtOTYyZS00MTk2LTkyOTEtZDg2YTliYWNiZWY2In0.sNgwYjIGLYEVAptqILGgRVGXwt9FCPKHRubEZyaodhg",
        mockBaseApiUrl: "https://www.mock-playground-dashboard.co.th",
        baseApiUrl: "https://www.mock-playground-dashboard.co.th",
        globalEndpoint: "playground-dashboard",
        publicApiHost: "http://localhost:3000/",
    },
}));

jest.setTimeout(100000);

let routerPushSpy: jest.Spied<typeof mockRouter.push>;

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
    const origPush = mockRouter.push.bind({});
    routerPushSpy = jest.spyOn(mockRouter, 'push').mockImplementation(async (...params) => {
        try {
            return await origPush(...params);
        } catch (error) {
            console.log(error)
        }
        return Promise.resolve(true);
    });
});


const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[1].includes('fetchPriority')) {
    return;
  }

  originalConsoleError(...args);
};

afterEach(() => {
    server.resetHandlers();
    routerPushSpy.mockRestore();
});
// Clean up after the tests are finished.
afterAll(() => server.close());

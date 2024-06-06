import { HttpStatusCode } from 'axios';
import { ExampleData } from '../aiInterpret';
export type ExampleDataResponse = {
  meta: {
    code: HttpStatusCode;
    message: string;
  };
  data: ExampleData[];
};

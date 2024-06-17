import { HttpStatusCode } from "axios";
import { ExampleDataResult } from "../aiInterpret";

export interface ExampleDataResponse {
  meta: {
    code: HttpStatusCode;
    message: string;
  };
  data: ExampleDataResult[];
}

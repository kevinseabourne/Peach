import axios from "axios";
import { interceptor } from "../services/httpService";

// jest.mock("axios", () => {
//   return {
//     interceptors: {
//       request: {
//         use: jest.fn(),
//         reject: jest.fn()
//       },
//       response: {
//         use: jest.fn(),
//         reject: jest.fn()
//       }
//     }
//   };
// });

// describe("Interceptor", () => {
//   it("should mock axios interceptor", async () => {});
//   interceptor();
//   it("should return error", () => {
//     const responseObj = {
//       response: {
//         statusText: "rejected",
//         status: 403,
//         data: { message: "rejected" }
//       }
//     };
//     expect(axios.interceptors.response.use).toHaveBeenCalled();
//     // const rejectedResponse = axios.interceptors.response.handlers[0].rejected(
//     //   responseObj
//     // );
//     console.log(axios.interceptors.response);
//     // expect(rejectedResponse).rejects.toMatchObject(responseObj);
//   });
// });

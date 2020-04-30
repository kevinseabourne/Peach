// export default {
//   post: jest.fn(emailData => Promise.resolve({ data: {}, status: 200 }))
// };

export const sendEmail = jest.fn(emailData =>
  Promise.resolve({ data: {}, status: 200 })
);

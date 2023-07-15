import ky from 'ky';

const createApiClient = (baseUrl: string) => {
  return ky.create({
    prefixUrl: baseUrl,
    retry: {
      limit: 2,
      statusCodes: [401, 403, 500, 504],
    },
    hooks: {
      afterResponse: [
        async (_, options, response) => {
          if (!response.ok || !options.validationSchema) {
            return response;
          }

          const data = await response.json();

          const validatedData = options.validationSchema.safeParse(data);

          if (!validatedData.success) {
            console.log('API Validation Error', validatedData.error);
          }

          return response;
        },
      ],
      beforeError: [
        async error => {
          try {
            const response = await error.response.json();
            error.responseData = response;
            return error;
          } catch (e) {
            return error;
          }
        },
      ],
    },
  });
};

export default createApiClient;

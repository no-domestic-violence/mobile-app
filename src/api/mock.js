//here is everything for the fake api call
const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (email, password, shouldSucceed = true) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({error: 500, message: 'Something went wrong!'});
  }

  return mockSuccess({auth_token: 'successful_fake_token'});
};

export const signup = (email, password, shouldSucceed = false) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({error: 500, message: 'Something went wrong!'});
  }

  return mockSuccess({auth_token: 'successful_fake_token'});
};

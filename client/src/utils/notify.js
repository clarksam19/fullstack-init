const notify = (name) => {
  return {
    reset: {
      type: "",
      message: "",
    },
    success: {
      add: {
        type: "success",
        message: "content successfully added!",
      },
      update: {
        type: "success",
        message: "content successfully updated!",
      },
      remove: {
        type: "success",
        message: "content successfully removed!",
      },
      signup: {
        type: "success",
        message: "signup successfull! you may now login",
      },
      login: {
        type: "success",
        message: `hello ${name}!`,
      },
      logout: {
        type: "success",
        message: "logout successfull!",
      },
    },
    error: {
      add: {
        type: "error",
        message: "sorry, we were unable to add the content",
      },
      update: {
        type: "error",
        message: "sorry, we were unable to update the content",
      },
      remove: {
        type: "error",
        message: "sorry, we were unable to update the content",
      },
      signup: {
        type: "error",
        message:
          "sorry, we were unable to create your account. you either left a field blank or the username you provided already exists",
      },
      login: {
        type: "error",
        message: "invalid username and/or password",
      },
    },
  };
};

export default notify;

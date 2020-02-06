const SignUpForm = () => {
  //... other stuffs

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };
  return (
    <FormGroup>
      <Label for="username">Username</Label>
      <Input
        type="text"
        value={username}
        onChange={handleUsernameInput}
        {...getInputProp()}
      />
      {getFormFeedback()}
      <FormText>Enter a username between 6 and 20 characters</FormText>
    </FormGroup>
  );
};

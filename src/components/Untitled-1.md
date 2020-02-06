## Form Validations the `React` way

Up until now, you haven't really explored into what makes React so great. The reason people choose React is for creating beautiful and complex UI's. We are now going to implement some React-ive features so we can truly understand the wonders of what React can do.

## Building Form Validations

We sometimes take for granted the features that modern day websites have, expecially for non-coders, they don't truly understand the amount of work that is required to build something as simple as a form validation.

Thankfully since the introduction of React and by tapping in to third-party libraries, we can implement these kind of features quickly and easily.

In the previous lesson, you should have built your user sign up form that will take in the username, email and password to create a new account.

We implemented some very basic validation that would prevent us from clicking in the sign up button until all the fields were filled out. We will now take that a step further by integrating with our back-end through an API call as well as making use of the form validation features built in to `Reactstrap`.

### Checking for available usernames

The endpoint you will be working with has already been created for you:

```
GET https://insta.nextacademy.com/api/v1/users/check_name
```

We will be using query parameters with a `GET` request to check the validity of the username, but before we get into that there are a couple of things to consider when you are building the username validation:

- Is it necessary to check the validity of the username when it is less than 6 characters long?
- Should I prevent from being able to submit the form if the username is already taken?

The first point is easier to implement while the latter may take a bit more logic to perform correctly.

Let's get started at implementing the username check.

#### Building the Function

First thing you are going to need is a function that will handle the checking of the username, you can use the example below for reference but try to build your own to get a better understanding of how to make this logic work.

```JSX

  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(false);
  const [username, setUsername] = useState("");

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

```

There is a lot going on in the code above, some of it is straight forward and some may be quite confusing. We need to set a delay on making the request to the server until we have stopped typing otherwise the consequence is making multiple requests each time we press a key, the result of this is that you may have a delay on some requests coming back and this causes spotty results that sometimes may display correctly and sometimes not. We really don't want this behaviour as it is bad for the user experience.

### Building the form input

Now we have a function that we can work with, we will go ahead and build the form input to handle all of this logic and display the correct results. By the end you should have something that looks like this.

![form-validation.gif](http://cortal-prod.s3.amazonaws.com/form-validation.gif)

Cool, right? I hope it is ;)

Now, let's take a look at building the form input. Try to break it down and understand it bit by bit as it might be quite an eyeful at first glance.

```JS
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

```

In _Reactstrap_, we put `valid` or `invalid` props into `<Input>` and `<FormFeedback>` components to get the nice green/red borders with feedback messages.

(Refer to [Form Validation Section](https://reactstrap.github.io/components/form/#Form-Validation))

## Challenge:

Now go off and use what you have just learnt to build some additional validations yourself.

1. Implement password validation, if the password does not meet the minimum requirements of being at least 6 characters long, display to the user that the password is too short.

2. Implement email validation, you can find plenty of examples of email Regex online, you can use this to check and set your state.

3. Implement confirm password validation, if the password does not match the original password, display this to the user too.

Think about this, these are all things you are going to have to consider when organising your code:

- What states are you going to need?
- Should you seperate things into different components?
- Who should hold the state, the form or the parent? Should the form be a dumb or smart component?

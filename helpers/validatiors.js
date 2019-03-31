
export function validate(subject) {

  const requiredRule = value => !!(value || '').toString().trim();
  const minLength = minSize => value => (value || '').toString().trim().length >= (minSize || 0);
  const maxLength = maxLength => value => (value || '').toString().trim().length <= (maxLength || Number.MAX_SAFE_INTEGER);
  const passwordsMatch = (password, confirmPassword) => password === confirmPassword;
  const email = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((email || '').toString().toLowerCase());

  const REQUIRED_ERR = subject => `${subject} is required`;
  const SHORT_ERR = (subject, minSize) => `${subject} must contain atleast ${minSize} characters`;
  const LONG_ERR = subject => `${subject} is too long`;
  const EMAIL_ERR = 'Email must have valid pattern';
  const PASS_MISMATCH_ERR = 'Passwords mismatched';

  return value => {
    switch (subject) {
      case 'fullName': {

        if (!requiredRule(value)) {
          this.setState(({ fullName }) => {
            fullName.error = REQUIRED_ERR('Full name');
            return { fullName, hasError: true };
          });
          return true;
        }

        const min = this.state[subject].minLength;
        if (!minLength(min)(value)) {
          this.setState(({ fullName }) => {
            fullName.error = SHORT_ERR('Full name', min);
            return { fullName, hasError: true };
          });
          return true;
        }

        if (!maxLength(this.state[subject].maxLength)(value)) {
          this.setState(({ fullName }) => {
            fullName.error = LONG_ERR('Full name');
            return { fullName, hasError: true };
          });
          return true;
        }
        break;
      }

      case 'email': {

        if (!requiredRule(value)) {
          this.setState(({ email }) => {
            email.error = REQUIRED_ERR('Email');
            return { email, hasError: true };
          });
          return true;
        }

        if (!email(value)) {
          this.setState(({ email }) => {
            email.error = EMAIL_ERR;
            return { email, hasError: true };
          });
          return true;
        }

        if (!maxLength(this.state[subject].maxLength)(value)) {
          this.setState(({ email }) => {
            email.error = LONG_ERR('Email');
            return { email, hasError: true };
          });
          return true;
        }

        break;
      }

      case 'password': {

        if (!requiredRule(value)) {
          this.setState(({ password }) => {
            password.error = REQUIRED_ERR('Password');
            return { password, hasError: true };
          });
          return true;
        }

        const min = this.state[subject].minLength;
        if (!minLength(min)(value)) {
          this.setState(({ password }) => {
            password.error = SHORT_ERR('Password', min);
            return { password, hasError: true };
          });
          return true;
        }

        if (!maxLength(this.state[subject].maxLength)(value)) {
          this.setState(({ password }) => {
            password.error = LONG_ERR('Password');
            return { password, hasError: true };
          });
          return true;
        }
        break;
      }

      case 'confirmPassword': {

        if (!requiredRule(value)) {
          this.setState(({ confirmPassword }) => {
            confirmPassword.error = REQUIRED_ERR('Confirm password');
            return { confirmPassword, hasError: true };
          });
          return true;
        }

        if (!passwordsMatch(this.state.password.value, this.state.confirmPassword.value)) {
          this.setState(({ confirmPassword }) => {
            confirmPassword.error = PASS_MISMATCH_ERR;
            return { confirmPassword, hasError: true };
          });
          return true;
        }

        break;
      }
    }

    this.setState(state => {
      state[subject].error = '';
      return { [subject]: state[subject], hasError: false };
    });

  };
};

export function onChange(fieldName) {
  return value => this.setState(state => {
    const stateField = state[fieldName];
    stateField.value = value.length > (stateField.maxLength || Number.MAX_SAFE_INTEGER)
      ? value.slice(0, stateField.maxLength)
      : value;

    return { [fieldName]: stateField };
  });
}

export function onBlur(fieldName) {
  return () => {
    validate.bind(this)(fieldName)(this.state[fieldName].value);
  };
}

export const defaultState = () => ({
  fullName: {
    value: '',
    minLength: 4,
    maxLength: 50,
    error: ''
  },
  email: {
    value: '',
    maxLength: 50,
    error: ''
  },
  password: {
    value: '',
    minLength: 6,
    maxLength: 50,
    error: ''
  },
  confirmPassword: {
    value: '',
    error: ''
  },
  
  agree: false,
  hasError: false,
  avatarImage: {
    width: 'auto',
    height: 'auto',
    uri: null,
    path: null
  },
  requestSent: false
});
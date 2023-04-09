import { useDispatch } from 'react-redux';
import * as authOperation from '../../redux/auth/authOperation';
import sprite from '../../images/sprite.svg';
import iconPass from '../../images/Icon-pass.svg';

import { NavLink } from 'react-router-dom';
import {
  AuthBg,
  Button,
  Box,
  Input,
  BoxWraper,
  Image,
  Container,
  InputWraper,
} from './Register.styled';
import { getColor } from 'utils/formikColors';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const Register = () => {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Zа-яА-ЯА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]+$/, {
        message: 'Special symbols are not allowed',
        excludeEmptyString: true,
      })
      .min(1, 'Your name must be 1 character at least')
      .max(16, '16 characters max')
      .required('Type your name please'),
    email: Yup.string()
      .matches(emailRegexp, {
        message: 'Your email must be valid',
        name: 'email',
        excludeEmptyString: true,
      })
      .min(5, 'Your email is too short')
      .max(254, 'Your email is too long')
      .lowercase()
      .required('Type your email please'),
    password: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Zа-яА-ЯА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/,
        'Special symbols are not allowed'
      )
      .min(6, 'Your password is too short')
      .max(16, 'Your password must be 16 characters max')
      .required('Type your password please'),
  });

  return (
    <>
      <Container>
        <Image />
        <BoxWraper>
          <Box>
            <h1>Registration</h1>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              isSubmitting={false}
              isInitialValid={false}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                const { name, email, password } = values;
                console.log(name, email, password);
                await dispatch(
                  authOperation.register({ name, email, password })
                );
              }}
            >
              {props => (
                <Form>
                  <InputWraper>
                    <Input
                      autoComplete="off"
                      type="text"
                      name="name"
                      required
                      onChange={props.handleChange}
                      placeholder="Name"
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      color={getColor(
                        props.errors.name,
                        props.values.name,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                      borderColor={getColor(
                        props.errors.name,
                        props.values.name,
                        'rgba(255, 255, 255, 0.3)'
                      )}
                    />
                    <svg
                      className="icon"
                      fill={getColor(
                        props.errors.name,
                        props.values.name,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                    >
                      <use href={sprite + '#icon-user'}></use>
                    </svg>
                  </InputWraper>
                  <InputWraper>
                    <Input
                      autoComplete="off"
                      type="email"
                      name="email"
                      required
                      onChange={props.handleChange}
                      placeholder="Email"
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      color={getColor(
                        props.errors.email,
                        props.values.email,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                      borderColor={getColor(
                        props.errors.email,
                        props.values.email,
                        'rgba(255, 255, 255, 0.3)'
                      )}
                    />
                    <svg
                      className="icon"
                      fill={getColor(
                        props.errors.email,
                        props.values.email,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                    >
                      <use href={sprite + '#email'}></use>
                    </svg>
                  </InputWraper>
                  <InputWraper>
                    <Input
                      autoComplete="off"
                      type="password"
                      name="password"
                      required
                      onChange={props.handleChange}
                      placeholder="password"
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      color={getColor(
                        props.errors.password,
                        props.values.password,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                      borderColor={getColor(
                        props.errors.password,
                        props.values.password,
                        'rgba(255, 255, 255, 0.3)'
                      )}
                    />
                    <svg
                      className="icon"
                      fill={getColor(
                        props.errors.password,
                        props.values.password,
                        'rgba(255, 255, 255, 0.8)'
                      )}
                    >
                      <use href={iconPass}></use>
                    </svg>
                  </InputWraper>
                  <Button type="submit">Sign up</Button>
                </Form>
              )}
            </Formik>
          </Box>
          <NavLink to={'/signin'}>Sign in</NavLink>
        </BoxWraper>
      </Container>
      <AuthBg></AuthBg>
    </>
  );
};
export default Register;

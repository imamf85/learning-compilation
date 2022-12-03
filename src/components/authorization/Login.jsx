import { useRef, useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import login from "../../assets/img_login.svg";
import axios from "axios";
import "./authorization.css";

/*this PASSWORD_REGEX contains :
1. 6 to 24 characters.
2. Must include uppercase and lowercase letters, a number and special character.
3. Must include one special characters = !, @, #, $, % */

// use this code if the password using Lower Case, Upper Case, Symbol & Number
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,12}$/;

// use this code for fulfill the existing email & pass from Swagger
const PASSWORD_REGEX = /^(?=.*[0-9]).{6,12}$/;

/*this EMAIL_REGEX contains :
1. Uppercase (A-Z) and lowercase (a-z). 
2. Allowed special characters before @: "+ _ . -"
3. Allowed special characters after @: ". -"  */
const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

const Login = () => {
  const errRef = useRef();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setIsEmailValid(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [password, email]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
      role: "Customer",
    };

    try {
      const response = await axios.post("https://bootcamp-rent-cars.herokuapp.com/customer/auth/login", payload);
      navigate("/dashboard");
      localStorage.setItem("Token", response.data.access_token);

      setSuccess(true);
      setPassword("");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg(`This email: ${email} does not exist`);
      } else if (err.response?.status === 503) {
        setErrMsg(`
        Error: Service Unavailable`);
      }
      errRef.current.focus();
    }
  };

  return (
    <Col className="auth">
      <Col className="auth-article">
        <img src={login} alt="landing-page" />
      </Col>
      <Col className="auth-form" style={{ padding: "160px 70px 150px" }}>
        <Col></Col>
        <Col style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Welcome Back!</Col>
        {success ? (
          <Col className="successmsg">Awesome, login successful!</Col>
        ) : (
          <Col ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" style={{ marginBottom: 16 }}>
            {errMsg}
          </Col>
        )}

        <Form style={{ marginBottom: 32 }} onSubmit={loginSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>
              Email*
              <FontAwesomeIcon icon={faCheck} className={isEmailValid ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isEmailValid || !email ? "hide" : "invalid"} />
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Contoh: johndee@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={isEmailValid ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <Col id="emailnote" className={emailFocus && !isEmailValid ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Uppercase (A-Z) and lowercase (a-z).
              <br />
              Allowed special characters before @: <span aria-label="exclamation mark">+</span> <span aria-label="at symbol">_</span> <span aria-label="hashtag">.</span> <span aria-label="dollar sign">-</span>
              <br />
              Allowed special characters after @: <span aria-label="exclamation mark">.</span> <span aria-label="at symbol">-</span>
            </Col>
          </Form.Group>
          <Form.Group controlId="formGroupPassword" style={{ marginBottom: 32 }}>
            <Form.Label>
              Password*
              <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            </Form.Label>
            <Form.Control
              aria-describedby="passwordnote"
              aria-invalid={validPassword ? "false" : "true"}
              onBlur={() => setPasswordFocus(false)}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
            <Col id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              6 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Must include one special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </Col>
          </Form.Group>
          <Button
            style={{
              background: "#0D28A6",
              borderRadius: 2,
              width: "100%",
            }}
            type="submit"
          >
            Sign In
          </Button>
        </Form>
      </Col>
    </Col>
  );
};

export default Login;

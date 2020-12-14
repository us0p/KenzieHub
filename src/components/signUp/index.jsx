import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import axios from "axios"

import logo from "./page.svg"
import { TextField, Button } from "@material-ui/core"

import { Container } from "./style"
const SingUp = () => {
  const [error, setError] = useState(false)
  const [registerSuccessfully, setRegisterSuccessfully] = useState(false)
  const history = useHistory()

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Required field")
      .min(6)
      .matches(
        /^(.[a-zÀ-ÿ]).+$/i,
        "name must be without number or special character"
      ),

    password: yup.string().min(6).required("Required field"),

    email: yup.string().email("Invalid email").required("Required field"),

    confirmPassword: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("password")], "Different Passwords"),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const registerUserRequest = async (body) => {
    // faz o POST na API dos dados do usuário
    body = {
      email: body.email,
      password: body.password,
      name: body.name,
      bio: "Type your Bio here.",
      contact: "Type your Bio here.",
      course_module: "Type your Bio here.",
    }
    try {
      const response = await axios.post("https://kenziehub.me/users", body)
      setRegisterSuccessfully(true) // mostrar mensagem de registrado com sucesso
      setTimeout(() => {
        // redirecionar para a página de Login
        history.push("/signIn")
      }, 3000)
      console.log(response)
    } catch (erro) {
      setError(true) // mostrar mensagem de erro
      console.log(erro)
    }
  }

  const handleForm = (value) => {
    // onClick do formulário
    registerUserRequest(value)
  }

  const divMessageSuccess = (
    <div>
      <h3>You Have Been Registered Successfully</h3>
    </div>
  )
  const divSingUpForm = (
    <Container>
      <div className="ContainerInputs">
        <div>Hey! Welcome</div>
        <form onSubmit={handleSubmit(handleForm)} className="Form">
          {error && <div>Invalid Registration Information</div>}
          <div
            style={{
              marginLeft: "-220px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></div>
          <TextField
            variant="outlined"
            color="primary"
            name="name"
            type="text"
            label="UserName"
            inputRef={register}
            style={{
              width: "300px",
              borderRadius: "5px",
              border: "0",
              backgroundColor: "white",
            }}
            helperText={errors.name?.message}
            error={!!errors.name}
          />
          <div
            style={{
              marginLeft: "-245px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></div>
          <TextField
            variant="outlined"
            color="primary"
            type="text"
            name="email"
            label="E-mail"
            inputRef={register}
            style={{
              width: "300px",
              borderRadius: "5px",
              border: "0",
              backgroundColor: "white",
            }}
            helperText={errors.email?.message}
            error={!!errors.email}
          />
          <div
            style={{
              marginLeft: "-225px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></div>
          <TextField
            variant="outlined"
            color="primary"
            type="password"
            name="password"
            label="Password"
            inputRef={register}
            style={{
              width: "300px",
              borderRadius: "5px",
              border: "0",
              backgroundColor: "white",
            }}
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <div
            style={{
              marginLeft: "-150px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></div>
          <TextField
            variant="outlined"
            color="primary"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            inputRef={register}
            style={{
              width: "300px",
              borderRadius: "5px",
              border: "0",
              backgroundColor: "white",
            }}
            helperText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
          />
          <Button
            type="submit"
            style={{
              marginTop: "10px",
              background: "#48A3DA",
              border: "0",
              boxSizing: "border-box",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
              width: "150px",
              height: "50px",
              color: "white",
              fontSize: "20px",
            }}
          >
            Register
          </Button>
        </form>
      </div>
      <img src={logo} alt="SigUp" style={{ marginLeft: "110px" }}></img>
    </Container>
  )

  return <div>{registerSuccessfully ? divMessageSuccess : divSingUpForm}</div>
}

export default SingUp

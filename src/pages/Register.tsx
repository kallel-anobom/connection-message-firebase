import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInputText from "../components/Forms/FormInputText";
import { register } from "../services/authService";
import useAlert from "../components/Alert/AlertHandle";

const schema = yup
  .object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .matches(/[a-zA-Z]/, "A senha deve conter letras"),
  })
  .required();

const defaultValues = {
  email: "",
  password: "",
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = useAlert();
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email já cadastrado";
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/weak-password":
        return "Senha fraca (mínimo de 6 caracteres)";
      default:
        return "Erro ao realizar registro";
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const registerCredential = await register(data.email, data.password);
      console.log("Registro bem-sucedido:", registerCredential);

      showAlert("success", "Registro realizado com sucesso!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Erro no registro:", error);
      showAlert("error", getErrorMessage(error));
    }
  };

  return (
    <>
      <AlertComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="pb-5 text-3xl font-black">Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText name={"email"} control={control} label="Email" />
          <FormInputText
            type="password"
            name={"password"}
            control={control}
            label="Password"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p>Já tem uma conta?</p>
          <Link to="/login" className="ml-2 text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;

import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { login } from "../services/authService";

import FormInputText from "../components/Forms/FormInputText";
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = useAlert();

  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/email-already-in-use":
        return "Email já cadastrado";
      case "auth/invalid-credential":
        return "Credenciais inválidas";
      default:
        return "Erro ao realizar login";
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const userCredential = await login(data.email, data.password);
      console.log(userCredential);
      showAlert("success", "Login realizado com sucesso");
      setTimeout(() => {
        navigate("/connections");
      }, 1000);
    } catch (error) {
      console.error("Erro no login:", error);
      showAlert("error", getErrorMessage(error));
    }
  };

  return (
    <>
      <AlertComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="pb-5 text-3xl font-black">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText name="email" control={control} label="Email" />
          <FormInputText
            name="password"
            control={control}
            label="Senha"
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p>Não tem uma conta?</p>
          <Link to="/register" className="ml-2 text-blue-500">
            Registre-se
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;

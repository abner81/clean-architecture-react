import React, { useState, useEffect } from "react";
import { Header, Footer, Input, FormStatus } from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";
import Styles from "./signup-styles.scss";

const SignUp: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    nameError: "Campo Obrigatório",
    emailError: "Campo Obrigatório",
    passwordError: "Campo Obrigatório",
    passwordConfirmationError: "Campo Obrigatório",
    mainError: "",
  });

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            disabled
            className={Styles.submit}
            data-testid="submit"
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;

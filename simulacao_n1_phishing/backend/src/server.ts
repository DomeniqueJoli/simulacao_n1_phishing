import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

const arquivoDados = path.join(
  __dirname,
  "../dados/tentativas.json"
);

interface Tentativa {
  id: number;
  usuario: string;
  senhaInformada: string;
  data: string;
}

app.post("/simulacao/login", (req, res) => {
  const { usuario, senhaInformada } = req.body;

  if (!usuario) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Usuário não informado."
    });
  }

  let tentativas: Tentativa[] = [];

  if (fs.existsSync(arquivoDados)) {
    const conteudo = fs.readFileSync(
      arquivoDados,
      "utf-8"
    );

    tentativas = JSON.parse(conteudo);
  }

  const novaTentativa: Tentativa = {
    id: tentativas.length + 1,
    usuario,
    senhaInformada,
    data: new Date().toISOString()
  };

  tentativas.push(novaTentativa);

  fs.writeFileSync(
    arquivoDados,
    JSON.stringify(tentativas, null, 2)
  );

  return res.json({
    sucesso: true,
    mensagem: "Simulação registrada."
  });
});

app.listen(3000, () => {
  console.log(
    "Backend rodando em http://localhost:3000"
  );
});
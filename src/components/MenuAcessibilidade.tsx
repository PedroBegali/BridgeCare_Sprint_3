import { useEffect } from "react";

const MenuAcessibilidade = () => {
  useEffect(() => {
    const scriptId = "vlibras-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const scriptLibras = document.createElement("script");
    scriptLibras.id = scriptId;
    scriptLibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    scriptLibras.async = true;
    scriptLibras.onload = () => {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };
    document.body.appendChild(scriptLibras);
  }, []);

  return (
    <div {...{ vw: "true" }} className="enabled">
      <div vw-access-button="true" className="active"></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
};

export default MenuAcessibilidade;
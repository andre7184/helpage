function abrirMenu(menu) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  if (menu === "verificar") {
    main.innerHTML = `
            <h2>Verificar Código HTML e CSS</h2>
            <form id="codeForm">
                <label for="htmlCode">Código HTML:</label><br>
                <textarea id="htmlCode" rows="10" cols="50"></textarea><br><br>
                <label for="cssCode">Código CSS:</label><br>
                <textarea id="cssCode" rows="10" cols="50"></textarea><br><br>
                <button type="button" onclick="analyzeCode()">Analisar Código</button>
            </form>
            <h2>Resultado da Análise:</h2>
            <div id="analysisResult"></div>
        `;
  } else if (menu === "gerar") {
    main.innerHTML = `
            <h2>Gerador de Código</h2>
            <form id="generateForm">
                <label for="description">Descrição do que deseja criar:</label><br>
                <textarea id="description" rows="10" cols="50"></textarea><br><br>
                <button type="button" onclick="generateCode()">Gerar Código</button>
            </form>
            <h2>Código Gerado:</h2>
            <div id="generatedCode"></div>
            <button type="button" onclick="exibirPagina()">Exibir Página</button>
        `;
  }
}

async function analyzeCode() {
  const htmlCode = document.getElementById("htmlCode").value;
  const cssCode = document.getElementById("cssCode").value;

  const prompt = `Analise o seguinte código HTML e CSS e forneça uma explicação detalhada:
    HTML:
    ${htmlCode}
    CSS:
    ${cssCode}`;

  const response = await fetch(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer SUA_CHAVE_API`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1500,
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    }
  );

  const data = await response.json();
  const result = data.choices[0].text;
  displayAnalysis(result);
}

function displayAnalysis(result) {
  const analysisResult = document.getElementById("analysisResult");
  analysisResult.innerHTML = "";

  const items = result.split("\n").filter((item) => item.trim() !== "");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    analysisResult.appendChild(li);
  });
}

async function generateCode() {
  const description = document.getElementById("description").value;

  const prompt = `Gere um código HTML e CSS baseado na seguinte descrição:
    ${description}`;

  const response = await fetch(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer SUA_CHAVE_API`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1500,
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    }
  );

  const data = await response.json();
  const result = data.choices[0].text;
  displayGeneratedCode(result);
}

function displayGeneratedCode(result) {
  const generatedCode = document.getElementById("generatedCode");
  generatedCode.innerHTML = `<pre>${result}</pre>`;
}

function exibirPagina() {
  const generatedCode = document.getElementById("generatedCode").innerText;
  const newWindow = window.open();
  newWindow.document.write(generatedCode);
}

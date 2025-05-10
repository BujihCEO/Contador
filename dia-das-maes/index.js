function obterDataDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataStr = urlParams.get("data");
    if (!dataStr) return null;

    const partes = dataStr.split("-");
    if (partes.length !== 3) return null;

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    return new Date(ano, mes, dia);
}

function calcularDiferenca(dataInicio) {
    const agora = new Date();
    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let dataAniversario = new Date(dataInicio);
    dataAniversario.setFullYear(agora.getFullYear());

    if (agora < dataAniversario) {
        anos--;
    }

    const diferenca = agora - dataInicio;
    const diasTotais = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const diasRestantes = diasTotais - anos * 365 - Math.floor(anos / 4);

    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return { anos, diasRestantes, horas, minutos, segundos };
}

function calcularProgresso(dataInicio) {
    const agora = new Date();
    let inicioMes = new Date(agora.getFullYear(), agora.getMonth(), dataInicio.getDate());
    let proximoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, dataInicio.getDate());

    if (agora < inicioMes) {
        inicioMes.setMonth(inicioMes.getMonth() - 1);
        proximoMes.setMonth(proximoMes.getMonth() - 1);
    }

    let progressoMes = ((agora - inicioMes) / (proximoMes - inicioMes)) * 100;
    let diasParaProximoMes = Math.ceil((proximoMes - agora) / (1000 * 60 * 60 * 24));

    let inicioAno = new Date(dataInicio);
    inicioAno.setFullYear(agora.getFullYear());

    let proximoAno = new Date(dataInicio);
    proximoAno.setFullYear(agora.getFullYear() + 1);

    if (agora < inicioAno) {
        inicioAno.setFullYear(inicioAno.getFullYear() - 1);
        proximoAno.setFullYear(proximoAno.getFullYear() - 1);
    }

    let progressoAno = ((agora - inicioAno) / (proximoAno - inicioAno)) * 100;
    let diasParaProximoAno = Math.ceil((proximoAno - agora) / (1000 * 60 * 60 * 24));

    return { progressoMes, progressoAno, diasParaProximoMes, diasParaProximoAno };
}

function iniciarContador(dataInicio) {
    var contador = document.querySelector(".contador");
    function atualizarContador() {
        const { anos, diasRestantes, horas, minutos, segundos } = calcularDiferenca(dataInicio);
        let texto = `
            <div><p>${anos}</p> ${anos >= 1 ? '<p>anos</p>' : '<p>ano</p>'}</div>
            <div><p>${diasRestantes}</p> ${anos >= 1 ? '<p>dias</p>' : '<p>dia</p>'}</div>
            <div><p>${horas}</p> ${anos >= 1 ? '<p>horas</p>' : '<p>hora</p>'}</div>
            <div><p>${minutos}</p> ${anos >= 1 ? '<p>minutos</p>' : '<p>minuto</p>'}</div>
            <div><p>${segundos}</p> <p>segundos</p></div>
            <div class="relogio">
                <div class="pontero" style="transform: rotate(${segundos * 6}deg)"></div>
                <div class="marcador topo vert"></div>
                <div class="marcador direita hori"></div>
                <div class="marcador base vert"></div>
                <div class="marcador esquerda hori"></div>
            </div>
        `;
        contador.innerHTML = texto;
    }
    atualizarContador();
    setInterval(atualizarContador, 1000);
    
    function criarCoracao() {
        const container = document.getElementById('coracoes-container');
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        coracao.innerHTML = '❤️';
    
        coracao.style.left = Math.random() * 100 + 'vw';
        coracao.style.fontSize = (Math.random() * 20 + 20) + 'px';
        coracao.style.opacity = Math.random() * 0.5 + 0.5;
    
        container.appendChild(coracao);
    
        setTimeout(() => {
            coracao.remove();
        }, 5000);
    }
    setInterval(criarCoracao, 500);
    
    const frasesMae = [
        `"Você é a razão de tantas histórias bonitas 🌷"`,
        `"Ser mãe é carregar o amor no colo e no coração ❤️"`,
        `"Você é mais forte do que imagina e mais amada do que percebe ✨"`,
        `"Obrigada por cada abraço que cura e cada palavra que conforta 🤗"`,
        `"Hoje é um ótimo dia para lembrar: você é INCRIVÉL 🌟"`
    ];

    function mostrarFrases() {
        var frasesBox = document.querySelector('.frases');
        let index = 0;
        function trocarFrase() {
            frasesBox.textContent = frasesMae[index];
            index + 1 == frasesMae.length ? index = 0 : index += 1;
        }
        trocarFrase();
        setInterval(trocarFrase, 5000);
    }
    mostrarFrases();

    var imageTeste;

    function checkImg() {

    }
}

const data = obterDataDaURL();
if (data) iniciarContador(data);
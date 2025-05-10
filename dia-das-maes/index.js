const urlParams = new URLSearchParams(window.location.search);

function obterDataDaURL() {
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

function iniciarContador(dataInicio) {
    function colorir() {
        const cor = urlParams.get("cor");
        if (cor) {
            document.body.classList.add('cor-'+cor);
        }
    }
    colorir();

    var contador = document.querySelector(".contador");
    function atualizarContador() {
        const { anos, diasRestantes, horas, minutos, segundos } = calcularDiferenca(dataInicio);
        let texto = `
            <div><p>${anos}</p> ${anos > 1 ? '<p>anos</p>' : '<p>ano</p>'}</div>
            <div><p>${diasRestantes}</p> ${diasRestantes > 1 ? '<p>dias</p>' : '<p>dia</p>'}</div>
            <div><p>${horas}</p> ${horas > 1 ? '<p>horas</p>' : '<p>hora</p>'}</div>
            <div><p>${minutos}</p> ${minutos > 1 ? '<p>minutos</p>' : '<p>minuto</p>'}</div>
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
        `"Seu abraço me cura e suas palavras me confortam 🤗"`,
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

    function getYoutube() {
        var yt = urlParams.get("yt");
        if (yt) {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);

            let player;
            window.onYouTubeIframeAPIReady = function() {
                player = new YT.Player('video', {
                    videoId: yt,
                    playerVars: { autoplay: 1, rel: 0, loop: 1, controls: 0},
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });
                document.querySelector(".videoBox").classList.add('on');
            }

            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PLAYING) {
                    console.log("O vídeo foi iniciado!");
                }
            }
        }
    }
    // getYoutube();

    const metas = [
        {   tempo: 0, 
            icone: '🤰',
            titulo: "Estou grávida!!",
            texto: 'A barriga cresceu e não foi de comida. Alguém falou em comida?'
        },
        {   tempo: 1, 
            icone: '🍼',
            titulo: "Sobrevivemos ao primeiro mês!",
            texto: 'Parecia que eu não ia conseguir, mas até que levo jeito.'
        },
        {   tempo: 6, 
            icone: '🦷',
            titulo: "Primeiros dentinhos!",
            texto: 'São tão pequeninhos, ser mordidas por eles parece um privilegio.'
        },
        {   tempo: 12, 
            icone: '🎂',
            titulo: "Primeiro aninho!",
            texto: 'Inesquecivél! O primeiro de muitos que viram.'
        },
        {   tempo: 60, 
            icone: '👑',
            titulo: "Mestre em maternidade",
            texto: 'Venci as frauldas sujas e o choro de madrugada, nada mais me abala, eu acho...'
        },
        {   tempo: 120,
            icone: '🏆',
            titulo: "Mamãe experiente",
            texto: '10 anos no cargo, já posso pedir promoção? Cadê meu aumento (de paciência)?'
        },
        {   tempo: 120,
            icone: '🎸',
            titulo: "Mãe de adolescente",
            texto: 'Agora temos um ser humano com hormônios e playlists próprias em casa. Força!'
        },
        {   tempo: 216,
            icone: '🎓',
            titulo: "Eles crecem tão rápido",
            texto: 'Foi num piscar de olhos. Derrepente adulto. Mas quem manda ainda sou eu, viu?'
        }
    ];

    function atualizarMetas() {
        const hoje = new Date();
        let anos = hoje.getFullYear() - dataInicio.getFullYear();
        let meses = hoje.getMonth() - dataInicio.getMonth();
        let dias = hoje.getDate() - dataInicio.getDate();

        if (dias < 0) {
            meses -= 1;
        }

        if (meses < 0) {
            anos -= 1;
            meses += 12;
        }

        const mesesTotais = anos * 12 + meses;
        let checklistHTML = "";
        metas.forEach(meta => {
            if (mesesTotais >= meta.tempo) {
                checklistHTML += `
                <div class="conquista">
                    <span class='check'>&#10003;</span>
                    <span class='icone'>${meta.icone}</span>
                    <span class='titulo'>${meta.titulo}</span>
                    <span class='texto'>${meta.texto}</span>
                </div>`;
            } else {
                checklistHTML += `
                <div class="conquista">
                    <span class='bloqueado'></span>
                    <span class='icone'>${meta.icone}</span>
                    <span class='titulo'> ${meta.titulo}</span>
                    <span class='texto'>Em breve</span>
                </div>`;
            }
        });
        document.querySelector(".conquistas").innerHTML = checklistHTML;
    }
    atualizarMetas();

}

const data = obterDataDaURL();
if (data) iniciarContador(data);
// Função para alternar entre as abas de Login e Cadastro
function alternarAbas(aba) {
    const formLogin = document.getElementById('login-form');
    const formCadastro = document.getElementById('cadastro-form');
    const tabLogin = document.getElementById('tab-login');
    const tabCadastro = document.getElementById('tab-cadastro');

    if (aba === 'login') {
        formLogin.classList.remove('hidden');
        formCadastro.classList.add('hidden');
        tabLogin.classList.add('active');
        tabCadastro.classList.remove('active');
    } else {
        formLogin.classList.add('hidden');
        formCadastro.classList.remove('hidden');
        tabLogin.classList.remove('active');
        tabCadastro.classList.add('active');
    }
}

// Função simulando a criação de conta
function criarConta(event) {
    event.preventDefault(); // Impede a página de recarregar
    
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    const confirmaSenha = document.getElementById('cad-senha-confirma').value;

    // Validação profissional: as senhas precisam ser iguais
    if (senha !== confirmaSenha) {
        alert("Erro: As senhas informadas não coincidem!");
        return;
    }

    // Guardando temporariamente no navegador para simular banco de dados
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', senha);

    alert("Conta criada com sucesso! Agora faça o seu login.");
    alternarAbas('login'); // Joga o usuário para a tela de login
}

// Função simulando o Login
function fazerLogin(event) {
    event.preventDefault(); // Impede o site de recarregar a página
    const emailDigitado = document.getElementById('login-email').value;
    const senhaDigitada = document.getElementById('login-senha').value;

    const emailSalvo = localStorage.getItem('userEmail');
    const senhaSalva = localStorage.getItem('userPassword');

    // CONFIRA ESTA LINHA: tem que ser senhaSalva
    if (emailDigitado === emailSalvo && senhaDigitada === senhaSalva) {
        alert("Acesso autorizado! Bem-vindo ao AgroSustentável.");
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('form-section').classList.remove('hidden');
    } else {
        alert("E-mail ou senha incorretos. Tente novamente ou crie uma conta.");
    }
}
function calcularRelatorio() {
    // Pegando os valores digitados no formulário
    const nome = document.getElementById('nome').value;
    const area = parseFloat(document.getElementById('area').value);
    const cultura = document.getElementById('cultura').value;
    const tipoAdubo = document.getElementById('tipo-adubo').value;
    const qtdAdubo = parseFloat(document.getElementById('qtd-adubo').value);
    const volumeSilagem = parseFloat(document.getElementById('volume-silagem').value);
    const vedacao = document.getElementById('vedacao').value;

    // Validação simples para não deixar campos vazios
    if (!nome || isNaN(area) || isNaN(qtdAdubo) || isNaN(volumeSilagem)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // --- LÓGICA DE CÁLCULO (SIMULAÇÃO BASEADA EM DADOS AGRONÔMICOS) ---
    
    // 1. Cálculo de CO2 estimado (Adubo mineral emite mais CO2 que o orgânico)
    let fatorEmissaoAdubo = tipoAdubo === 'mineral' ? 1.5 : 0.4; 
    let emissaoTotalCO2 = ((qtdAdubo * area) * fatorEmissaoAdubo) / 1000; // resultado em toneladas de CO2

    // 2. Recomendação de adubo (Simulação de adubação ideal por cultura)
    let aduboIdealPorHectare = 200; // padrão
    if (cultura === 'milho') aduboIdealPorHectare = 350;
    if (cultura === 'soja') aduboIdealPorHectare = 150;
    if (cultura === 'pastagem') aduboIdealPorHectare = 180;

    // 3. Eficiência da Silagem baseada na vedação
    let eficienciaSilo = vedacao === 'barreira' ? 92 : 75;

    // --- MONTANDO O RELATÓRIO NA TELA ---
    document.getElementById('rep-nome-propriedade').innerText = nome;
    document.getElementById('rep-co2').innerText = emissaoTotalCO2.toFixed(2) + " t";
    document.getElementById('rep-adubo').innerText = aduboIdealPorHectare + " kg/ha";
    document.getElementById('rep-silagem').innerText = eficienciaSilo + "%";

    // Criando o texto de diagnóstico personalizado
    let diagnostico = `A propriedade ${nome} possui um grande potencial sustentável. `;
    
    if (qtdAdubo > aduboIdealPorHectare) {
        diagnostico += `Identificamos que você está aplicando mais adubo por hectare do que o recomendado para a cultura do(a) ${cultura}. Reduzir para ${aduboIdealPorHectare} kg/ha vai te fazer economizar dinheiro e diminuirá sua pegada de carbono atual de ${emissaoTotalCO2.toFixed(2)} toneladas de CO₂. `;
    } else {
        diagnostico += `Parabéns! Sua quantidade de adubo está equilibrada para a cultura do(a) ${cultura}. `;
    }

    if (vedacao === 'simples') {
        diagnostico += `Sobre a silagem: mudar para uma lona com barreira de oxigênio pode aumentar a eficiência do seu silo de 75% para mais de 90%, evitando a perda de matéria seca e a liberação de gases poluentes por apodrecimento.`;
    } else {
        diagnostico += `Excelente escolha no uso da lona com barreira de oxigênio, garantindo o máximo de nutrientes na silagem com o mínimo de perdas ambientais.`;
    }

    document.getElementById('rep-diagnostico').innerText = diagnostico;

    // Troca as seções na tela (Esconde o formulário e mostra o relatório)
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('report-section').classList.remove('hidden');
}

function voltarFormulario() {
    // Faz o caminho inverso (Esconde o relatório e mostra o formulário)
    document.getElementById('report-section').classList.add('hidden');
    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('agro-form').reset();
}
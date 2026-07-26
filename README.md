<div align="center">

# 🏎️ McLaren 720S — Experiência Digital & Quiet Luxury ⚡🏁

**Uma landing page editorial ultra-premium, interativa e imersiva desenvolvida para celebrar a performance e a aerodinâmica ativa do supercarro McLaren 720S Super Series.**

[![Versão](https://img.shields.io/badge/versão-1.0.0-FF5200?style=for-the-badge&logo=mclaren&logoColor=white)](https://github.com/carlosguedes-dev/mclaren-720s)
[![Licença](https://img.shields.io/badge/licença-MIT-00D2FF?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Feito com Amor](https://img.shields.io/badge/Feito_com-MUITO_AMOR_❤️-ff0055?style=for-the-badge)](https://github.com/carlosguedes-dev)

---

🔗 **[Acessar o Projeto Ao Vivo / Demonstração Online](https://carlosguedes-dev.github.io/mclaren-720s/)**

---

<p align="center">
  <img src="ARQUIVOS/trazeira%20do%20carro.jpeg" alt="McLaren 720S Rear Wing" width="85%" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(255, 82, 0, 0.3);">
</p>

</div>

---

## 📖 Sobre o Projeto

O **McLaren 720S — Experiência Digital & Quiet Luxury** é um projeto vitrine de engenharia front-end de padrão internacional, concebido sob os princípios de design editorial purista, respiro visual generoso e sobriedade estética (*Quiet Luxury*), inspirando-se diretamente nas apresentações institucionais da Apple (Cupertino) e nas campanhas de alta relojoaria e automobilismo de elite da Europa.

O grande diferencial técnico desta aplicação é o seu motor de **Animação de Vídeo Sincronizada ao Scroll via Canvas (Frame Scrubbing em Alta Fidelidade)**. Utilizando o poderoso algoritmo do FFmpeg com amostragem de cores completa 4:4:4 (`yuvj444p`) e qualidade de compressão sem perdas (`-q:v 1`), foram extraídos **192 quadros em qualidade estúdio** do filme oficial de lançamento da McLaren. O JavaScript nativo renderiza essa sequência na tela através de um elemento `<canvas>` com interpolação de alta definição (`imageSmoothingQuality = 'high'`), respondendo com precisão milimétrica e fluidez absoluta ao movimento de rolagem do usuário.

Este projeto elimina excessos, caixas pesadas e ruídos visuais informais em favor da pureza arquitetônica: textos flutuantes soberanos, tipografia suíça e britânica lapidada (*Outfit* & *Inter*), Bento Grids minimalistas para KPIs de performance e transições suaves acionadas pela `IntersectionObserver API`.

---

## ✨ Principais Funcionalidades

- ⚡ **Canvas Scroll-Bound Animation (192 Frames HD)**: Reprodução interativa de quadros de vídeo em definição máxima 4:4:4 sem compressão de croma, controlada em tempo real pela barra de rolagem da página.
- 💎 **Estética "Quiet Luxury" & Respiro Editorial**: Eliminação completa de caixas em torno de títulos principais, permitindo que a tipografia editorial flutue de forma livre, imponente e límpida no lado esquerdo da Hero Section.
- 🏁 **Ficha Técnica em Bento Grid & Colunas Arquitetônicas**: Apresentação de dados técnicos organizada em duas etapas: um **Bento Grid** impactante destacando os 4 KPIs supremos (**720 CV**, **2.9s**, **341 km/h** e **1.283 kg**) seguido por duas colunas limpas dividindo Powertrain e Dinâmica de Chassi.
- 🛋️ **Cockpit Monocage II em Parallax**: Uso da fotografia oficial de estúdio do interior como background imersivo em alta claridade (`brightness: 0.85`), harmonizada com um card editorial de vidro escuro flutuando à direita.
- 🎬 **Micro-animações Silenciosas (Reveal on Scroll)**: Elementos, especificações e textos técnicos emergem graciosamente na tela com curvas de aceleração customizadas (`cubic-bezier`).
- 📱 **Responsividade Absoluta Pixel-Perfect**: Layout flexível e adaptativo construído com CSS Grid e Flexbox, entregando usabilidade impecável desde monitores Ultrawide até smartphones e tablets.

---

## 💻 Tecnologias & Arquitetura

O projeto foi construído inteiramente em **Vanilla Web Technologies** (sem frameworks ou bibliotecas pesadas), garantindo que a GPU e a CPU foquem 100% na renderização gráfica dos frames:

- **HTML5 Semântico**: Estruturação limpa, acessível, sem ruídos e otimizada para SEO.
- **CSS3 Moderno (Design Tokens & Glassmorphism)**: Variáveis CSS modulares, efeitos de vidro translúcido (`backdrop-filter: blur`), gradientes direcionais suaves e animações otimizadas.
- **JavaScript ES6+ (Canvas & IntersectionObserver)**: Engine de controle sequencial de frames com pre-loader de imagens inteligente e monitoramento de visibilidade para animações de entrada sem gargalos.
- **FFmpeg 4:4:4 Processing**: Script de extração de vídeo otimizado em terminal para geração de quadros em qualidade estúdio sem perda de profundidade de cor.

---

## 📁 Estrutura de Arquivos

```text
mclaren-720s/
│
├── ARQUIVOS/
│   ├── Frammes/         # 192 quadros de alta definição (frame_0001.jpg a frame_0192.jpg) extraídos em yuvj444p
│   ├── HeroSection.mp4  # Filme original de lançamento da McLaren no túnel de vento
│   ├── Interior...jpeg  # Fotografia de alta resolução do cockpit Monocage II (Parallax BG)
│   └── trazeira...jpeg  # Fotografia de estúdio da traseira e aerofólio ativo do 720S
│
├── index.html           # Estrutura semântica principal e seções editoriais da landing page
├── style.css            # Folha de estilos purista, Bento Grid, Design Tokens e responsividade
├── script.js            # Controlador de animação de Canvas HD e Intersection Observer
├── README.md            # Documentação técnica completa e apresentação do projeto
├── CONTRIBUTING.md      # Guia de contribuição e padrões de código (Quiet Luxury)
└── LICENSE              # Licença aberta MIT
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone este repositório** em seu terminal:
   ```bash
   git clone https://github.com/carlosguedes-dev/mclaren-720s.git
   ```
2. **Acesse a pasta do projeto**:
   ```bash
   cd mclaren-720s
   ```
3. **Abra no seu navegador favorito**:
   - Dê um duplo clique direto no arquivo `index.html` ou abra através de uma extensão como **Live Server** no VS Code.

---

## 🤝 Como Contribuir

Consulte o nosso guia em [CONTRIBUTING.md](CONTRIBUTING.md) para saber como propor melhorias, criar branches de desenvolvimento ou reportar eventuais comportamentos.

---

<div align="center">
  <p>Desenvolvido com 🏁 e precisão por <strong>Carlos Guedes</strong> &mdash; 2026</p>
  <p><a href="https://github.com/carlosguedes-dev">GitHub Profile</a> &bull; <a href="https://carlosguedes-dev.github.io/mclaren-720s/">Ver Projeto Online</a></p>
</div>

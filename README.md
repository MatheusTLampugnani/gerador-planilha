# Gerador de Planilha de Carros em React + Vite

![Preview da Aplicação](https://i.imgur.com/JQZ8HlO.png)

Um aplicativo web que permite cadastrar modelos de carros com seus preços e exportar os dados para uma planilha Excel (.xlsx).

## Funcionalidades

- Formulário para cadastro de veículos (modelo, marca, preço)
- Formatação automática de valores monetários (R$)
- Visualização dos dados em tabela HTML
-  Exportação para Excel com:
  - Cabeçalhos personalizados
  - Ajuste automático de largura das colunas
  - Nome de arquivo personalizado

## Tecnologias

- React 18
- Vite 4
- [xlsx](https://sheetjs.com/) (para geração de planilhas)
- [file-saver](https://www.npmjs.com/package/file-saver) (para download do arquivo)
- CSS puro (sem bibliotecas externas)

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gerador-excel-carros.git
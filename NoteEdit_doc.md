
# NoteEdit - Componente de Edição de Notas

## Visão Geral

O componente `NoteEdit` permite criar, editar e deletar notas utilizando o editor de texto [Tiptap](https://tiptap.dev/). As notas são salvas localmente no navegador utilizando `localStorage`.

---

## Funcionalidades

### ✅ Criação de Notas
- O botão "Salvar" salva o conteúdo atual do editor como uma nova nota.
- A nota só é salva se não estiver vazia (`<p></p>` ou string vazia são ignoradas).
- Após o salvamento, o editor é limpo automaticamente.
- O ID é gerado com `uuidv4()`.

### ✅ Listagem de Notas
- As notas salvas são exibidas como cartões.
- Ao clicar em um cartão, o conteúdo é carregado no editor para edição.
- Cada cartão mostra um botão "Deletar", posicionado fora do clique principal para evitar conflito.

### ✅ Deleção de Notas
- Ao clicar no botão "Deletar", a nota é removida do estado e do `localStorage`.
- O clique no botão "Deletar" não interfere no clique de edição do cartão (uso de `e.stopPropagation()`).

### ✅ Edição de Notas com Modal
- Ao clicar em uma nota, um modal se abre com o conteúdo carregado.
- O modal permite editar a nota e salvar alterações.
- As alterações são persistidas no `localStorage`.

---

## Armazenamento Local (`localStorage`)
- As notas são armazenadas sob a chave `notes`.
- O estado inicial do componente carrega automaticamente as notas existentes no localStorage.

---

## Dependências
- `@tiptap/react` para o editor de texto.
- `@tiptap/starter-kit` como extensão básica.
- `uuid` para geração de IDs únicos.

---

## Observações
- O componente utiliza Tailwind CSS para estilização.
- O modal é uma estrutura simples baseada em `fixed` e `z-50` para sobrepor o conteúdo.
- O editor dentro do modal utiliza `setContent` e `getHTML` para controle manual do conteúdo.


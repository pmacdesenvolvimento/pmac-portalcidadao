# Portal Cidadão

## Leitura por voz

A leitura usa o Piper neural com a voz brasileira `pt_BR-faber-medium`. A
síntese acontece no navegador; o texto lido não é enviado a um serviço externo.
Os arquivos da voz e do mecanismo ficam em `vendor/` e somam aproximadamente
92 MB.

Sirva o projeto por HTTP ou HTTPS para usar a leitura por voz. Navegadores
bloqueiam o carregamento de módulos e WebAssembly quando a página é aberta
diretamente por `file://`. Para testar localmente, execute na raiz do projeto:

```sh
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

Os avisos de licença dos componentes e da voz estão em
[`vendor/THIRD_PARTY_NOTICES.md`](./vendor/THIRD_PARTY_NOTICES.md).
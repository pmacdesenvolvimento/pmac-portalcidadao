# Portal Cidadão

## Leitura por voz

A leitura usa o modelo local `tiny-voca-ptbr` com a voz feminina `F_s4`. A
síntese acontece no navegador; o texto lido não é enviado a um serviço externo.
O modelo, o fonemizador e seus dados ficam em `vendor/tiny-voca-ptbr/`; o
ONNX Runtime compartilhado fica em `vendor/onnxruntime-web/`.

Sirva o projeto por HTTP ou HTTPS para usar a leitura por voz. Navegadores
bloqueiam o carregamento de módulos e WebAssembly quando a página é aberta
diretamente por `file://`. Para testar localmente, execute na raiz do projeto:

```sh
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

Os avisos de licença dos componentes e da voz estão em
[`vendor/THIRD_PARTY_NOTICES.md`](./vendor/THIRD_PARTY_NOTICES.md).
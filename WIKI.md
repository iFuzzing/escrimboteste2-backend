# Documentação da API
## Base URL: [OFF]


## Endpoints

## 1. Cadastro de Usuário (`POST /users/signup`)

Endpoint para cadastrar um novo usuário no sistema.

#### Requisição:

- **Method:** `POST`
- **Content-Type:** `application/json`

### Requisição:

```json
{
  "nome": "nome",
  "email": "email@email.com",
  "senha": "senha123@",
  "telefones": [
    {
      "numero": "123456789",
      "ddd": "12"
    }
  ]
}
```

### Sucesso:
```json
{
  "id": "GUID/ID",
  "data_criacao": "data",
  "data_atualizacao": "data",
  "ultimo_login": "data",
  "token": "GUID/JWT"
}
```

## 2. Autenticação de Usuário (`POST /users/signin`)

Endpoint para autenticar um novo usuário no sistema.

#### Requisição:

- **Method:** `POST`
- **Content-Type:** `application/json`

### Requisição:

```json
{
  "email": "email@email.com",
  "senha": "senha123@"
}
```

### Sucesso:
```json
{
  "id": "GUID/ID",
  "data_criacao": "data",
  "data_atualizacao": "data",
  "ultimo_login": "data",
  "token": "GUID/JWT"
}
```

## 3. Consultar Informações do Usuário Atual (`POST /users/me`)

Endpoint para obter informações do usuário autenticado.

#### Requisição:

- **Method:** `GET`
- **Content-Type:** `application/json`

### Sucesso:
```json
{
  "nome": "nome",
  "email": "email@email.com",
  "telefones": [
    {
      "numero": "123456789",
      "ddd": "12"
    }
  ]
}

```

## 4. Outras rotas 

Qualquer outra rota que não seja especificada acima retornará a seguinte mensagem de erro:


### Resposta:
```json
{
  "mensagem": "Rota não encontrada"
}
```


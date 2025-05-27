# Documentação do Sistema de Gerenciamento de Manutenção da Honda CB300F Twister

## Visão Geral

Este sistema foi desenvolvido para gerenciar as manutenções e revisões da sua Honda CB300F Twister, seguindo as recomendações do manual do fabricante. O sistema permite registrar manutenções, acompanhar o histórico, receber alertas sobre próximas manutenções necessárias e manter os dados da sua moto atualizados.

## Funcionalidades Principais

- **Registro de Manutenções**: Registre todas as manutenções realizadas na sua moto, incluindo tipo, data, quilometragem, custo e observações.
- **Alertas de Manutenção**: Receba alertas sobre as próximas manutenções necessárias com base na quilometragem atual e nos intervalos recomendados pela Honda.
- **Histórico Completo**: Visualize todo o histórico de manutenções realizadas, com estatísticas de custos e datas.
- **Dados da Moto**: Mantenha os dados da sua moto atualizados, incluindo modelo, ano, placa, chassi e quilometragem atual.
- **Segurança**: Acesso protegido por autenticação, garantindo que apenas você tenha acesso aos seus dados.

## Tecnologias Utilizadas

- **Frontend**: Next.js com Tailwind CSS
- **Backend**: API Routes do Next.js
- **Banco de Dados**: Cloudflare D1 (SQLite compatível)
- **Autenticação**: JWT (JSON Web Tokens) com cookies seguros
- **Deploy**: Compatível com Netlify e Vercel

## Instruções para Deploy

### Opção 1: Deploy no Netlify

1. Faça login na sua conta do Netlify
2. Clique em "New site from Git"
3. Conecte sua conta do GitHub e selecione o repositório
4. Configure as variáveis de ambiente:
   - `JWT_SECRET`: Uma string aleatória e segura para tokens JWT
5. Clique em "Deploy site"

### Opção 2: Deploy no Vercel

1. Faça login na sua conta do Vercel
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente:
   - `JWT_SECRET`: Uma string aleatória e segura para tokens JWT
5. Clique em "Deploy"

## Primeiro Acesso

Ao acessar o sistema pela primeira vez:

1. Você será redirecionado para a página de login
2. Use as credenciais iniciais:
   - Usuário: `admin`
   - Senha: `admin123`
3. Por segurança, altere a senha imediatamente após o primeiro login

## Guia de Uso

### Página Inicial

A página inicial apresenta uma visão geral do status da sua moto, incluindo:
- Quilometragem atual
- Próximas manutenções necessárias
- Alertas importantes

### Manutenções

Na seção de manutenções, você pode:
- Visualizar as próximas manutenções recomendadas
- Registrar novas manutenções realizadas
- Consultar a tabela de manutenção recomendada pela Honda

### Histórico

Na seção de histórico, você pode:
- Visualizar todas as manutenções já realizadas
- Consultar estatísticas de custos e frequência
- Filtrar por tipo de manutenção ou período

### Dados da Moto

Na seção de dados da moto, você pode:
- Visualizar e atualizar informações da sua moto
- Atualizar a quilometragem atual
- Gerenciar documentos e lembretes (IPVA, licenciamento, seguro)

## Segurança e Privacidade

Este sistema foi desenvolvido com foco em segurança e privacidade:

- Todos os dados são armazenados de forma segura
- O código-fonte não contém informações sensíveis
- Apenas você tem acesso aos seus dados através da sua conta de administrador
- As senhas são armazenadas com hash seguro
- A autenticação é feita com tokens JWT e cookies HTTP-only

## Manutenção e Suporte

Para manter o sistema funcionando corretamente:

1. Mantenha a quilometragem da moto sempre atualizada
2. Registre todas as manutenções realizadas
3. Verifique regularmente os alertas de manutenção
4. Faça backup dos dados periodicamente

## Considerações Finais

Este sistema foi desenvolvido especificamente para atender às suas necessidades de gerenciamento de manutenção da Honda CB300F Twister. Ele segue todas as recomendações do manual do fabricante e foi projetado para ser seguro, privado e fácil de usar.

Aproveite seu sistema de gerenciamento de manutenção e tenha uma ótima experiência com sua moto!

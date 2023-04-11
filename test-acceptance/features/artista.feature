Feature: CRUD de artista
    Como usuário Administrador
    Quero cadastrar, alterar e remover artistas
    Para cadastrar álbuns e músicas


Scenario: Cadastrando artista
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Bruno Miranda", "Pop" e "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Artista cadastrado!"


Scenario: Cadastrando artista com nome vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "", "Forró" e "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=400"
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "nome do artista" fica realçado


Scenario: Cadastrando artista com gênero musical vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "André Rouche", "" e "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400"
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "gênero musical" fica realçado


Scenario: Cadastrando artista com link para foto vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Ivete Saganlo", "Indie" e ""
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "url_foto" fica realçado


Scenario: Atualizando um artista com sucesso
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Rihanna"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Riri", "Pop" e "https://c7.alamy.com/comp/W033FE/rihanna-makes-a-funny-face-when-she-sees-she-is-being-photographed-as-the-miami-heat-play-the-brooklyn-nets-at-barclays-center-in-new-york-city-on-january-10-2014-upijohn-angelillo-W033FE.jpg"
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Artista alterado!"

Scenario: Atualizando um artista com nome vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Doja Cat"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "", "Gospel" e "http://www.quickmeme.com/img/4a/4a21c5bc00505da501ea1b77966a17ffeac2f9dceb63c0e861696f864864e62b.jpg"
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "nome do artista" fica realçado

Scenario: Atualizando um artista com gênero musical vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Ariana Grande"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Arianna Grande", "" e "http://www.quickmeme.com/img/4a/4a21c5bc00505da501ea1b77966a17ffeac2f9dceb63c0e861696f864864e62b.jpg"
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "gênero musical" fica realçado

Scenario: Atualizando um artista com url_foto vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Arctic Monkeys"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Attic Mocks", "Rap Metal" e ""
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Campo inválido!"
    And O campo "url_foto" fica realçado
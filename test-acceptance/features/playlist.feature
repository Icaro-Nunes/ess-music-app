Feature: Criação de uma playlist
	Como um usuário da plataforma
	Eu quero poder criar várias playlists
	Para que eu possa adicionar novas músicas

Scenario: Criando nova playlist
	Given Estou logado com usuário "icaroGeovany" e senha "123456"
	And Estou na página de minha "Biblioteca"
	When Clico na opção "Criar nova playlist"
	And Preencho os campos "Nome", "Privacidade", "Gênero" e "url_foto" com respectivamente "Playlist de Natal", "Pública", "Rock" e "https://images.pexels.com/photos/14463845/pexels-photo-14463845.jpeg?auto=compress&cs=tinysrgb&w=1600"
	And Clico em "Criar"
	Then O sistema mostra uma mensagem de "Playlist cadastrada!"

Scenario: Criando nova playlist sem Nome
	Given Estou logado com usuário "icaroGeovany" e senha "123456"
	And Estou na página de minha "Biblioteca"
	When Clico na opção "Criar nova playlist"
	And Preencho os campos "Nome", "Privacidade", "Gênero" e "url_foto" com respectivamente "", "Pública", "Rock" e "https://images.pexels.com/photos/14463845/pexels-photo-14463845.jpeg?auto=compress&cs=tinysrgb&w=1600"
	And Clico em "Criar"
	Then O sistema mostra uma mensagem de "Campo inválido!"

Scenario: Atualizando playlist com sucesso
	Given Estou logado com usuário "icaroGeovany" e senha "123456"
	And Estou na página de minha "Biblioteca"
	When Clico na playlist "Primeira"
	And Clico na opção "Editar Informações"
	And Preencho os campos "Nome", "Privacidade", "Gênero" e "url_foto" com respectivamente "Segunda", "Pública", "MPB" e "https://images.pexels.com/photos/10404450/pexels-photo-10404450.jpeg?auto=compress&cs=tinysrgb&w=1600"
	And Clico em "Salvar Alteração"
	Then O sistema mostra uma mensagem de "Playlist atualizada!"

Scenario: Atualizando playlist com url_foto vazia
	Given Estou logado com usuário "icaroGeovany" e senha "123456"
	And Estou na página de minha "Biblioteca"
	When Clico na playlist "Normal"
	And Clico na opção "Editar Informações"
	And Preencho os campos "Nome", "Privacidade", "Gênero" e "url_foto" com respectivamente "Segunda", "Pública", "MPB" e ""
	And Clico em "Salvar Alteração"
	Then O sistema mostra uma mensagem de "Campo inválido!"
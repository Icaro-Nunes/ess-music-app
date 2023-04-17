Feature: Atualizando uma playlist
	Como um usuário da plataforma
	Eu desejo poder adicionar ou remover músicas de uma playlist
	Para que elas se mantenham atualizadas
	
Scenario: Adicionando uma música já existente em uma playlist
	Given Eu estou logado como o usuário "romulo_daniell"
	And Eu estou na página da playlist ""
	When Eu passo o mouse sobre as opções da música "Anti-Hero"

Cenário 2: Removendo uma música de uma playlist
	Given: Eu estou logado como o usuário “romulo_daniell”
	And: Eu estou na página da minha playlist “Músicas Para Viagem”
	And: Eu vejo a musica “Anti-Hero”
	When: Eu clico em “opções” na música “Anti-Hero”
	And: Uma lista de opções é exibida
	And: O sistema me exibe as opções “Tocar A Seguir”, “Adicionar à fila”, 
	“Adicionar a Uma Playlist”, “Remover da Playlist”, “Ir Para  Página do 
	Artista”,  e  “Compartilhar”
	And: Eu clico em “Remover da Playlist”
	And: A mensagem “Deseja Remover a Música?” é exibida
	And: Eu clico em “Sim”
	Then: A página da playlist “Músicas Para Viagem” é exibida novamente
	

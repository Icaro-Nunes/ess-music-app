import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import { sharedState } from './common_steps';

const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

async function nagvigateToAdminPage(){
    return $("a[routerLink='/userAdmin']").click();
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^Estou na página de "Cadastrar novo artista"$/, async () => {
        await nagvigateToAdminPage();
        await element(by.cssContainingText('a', 'Cadastrar artista')).click();
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/cadastrar-artista");
    })

    Given(/^Estou na página de "Editar artista" do artista "([^\"]*)"$/, {timeout: 30000}, async (artist: string) => {
        await nagvigateToAdminPage();

        await element(by.cssContainingText('a', 'Visualizar Artistas')).click();
        
        await element(by.cssContainingText('td p', artist))
            .element(by.xpath('..'))
            .element(by.xpath('..'))
            .element(by.buttonText('Visualizar Artista'))
            .click();
        
        await element(by.buttonText('Editar Informações')).click();

        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url + "/editar-artista");
    })


    When(/^Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async (name, genre, url_photo) => {
        await $("#artista-nome").clear();
        await $("#artista-nome").sendKeys(<string> name);
        await $("#artista-genero_musical").clear();
        await $("#artista-genero_musical").sendKeys(<string> genre);
        await $("#artista-url_foto_artista").clear();
        await $("#artista-url_foto_artista").sendKeys(<string> url_photo);
    })

    Then('Clico em "Salvar Alterações"', async() => {
        sharedState.action = async () =>  element(by.buttonText('Salvar Alterações')).click();
    })

    Then(/^O campo "nome do artista" fica realçado$/, async () => {
        await expect($(`#artista-nome.ng-invalid`).isPresent()).to.eventually.equal(true);
    })

    Then(/^O campo "gênero musical" fica realçado$/, async () => {
        await expect($(`#artista-genero_musical.ng-invalid`).isPresent()).to.eventually.equal(true);
    })

    Then(/^O campo "url_foto" fica realçado$/, async () => {
        await expect($(`#artista-url_foto_artista.ng-invalid`).isPresent()).to.eventually.equal(true);
    })

})

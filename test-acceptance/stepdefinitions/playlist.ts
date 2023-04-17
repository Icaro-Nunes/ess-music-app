import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
import { loginAsUser } from './common_steps';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

defineSupportCode(function ({ Given, When, Then }){
    Given(/^Estou logado com usuário "([^\"]*)" e senha "([^\"]*)"$/, async(user, password) => {
        await loginAsUser(<string> user, <string> password);
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/initial-page");
    })

    Given('Estou na página de minha "Biblioteca"', async() => {
        await element(by.cssContainingText('a', 'Biblioteca')).click();
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/bibliotecaUsuario");
    })

    When(/^Clico na opção "Criar nova playlist"$/, async() => {
        await element(by.cssContainingText('a', 'Criar nova playlist')).click();
    })

    When(/^Preencho os campos "Nome", "Privacidade", "Gênero" e "url_foto" com respectivamente "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async(name, privacy, genre, url_photo) => {
        await $("#playlist-nome").clear();
        await $("#playlist-nome").sendKeys(<string> name);
        
        await $('#playlist-privacidade').element(by.cssContainingText('option', <string>privacy)).click();
        await $('#playlist-categoria').element(by.cssContainingText('option', <string>genre)).click();

        await $("#playlist-url_foto_playlist").clear();
        await $("#playlist-url_foto_playlist").sendKeys(<string> url_photo);
    })

    When('Clico em "Criar"', async() => {
        await element(by.buttonText('Criar')).click();
    })

    When(/^Clico na playlist "([^\"]*)"$/, async(name: string) => {
        await element(by.cssContainingText('td', name)).click();
    })

    When('Clico na opção "Editar Informações"', async() => {
        await element(by.cssContainingText('li', 'Editar Informações')).click();
    })


})
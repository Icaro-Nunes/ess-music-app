import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

defineSupportCode(function ({ Given, When, Then }){
    Given(/^Estou na página do álbum "([^\"]*)" do artista "([^\"]*)"$/, {timeout: 30000}, async (album: string, artist: string) => {
        await element(by.cssContainingText('a', 'Visualizar Artistas')).click();

        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/visualizar-artistas-admin");

        await element(by.cssContainingText('td p', artist))
            .element(by.xpath('..'))
            .element(by.xpath('..'))
            .element(by.buttonText('Visualizar Artista'))
            .click();

        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url + "/visualizar-artistas-admin/");

        await browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');

        const elm = $("#tabelaAlbum")
            .element(by.cssContainingText('td', album));

        await elm.click();

        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url + "/albumAdmin/");
    })

    When(/^Clico em "Cadastrar Musicas"$/, async () => {
        await element(by.buttonText("Cadastrar Musicas")).click();

        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url + "/albumAdmin/");
        await expect(browser.getCurrentUrl()).to.eventually.include("/cadastrar-musica");
    })

    When(/^Clico em "Editar informações" na música "([^\"]*)"$/, {timeout: 30000}, async (song:string) => {
        // await element(by.cssContainingText('td p', song))
        //     .element(by.xpath('..'))
        //     .element(by.xpath('..'))
        //     .element(by.cssContainingText('li', 'Editar informações'))
        //     .click();

        const btn = element(by.cssContainingText('td p', song))
            .element(by.xpath('..'))
            .element(by.xpath('..'))
            .element(by.css('button.dropbtn'));


        // await browser.waitForAngular();
        // await browser.actions().mouseMove(btn).perform();
        btn.click();

        await browser.wait(() => false, 4000).catch(() => {});
        
        await btn
            .element(by.xpath('..'))
            .element(by.cssContainingText('li', 'Editar informações'))
            .click();

        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url + "/editar-musica/");
    })

    When(/^Preencho o campo de "Nome da Música" com "([^\"]*)"$/, async (name) => {
        await $("#musica-titulo").clear();
        await $("#musica-titulo").sendKeys(<string> name);
    })
})
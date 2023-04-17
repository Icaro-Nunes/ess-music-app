import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import { HttpClient } from 'selenium-webdriver/http';

const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

export async function loginAsUser(user_id: string, password: string){
    //Navegar até página de login
    await browser.get(base_front_url);
    await element(by.buttonText('Login')).click();
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + '/login');

    //Realizar login
    await $("input[formControlName='username']").sendKeys(<string> user_id);
    await $("input[formControlName='password']").sendKeys(<string> password);
    await element(by.buttonText('Login')).click();
}

defineSupportCode(function ({ Given, When, Then }){

    Given(/^Estou logado como o usuário Administrador de email "([^\"]*)" e senha "([^\"]*)"$/, {timeout: 30000}, async (email: string, password: string) => {
        await loginAsUser(email, password);
        await browser.wait(ExpectedConditions.urlIs(base_front_url + "/userAdmin") , 30000);
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/userAdmin");
    })

    When(/^Clico em "Adicionar"$/, async() => {
        await element(by.buttonText('Adicionar')).click();
    })

    Then(/^O sistema mostra uma mensagem de "([^\"]*)"$/, async (message: string) => {
        await expect(element(by.cssContainingText('*', message)).isPresent()).to.eventually.equal(true);
    })

})
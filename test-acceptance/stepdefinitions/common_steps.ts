import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions, promise } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

export const sharedState: {
    action: () => promise.Promise<void>
} = {
    action: null
}

async function loginAsUser(user_id: string, password: string){
    //Navegar até página de login
    await browser.get(base_front_url);
    await element(by.buttonText('Login')).click();
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + '/login');

    //Realizar login
    await $("input[formControlName='username']").sendKeys(<string> user_id);
    await $("input[formControlName='password']").sendKeys(<string> password);
    await element(by.buttonText('Login')).click();
    await browser.wait(ExpectedConditions.urlIs(base_front_url + "/initial-page") , 30000);
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/initial-page");
}

defineSupportCode(function ({ Given, When, Then }){

    Given(/^Estou logado como o usuário Administrador de email "([^\"]*)" e senha "([^\"]*)"$/, {timeout: 30000}, async (email: string, password: string) => {
        await loginAsUser(email, password);
    })

    When(/^Clico em "Adicionar"$/, async() => {
        await element(by.buttonText('Adicionar')).click();
    })

    Then(/^O sistema mostra uma mensagem de "([^\"]*)"$/, {timeout: 10000}, async (message: string) => {
        if(sharedState.action != null){
            await sharedState.action();
            sharedState.action = null;
        }
        
        await expect(
            browser.wait(
                ExpectedConditions.presenceOf(element(by.cssContainingText('*', message))),
                5000
            )
                .then(() => true)
                .catch(() => false)
        ).to.eventually.equal(true);
    })

})
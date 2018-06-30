import { ClickableLetters } from './clickableLetters/clickableLetters';
import { ClickablePortrait } from './clickablePortrait/clickablePortrait';
import { BackgroundModules } from './backgroundModules/backgroundModules';

window.addEventListener('load', init);

function init() {
    const headerElement = document.getElementById('header');
    ClickableLetters.InitializeOnElement(headerElement);
    ClickablePortrait.Init();
    BackgroundModules.Init();
}
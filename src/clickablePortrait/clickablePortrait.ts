
import samPortraitAlt1 from './images/sam_portrait_alt.jpg';
import samPortraitAlt2 from './images/sam_portrait_alt2.jpg';
import samPortraitAlt3 from './images/sam_portrait_alt3.jpg';
import samPortraitAlt4 from './images/sam_portrait_alt4.jpg';
import { BackgroundModules } from '../backgroundModules/backgroundModules';

export class ClickablePortrait {

    private static altPortraits: HTMLImageElement[];
    private static nextPortraitIndex: number;
    private static portraitElement: HTMLImageElement;
    private constructor(){};
    public static Init(): void {
        ClickablePortrait.altPortraits = [
            ClickablePortrait.imageWithSrc(samPortraitAlt1),
            ClickablePortrait.imageWithSrc(samPortraitAlt2),
            ClickablePortrait.imageWithSrc(samPortraitAlt3),
            ClickablePortrait.imageWithSrc(samPortraitAlt4)
        ];
        ClickablePortrait.nextPortraitIndex = 0;
        ClickablePortrait.portraitElement = document.getElementById('portrait') as HTMLImageElement;
        ClickablePortrait.portraitElement.addEventListener('click', ClickablePortrait.portraitClicked);
    }

    private static imageWithSrc(src: any) {
        const img = new Image();
        img.src = src;
        return img;
    }

    private static portraitClicked() {
        const el = ClickablePortrait.portraitElement;
        el.src = ClickablePortrait.altPortraits[ClickablePortrait.nextPortraitIndex].src;
        ClickablePortrait.nextPortraitIndex++;

        if (ClickablePortrait.nextPortraitIndex === ClickablePortrait.altPortraits.length) {
            el.classList.remove('portrait-clickable');
            el.removeEventListener('click', ClickablePortrait.portraitClicked);
            BackgroundModules.PortraitClickBonus();
        }
    }
}
import { ClickablePortrait } from '../clickablePortrait/clickablePortrait';
import { Shutterstock } from './shutterstock/shutterstock';
import { Pattern } from './patterns/patterns';

export interface BackgroundModule {
    PortraitBonus: () => void;
    TearDown: () => void;
}

interface BackgroundModuleClass {
    IsMobileFriendly: boolean;
    IsPoorConnectionFriendly: boolean;
    IconTooltip: string;
    IconFontAwesomeHTML: string; // Something like: <i class="fas fa-foo"></i>
    new (): BackgroundModule
}

export class BackgroundModules {
    private static allModules: BackgroundModuleClass[] = [Shutterstock, Pattern];
    private static validModules: BackgroundModuleClass[];
    private static runningModule: BackgroundModule;

    public static Init() {
        BackgroundModules.validModules = BackgroundModules.filterModulesForCurrentDevice();
        const i = Math.floor(Math.random() * BackgroundModules.validModules.length) % BackgroundModules.validModules.length;
        BackgroundModules.runningModule = new BackgroundModules.validModules[i]();

        document.body.appendChild(BackgroundModules.buildBackgroundSelectorButtons());
    }

    private static buildBackgroundSelectorButtons(): HTMLTableElement {
        const table = document.createElement('table');
        table.className = 'corner-button-container-table bg-selector-corner'; // See CSS for styles
        if (BackgroundModules.validModules.length < 2) {
            return table;
        }
        BackgroundModules.validModules.forEach((module: BackgroundModuleClass) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${module.IconFontAwesomeHTML}</td>`;
            row.title = module.IconTooltip;
            row.addEventListener('click', () => {
                BackgroundModules.runningModule.TearDown();
                BackgroundModules.runningModule = new module();
            });
            table.appendChild(row);
        });
        return table;

    }

    public static PortraitClickBonus() {
        if (BackgroundModules.runningModule !== null) {
            BackgroundModules.runningModule.PortraitBonus();
        }
    }

    private static filterModulesForCurrentDevice(): BackgroundModuleClass[] {
        return this.allModules.filter((module: BackgroundModuleClass) => {
            return !BackgroundModules.deviceIsMobile() || module.IsMobileFriendly;
        });
    }

    private static deviceIsMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
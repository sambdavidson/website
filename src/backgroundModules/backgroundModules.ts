import { ClickablePortrait } from '../clickablePortrait/clickablePortrait';
import { Shutterstock } from './shutterstock/shutterstock';
import { Pattern } from './patterns/patterns';

export interface BackgroundModule {
    IsMobileFriendly: boolean;
    IsPoorConnectionFriendly: boolean;
    PortraitBonus: ()=>void;
    TearDown: ()=>void;
}

export class BackgroundModules {

    private static modules: BackgroundModule[] = [];
    private static runningModule: BackgroundModule | null = null;

    public static Init() {
        // if (!BackgroundModules.deviceIsMobile()) {
        //     BackgroundModules.runningModule = this.modules[0];
        // }
        BackgroundModules.runningModule = new Pattern();
        if (BackgroundModules.runningModule) {
            //BackgroundModules.runningModule.Init();
        }

        // TODO: Add toggles between shutterstock and patterns. Call TearDown(). Add UI buttons.
    }

    public static PortraitClickBonus() {
        if (BackgroundModules.runningModule !== null) {
            BackgroundModules.runningModule.PortraitBonus();
        }
    }

    private static deviceIsMobile():boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
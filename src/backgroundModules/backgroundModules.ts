import { ClickablePortrait } from '../clickablePortrait/clickablePortrait';
import { Shutterstock } from './shutterstock/shutterstock';

export interface BackgroundModule {
    IsMobileFriendly: boolean;
    IsPoorConnectionFriendly: boolean;
    PortraitBonus: ()=>void;
    Init: ()=>void;
}

export class BackgroundModules {

    private static modules: BackgroundModule[] = [new Shutterstock()];
    private static runningModule: BackgroundModule | null = null;

    public static Init() {
        if (!BackgroundModules.deviceIsMobile()) {
            BackgroundModules.runningModule = this.modules[0];
        }
        if (BackgroundModules.runningModule) {
            BackgroundModules.runningModule.Init();
        }
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
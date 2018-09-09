import { BackgroundModule } from '../backgroundModules';

import HandGestures from './videos/hand_gestures.mp4';
import Multiracial from './videos/multiracial.mp4';
import Aurora from './videos/aurora.mp4';
import Sunrise from './videos/sunrise.mp4';
import Code from './videos/code.mp4';
import Dance from './videos/dance.mp4';

export class Shutterstock implements BackgroundModule {
    public static IsMobileFriendly = false;
    public static IsPoorConnectionFriendly = false;
    public static IconTooltip = 'Shutterstock Footage Background';
    public static IconFontAwesomeHTML = `<i class="fas fa-video"></i>`;

    private videos = [HandGestures, Multiracial, Aurora, Sunrise, Code];
    private chosenVideo: HTMLVideoElement | null;
    private loadingText = [
        'powered by ShutterStock',
        'loading the videobits',
        'buffering your background',
        'good backgrounds take time',
        'building better websites',
        'winners don\'t use drugs',
        'loading the background video',
        'follow @samdamana on twitter',
        'diversify your portfolio',
        'load load said the toad',
        'loading stock footage',
        'it\'s nickeLOADINGon!'
    ];
    private chosenLoadingText: string;
    private bonusVideo: HTMLVideoElement | null;
    private loaderDiv: HTMLDivElement;
    private loadingIntervalId: number;
    private loadedTimeoutId: number;
    private loadedSpans: number;

    constructor() {
        this.chosenVideo = null;
        this.loadedSpans = 0;
        this.chosenLoadingText = this.loadingText[Shutterstock.randomInt(0, this.loadingText.length)];
        this.loaderDiv = document.getElementById('bottom-loader') as HTMLDivElement;
        Shutterstock.populateDivWithHiddenSpans(this.loaderDiv, this.chosenLoadingText);

        this.chosenVideo = Shutterstock.buildVideoElement(this.videos[Shutterstock.randomInt(0, this.videos.length)]);
        document.body.appendChild(this.chosenVideo);

        // Get the bonus video loading if we need it.
        this.bonusVideo = Shutterstock.buildVideoElement(Dance);

        this.loadingIntervalId = setInterval(this.updateLoadingState.bind(this), 100);
    }

    public PortraitBonus(): void {
        if (!this.chosenVideo) {
            return;
        }

        this.chosenVideo.parentElement.removeChild(this.chosenVideo);
        document.body.appendChild(this.bonusVideo);
        this.chosenVideo = this.bonusVideo;

    }

    public TearDown() {
        if (this.chosenVideo && this.chosenVideo.parentElement) {
            this.chosenVideo.parentElement.removeChild(this.chosenVideo);
        }
        while (this.loaderDiv.hasChildNodes()) {
            this.loaderDiv.removeChild(this.loaderDiv.lastChild);
        }
        clearInterval(this.loadingIntervalId);
        clearTimeout(this.loadedTimeoutId);
        this.chosenVideo = null;
        this.bonusVideo = null;
    }

    private updateLoadingState(): void {
        if (!this.chosenVideo) {
            return;
        }
        const v = this.chosenVideo;

        if (v.paused && !!v.play) {
            v.play().catch(err => {
                console.error('error playing background shutterstock video', err);
            });
        }

        if (v.buffered.length <= 0) {
            return;
        }

        const percent = v.buffered.end(0) / v.duration;

        while(((this.loadedSpans+1)/this.chosenLoadingText.length) <= percent) {
            this.loaderDiv.getElementsByTagName('span')[this.loadedSpans++].className = 'visible-above';
        }

        if (percent === 1) {
            this.loadedTimeoutId = setTimeout(this.finishAndCleanupLoading.bind(this), 3000);
            clearInterval(this.loadingIntervalId)
        }
    }

    private finishAndCleanupLoading(): void {
        const letters = this.loaderDiv.getElementsByTagName('span');
        for (let i = 0; i < letters.length; i++) {
            letters[i].className = 'hidden-below';
        }
    }

    private static populateDivWithHiddenSpans(div: HTMLDivElement, text: string) {
        for (let i = 0; i < text.length; i++) {
            const child = document.createElement('span');
            child.innerText = text.charAt(i);
            child.className = 'hidden-below';
            div.appendChild(child);
        }
    }

    private static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private static buildVideoElement(src: any): HTMLVideoElement {
        const el = document.createElement('video') as HTMLVideoElement;
        el.className = 'background-video';
        el.muted = true;
        el.autoplay = true;
        el.loop = true;
        el.src = src;
        return el
    }
}
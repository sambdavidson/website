import { BackgroundModule } from '../backgroundModules';

interface SquareFrameStyle {
    (frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number): string
}

export class Pattern implements BackgroundModule {
    public IsMobileFriendly = true;
    public IsPoorConnectionFriendly = true;

    // Static
    private styles: SquareFrameStyle[] = [];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cycleButton: HTMLAnchorElement;
    private boundFrame: ()=>void;

    // Animation State
    private frameNumber: number = 0;
    private activeStyle: number = 0;
    private squareSize: number = 20;

    public constructor() {
        /* CANVAS */
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            background-color: black;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        `;
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        document.body.appendChild(this.canvas);

        /* CYCLE BUTTON */
        this.cycleButton = document.createElement('a');
        this.cycleButton.title = 'cycle background patterns';
        this.cycleButton.innerHTML = `<i class="fas fa-th-large"></i>`;
        this.cycleButton.style.cssText = `
            position: absolute;
            right: 0;
            transform: scale(0.5);
            bottom: 0;
            cursor: pointer;
        `;
        this.cycleButton.addEventListener('click', () => {
            this.activeStyle = (this.activeStyle + 1) % this.styles.length;
        });
        document.body.appendChild(this.cycleButton);

        /* ANIMATION FRAMES */
        this.styles = [
            Pattern.purpleSwirl,
            Pattern.rainbowDiamond,
            Pattern.coloredStatic,
            Pattern.cyclingRangePatterns,
        ];
        this.activeStyle = Math.floor(Math.random() * this.styles.length);
        this.boundFrame = this.renderActiveFrame.bind(this);
        window.requestAnimationFrame(this.boundFrame);

        (<any>window).hueRange = (Math.floor(Math.random() * 30) * 10) + 30;
        (<any>window).hueOffset = 0;
        let intervalId = 0;
        intervalId = setInterval(() => {
            (<any>window).hueRange = Math.max(((<any>window).hueRange + 10) % 360, 30);
            (<any>window).hueOffset = ((<any>window).hueOffset + 23) % 360;
            console.log(`New hue config:
            
    window.hueRange = ${(<any>window).hueRange}; 
    window.hueOffset = ${(<any>window).hueOffset};
    
Stop with: 
    
    clearInterval(${intervalId});`);
        }, 7000);

    }

    public PortraitBonus() {
        this.squareSize = 40;

    }

    private renderActiveFrame() {
        this.frameNumber++;
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.fillStyle = '#5a6476';
        const unitsWide = Math.ceil(w / this.squareSize);
        const unitsHigh = Math.ceil(h / this.squareSize);
        for (let i = 0; i < unitsWide; i++) {
            for (let j = 0; j < unitsHigh; j++) {
                this.ctx.fillStyle = this.styles[this.activeStyle](this.frameNumber, w, h, this.squareSize, i, j);
                this.ctx.fillRect(this.squareSize * i, this.squareSize * j, this.squareSize - 1, this.squareSize - 1);
            }
        }
        window.requestAnimationFrame(this.boundFrame);
    }

    static purpleSwirl(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number): string {
        const squaresWide = Math.ceil(width / squareSize);
        const offsetWidth = Math.abs((squaresWide/2) - xIndex);
        const offset = frame + (offsetWidth * yIndex);
        return `hsl(${200 + (offset % 100)}, 100%, 50%)`;
    }

    static rainbowDiamond(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number): string {
        const wOffset = Math.abs((xIndex*squareSize) - (width/2)) / width;
        const hOffset = Math.abs((yIndex*squareSize) - (height/2)) / height;
        const offset = frame + (hOffset * height) + (wOffset * width);
        return `hsl(${90 + (offset % 270)}, 100%, 50%)`;
    }

    static coloredStatic(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number): string {
        const hue = Math.floor(Math.random() * 360);
        let saturation = '15%';
        let lightness = '15%';
        if (Math.random() < 0.001) {
            saturation = '100%';
            lightness = '25%';
        }
        return `hsl(${hue}, ${saturation}, ${lightness})`;
    }

    static cyclingRangePatterns(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number): string {
        const xOffset = Math.abs((xIndex * squareSize) - (width/2));
        const yOffset = yIndex * squareSize;
        const offset = (xOffset*xOffset) + (yOffset*yOffset);
        let hue =  (<any>window).hueOffset + ((offset + frame) % (<any>window).hueRange);
        return `hsl(${hue}, 90%, 50%)`;
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight
    }

}

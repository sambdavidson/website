export class ClickableLetters {

    private constructor(){};

    public static InitializeOnElement(element: HTMLElement): void {
        const text = element.innerHTML.toString();

        element.innerHTML = "";
        element.className = "noselect";

        const charSet = ClickableLetters.letterSetFromString(text);
        const letters = Array.from(charSet.values()).sort();


        for(let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const letter = ClickableLetters.clickableLetter(char, letters);
            element.appendChild(letter);
        }
    }

    private static clickableLetter(letter: string, charSet: string[]): HTMLSpanElement {
        let el = document.createElement('span');
        el.innerHTML = letter;
        el.className = "header-letter";
        el.onclick = ClickableLetters.letterClickCallback(charSet);
        return el
    }

    private static letterClickCallback(letters: string[]): ((e: MouseEvent) => void) {
        return (e: MouseEvent) => {
            let i = letters.indexOf(event.srcElement.innerHTML.toString());
            let next = (i+1) % letters.length;

            e.srcElement.innerHTML = letters[next];
        };
    }

    private static letterSetFromString(text: string): Set<string> {
        const set = new Set<string>();
        for (let i = 0; i < text.length; i++) {
            set.add(text.charAt(i));
        }
        return set;
    }
}
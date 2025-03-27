export {}; // This makes the file a module

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// speech.d.ts

// Déclaration des interfaces pour SpeechRecognition
interface SpeechRecognition extends EventTarget {
    [x: string]: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: (event: Event) => any;
    onresult: (event: SpeechRecognitionEvent) => any;
    onerror: (event: SpeechRecognitionError) => any;
    onend: (event: Event) => any;
  }
  
  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
  
  // Déclaration des interfaces pour SpeechGrammarList
  interface SpeechGrammarList {
    addFromString(grammar: string, weight?: number): void;
    addFromUri(src: string, weight?: number): void;
    readonly length: number;
    item(index: number): any;
    [index: number]: any;
  }
  
  // Déclaration des constructeurs
  declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  
  declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  
  declare var SpeechGrammarList: {
    prototype: SpeechGrammarList;
    new (): SpeechGrammarList;
  };
  
  declare var webkitSpeechGrammarList: {
    prototype: SpeechGrammarList;
    new (): SpeechGrammarList;
  };
  
  // Extension de l'interface Window pour inclure ces APIs
  declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
      webkitSpeechRecognition: typeof webkitSpeechRecognition;
      SpeechGrammarList: typeof SpeechGrammarList;
      webkitSpeechGrammarList: typeof webkitSpeechGrammarList;
    }
  }
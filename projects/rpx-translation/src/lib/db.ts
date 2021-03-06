import Dexie, { Table } from 'dexie';
import { DateTime } from 'luxon';
import { RpxLanguage } from './rpx-language.enum';

export class Translation {
    id?: number;
    phrase: string;
    lang: RpxLanguage;
    translation: string;
    validity: string;

    isExpired(): boolean {
        return DateTime.fromISO(this.validity) < DateTime.now()
    }

    public static create(phrase: string, lang: RpxLanguage, translation: string, validity: string): Translation {
        let t = new Translation();
        t.phrase = phrase;
        t.lang = lang;
        t.translation = translation;
        t.validity = validity;
        return t;
    }
}

export class TranslationDB extends Dexie {
    translations: Table<Translation, number>;

    constructor() {
        super("RpxTranslations");
        this.version(1).stores({
            translations: '++id, [phrase+lang]'
        });
        this.translations.mapToClass(Translation);
    }
}

export const db = new TranslationDB();

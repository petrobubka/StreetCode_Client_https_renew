import { makeAutoObservable, runInAction } from 'mobx';
import relatedTermApi from '@api/streetcode/text-content/related-terms.api';

import { RelatedTerm } from '@/models/streetcode/text-contents.model';

export default class RelatedTermsStore {
    public storage = new Map<number, RelatedTerm>();

    public constructor() {
        makeAutoObservable(this);
    }

    private setRelatedTermItem = (relatedTerm: RelatedTerm) => {
        this.storage.set(relatedTerm.id, relatedTerm);
    };

    private set setRelatedTermMap(relatedTerms: RelatedTerm[]) {
        relatedTerms.forEach((rt) => {
            this.setRelatedTermItem(rt);
        });
    }

    get getRelatedTermsArray() {
        return Array.from(this.storage.values());
    }

    public fetchRelatedTermsByTermId = async (id: number) => {
        console.log(`CURRENT ID: ${id}`);
        try {
            this.setRelatedTermMap = await relatedTermApi.getAllByTermId(id);
            // console.log(this.storage.values());
        } catch (error) {
            console.log(error);
        }
    };

    public createRelatedTerm = async (word: string, termId: number) => {
        const newRelatedTerm : RelatedTerm = {
            id: 0,
            word,
            termId,
        };
        try {
            await relatedTermApi.create(newRelatedTerm);
            this.setRelatedTermItem(newRelatedTerm);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    public deleteRelatedTerm = async (id: number) => {
        try {
            await relatedTermApi.delete(id);
            runInAction(() => {
                this.storage.delete(id);
            });
        } catch (error) {
            console.log(error);
        }
    };

    public updateRelatedTerm = async (id: number, updatedTerm: RelatedTerm) => {
        try {
            await relatedTermApi.update(id, updatedTerm);
            runInAction(() => {
                const updateRelatedTerm = {
                    ...this.storage.get(updatedTerm.id),
                    ...updatedTerm,
                };
                this.setRelatedTermItem(updateRelatedTerm as RelatedTerm);
            });
        } catch (error) {
            console.log(error);
        }
    };
}

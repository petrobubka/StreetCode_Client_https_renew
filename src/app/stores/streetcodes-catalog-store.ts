import { makeAutoObservable } from 'mobx';
import StreetcodesApi from '@api/streetcode/streetcodes.api';

import { StreetcodeCatalogRecord } from '@/models/streetcode/streetcode-types.model';

export default class StreetcodesCatalogStore {
    public catalog = new Array<StreetcodeCatalogRecord>();

    public moreThenEight = false;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchCatalogStreetcodes = async (page: number, count = 8) => {
        try {
            const fetchedPublishCount = (await StreetcodesApi.getAllPublished())
                .length;
            const array = await StreetcodesApi.getAllCatalog(page, count);
            if (
                this.catalog.length === 0 || !array.some((item) => item.id === this.catalog.at(0)?.id)
            ) {
                this.catalog = this.catalog.concat(array);
                if (this.catalog.length === fetchedPublishCount || fetchedPublishCount <= 8) {
                    this.moreThenEight = false;
                } else {
                    this.moreThenEight = true;
                }
            }
        } catch (error) {}
    };

    get getCatalogStreetcodesArray() {
        return this.catalog;
    }
}

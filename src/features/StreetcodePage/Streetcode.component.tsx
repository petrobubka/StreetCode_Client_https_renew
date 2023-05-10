import './Streetcode.styles.scss';

import { observer } from 'mobx-react-lite';
import React, {
    lazy, Suspense, useEffect, useRef, useState,
} from 'react';
import ScrollToTopBtn from '@components/ScrollToTopBtn/ScrollToTopBtn.component';
import ProgressBar from '@features/ProgressBar/ProgressBar.component';
import Footer from '@layout/footer/Footer.component';
import useMobx from '@stores/root-store';
import DonateBtn from '@streetcode/DonateBtn/DonateBtn.component';
import MainBlock from '@streetcode/MainBlock/MainBlock.component';
import QRBlock from '@streetcode/QRBlock/QR.component';
import SourcesBlock from '@streetcode/SourcesBlock/Sources.component';
import TextBlockComponent from '@streetcode/TextBlock/TextBlock.component';
import TickerBlock from '@streetcode/TickerBlock/Ticker.component';

import TagsModalComponent from '@/app/common/components/modals/Tags/TagsModal.component';
import { useRouteUrl } from '@/app/common/hooks/stateful/useRouter.hook';

import ArtGalleryBlockComponent from './ArtGalleryBlock/ArtGalleryBlock.component';
import InterestingFactsComponent from './InterestingFactsBlock/InterestingFacts.component';
import MapComponent from './MapBlock/Map/Map.component';
import MapBlock from './MapBlock/MapBlock.component';
import PartnersComponent from './PartnersBlock/Partners.component';
import RelatedFiguresComponent from './RelatedFiguresBlock/RelatedFigures.component';
import TimelineBlockComponent from './TimelineBlock/TimelineBlock.component';

const StreetcodeContent = () => {
    const { imageLoaderStore, streetcodeStore } = useMobx();
    const { setCurrentStreetcodeId } = streetcodeStore;
    const { imagesLoadedPercentage, totalImagesToLoad } = imageLoaderStore;

    const streetcodeUrl = useRouteUrl();

    const [activeTagId, setActiveTagId] = useState(0);
    const [activeBlock, setActiveBlock] = useState(0);
    const [loading, setLoading] = useState(true);

    const [textBlockState, setTextBlockState] = useState(false);

    useEffect(() => {
        setCurrentStreetcodeId(streetcodeUrl).then();
    }, [setCurrentStreetcodeId, streetcodeUrl]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        console.log(imageLoaderStore.imagesLoadedPercentage);
        console.log(imageLoaderStore.loadedImagesCount);
        console.log(imageLoaderStore.totalImagesToLoad);

        if (imageLoaderStore.imagesLoadedPercentage >= 90 && textBlockState) {
            setLoading(false);
            document.body.style.overflow = 'auto';

            const anchorId = window.location.hash.substring(1);
            const blockElement = document.getElementById(anchorId);
            if (blockElement) {
                blockElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [textBlockState, imageLoaderStore.loadedImagesCount]);

    return (
        <div className="streetcodeContainer">
            {loading && (
                <div className="loader-container">
                    <img
                        className="spinner"
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
                    />
                </div>
            )}
            <ProgressBar>
                <MainBlock
                    setActiveTagId={setActiveTagId}
                    setActiveBlock={setActiveBlock}
                />
                <TextBlockComponent setTextBlockState={setTextBlockState} />
                <InterestingFactsComponent />
                <TimelineBlockComponent />
                <MapBlock />
                <ArtGalleryBlockComponent />
                <RelatedFiguresComponent setActiveTagId={setActiveTagId} />
                <SourcesBlock />
            </ProgressBar>
            <QRBlock />
            <PartnersComponent />
            <div className="sticky">
                <div className="sticky-content">
                    <ScrollToTopBtn />
                    <DonateBtn />
                </div>
            </div>
            <TickerBlock />
            <Footer />
            <TagsModalComponent
                activeTagId={activeTagId}
                setActiveTagId={setActiveTagId}
                activeTagBlock={activeBlock}
            />
        </div>
    );
};

export default observer(StreetcodeContent);

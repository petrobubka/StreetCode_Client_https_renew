import './NewsSliderItem.styles.scss';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import htmlReactParser, { domToReact } from 'html-react-parser';

import ImagesApi from '@/app/api/media/images.api';
import useWindowSize from '@/app/common/hooks/stateful/useWindowSize.hook';
import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';
import { toArticleRedirectClickEvent } from '@/app/common/utils/googleAnalytics.unility';
import Image from '@/models/media/image.model';
import News from '@/models/news/news.model';

interface Props {
    news: News;
}

const NewsSliderItem = ({ news }: Props) => {   
    const id = news?.id;
    const [image, setImage] = useState<Image>();
    const isMobile = useMediaQuery({
        query: '(max-width: 480px)',
    });

    useEffect(() => {
        if (id) {
            ImagesApi.getById(news.imageId)
                .then((imgs) => setImage(imgs))
                .catch((e) => { });
        }
    }, [news]);

    const handleClickRedirect = () => {
        toArticleRedirectClickEvent(news.url.toString(), 'main_page');
        window.location.href = `news/${news.url.toString()}`;
    };
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleClickRedirect();
    };

    return (
        <div className="newsSliderItem">
            <div className="newsMainPage" onClick={isMobile ? handleClickRedirect : undefined}>
                <div className="newsPageImgContainer">
                    <img
                        key={image?.id}
                        src={base64ToUrl(image?.base64, image?.mimeType)}
                        className="newsPageImg"
                    />
                </div>
                <div className="newsSlideText">
                    <div className="newsContainer">
                        <div>
                            <h2 className="newsTitle">
                                {news?.title}
                            </h2>
                            <div className="newsText">
                                <span className="text">{htmlReactParser(news?.text)}</span>
                                <a className="moreText" href={news.text} onClick={handleLinkClick}>
                                    До новини
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsSliderItem;

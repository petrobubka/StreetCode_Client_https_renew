import './SourceItem.styles.scss';

import { observer } from 'mobx-react-lite';
import { SourceCategory } from '@models/sources/sources.model';
import useMobx from '@stores/root-store';

import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';

interface Props {
    srcCategory: SourceCategory;
}

const SourceItem = ({ srcCategory }: Props) => {
    const { modalStore: { setModal } } = useMobx();

    console.log(srcCategory);
    return (
        <div
            className="sourcesSliderItem"
            onClick={() => setModal('sources', srcCategory.id)}
            style={{ backgroundImage: `url(${base64ToUrl(srcCategory.image?.base64, srcCategory.image?.mimeType)})` }}
        >
            <h1>{srcCategory.title}</h1>
        </div>
    );
};

export default observer(SourceItem);

import './SourcesModal.styles.scss';
import CancelBtn from "@assets/images/utils/Cancel_btn.svg";

import { Modal } from "antd";

import useMobx from "@stores/root-store";
import { observer } from "mobx-react-lite";

const volumes = ["Том 1: Суспільно-політичні твори (1894–1907).",
    "Том 2: Суспільно-політичні твори (1907–1914).",
    "Том 3: Суспільно-політичні твори (1907 — березень 1917).",
    "Том 4. Книга 1: Суспільно-політичні твори (доба Української Центральної Ради, березень 1917 — квітень 1918).",
    "Том 5: Історичні студії та розвідки (1888–1896).",
    "Том 6: Історичні студії та розвідки (1895–1900).",
    "Том 7: Історичні студії та розвідки (1900–1906).",
    "Том 8: Історичні студії та розвідки (1906–1916).",
    "Том 9: Історичні студії та розвідки (1917–1923).",
    "Том 10. Книга 1: Історичні студії та розвідки (1924— 1930)/ упор. О.Юркова.",
    "Том 10. Книга 2: Історичні студії та розвідки (1930— 1934)",
    "Том 10. Книга 3: Серія \"Історичні студії та розвідки\"",
    "Том 11: Літературно-критичні праці (1883–1931), «По світу»",
    "Том 12: Поезія (1882–1903). Проза, драматичні твори, переклади (1883–1886)",
    "Том 13 : Серія \"Літературно-критичні та художні твори (1887-1924)\"",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 14: Рецензії та огляди (1888–1897).",
    "Том 20: Рецензії та огляди (1888–1897).",
];

const SourcesModal = () => {
    const { sourcesStore: { srcCategoriesMap }, modalStore } = useMobx();
    const { setModal, modalsState: { sources } } = modalStore;

    const category = srcCategoriesMap.get(sources.fromCardId!);

    return (
        <Modal
            className={'sourcesModal'}
            open={sources.isOpen}
            maskClosable
            centered
            footer={null}
            onCancel={() => setModal('sources', undefined)}
            closeIcon={<CancelBtn />}
        >
            <div className={"sourceImgContainer"} style={{backgroundImage: `url(${category?.image?.url.href})`}}>
                <h1>{category?.title}</h1>
            </div>
            <div className={"sourcesContentContainer"}>
                {category?.subCategories.map(({ id, sourceLinks, title }) => (
                    <div key={id}>
                        <h1>{title}</h1>
                        <div className={"volumeContainer"}>
                            {sourceLinks.map(({ id, url }) => (
                                <a key={id} href={url?.href}>{url?.title}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}

export default observer(SourcesModal);
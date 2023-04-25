import './PartnerBlockAdmin.style.scss';

import React, { useEffect, useRef, useState } from 'react';
import PartnersStore from '@stores/partners-store';

import { Button, Select } from 'antd';

import PartnerModal from '@/features/AdminPage/PartnersPage/PartnerModal/PartnerModal.component';
import { PartnerShort } from '@/models/partners/partners.model';

interface Props {
    setPartners: React.Dispatch<React.SetStateAction<PartnerShort[]>>;
}
const PartnerBlockAdmin = ({ setPartners }: Props) => {
    const selectedPartners = useRef<PartnerShort[]>([]);
    const [allPartnersShort, setAllPartnerShort] = useState<PartnerShort[]>([]);
    const [modalAddOpened, setModalAddOpened] = useState<boolean>(false);
    useEffect(() => {
        Promise.all([
            PartnersStore.getAllPartnerShort()
                .then((partners) => setAllPartnerShort(partners))
                .then(() => console.log(allPartnersShort)),
        ]);
    }, []);

    const onPartnerSelect = (value:number) => {
        const index = allPartnersShort.findIndex((c) => c.id === value);
        selectedPartners.current.push(allPartnersShort[index]);
        setPartners(selectedPartners.current);
    };
    const onPartnerDeselect = (value:number) => {
        selectedPartners.current = selectedPartners.current.filter((c) => c.id !== value);
        setPartners(selectedPartners.current);
    };
    return (
        <div className="adminContainer-block">
            <h2>Партнери</h2>
            <div className='display-flex-row'> 
                <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    onSelect={onPartnerSelect}
                    onDeselect={onPartnerDeselect}
                >
                    {allPartnersShort
                        .map((s) => <Select.Option key={`${s.id}`} value={s.id}>{s.title}</Select.Option>)}
                </Select>

                <Button
                    className="streetcode-custom-button button-margin-left"
                    onClick={() => setModalAddOpened(true)}
                >
                     Додати
                </Button>
            </div>
            <PartnerModal
                open={modalAddOpened}
                setIsModalOpen={setModalAddOpened}
                isStreetcodeVisible={false}
                afterSubmit={
                    (partner) => setAllPartnerShort([...allPartnersShort, { id: partner.id, title: partner.title }])
                }
            />
        </div>
    );
};
export default PartnerBlockAdmin;

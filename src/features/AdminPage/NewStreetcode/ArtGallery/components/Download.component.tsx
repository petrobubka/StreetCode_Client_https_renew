import React, { useEffect, useRef, useState } from 'react';

import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

import ImagesApi from '@/app/api/media/images.api';
import FileUploader from '@/app/common/components/FileUploader/FileUploader.component';
import { ArtCreate } from '@/models/media/art.model';
import Image from '@/models/media/image.model';

import ArtGalleryAdminBlock from './ArtGallery/ArtGalleryAdminBlock.component';
import PreviewImageModal from './PreviewImageModal/PreviewImageModal.component';
import base64ToUrl from '../../../../../app/common/utils/base64ToUrl.utility';

const DownloadBlock: React.FC<{ arts:ArtCreate[],
    setArts: React.Dispatch<React.SetStateAction<ArtCreate[]>> }> = ({ arts, setArts }) => {
        const [fileList, setFileList] = useState<UploadFile[]>([]);
        const [filePreview, setFilePreview] = useState<UploadFile | null>(null);
        const [isOpen, setIsOpen] = useState(false);
        const uidsFile = useRef<string>('');
        const indexTmp = useRef<number>(0);

        useEffect(() => {

            const newFileList = arts.map((art: ArtCreate) => ({
                uid: art.uidFile,
                name: art.title,
                status: 'done',
                thumbUrl: base64ToUrl(art.image, art.mimeType) ?? "",
                type: art.mimeType,
            }));
            setFileList(newFileList);
            indexTmp.current = Math.max(arts.map(x => x.index)) + 1;
        }, [arts]);

        const onChange = (uploadParams:UploadChangeParam<UploadFile<any>>) => {
            uidsFile.current = uploadParams.file.uid;
            setFileList(uploadParams.fileList.map((x) => x));
        };

        const onPreview = async (file: UploadFile) => {
            setFilePreview(file);
            setIsOpen(true);
        };
        const onSuccessUpload = (image:Image) => {
            const newArt: ArtCreate = {
                index: indexTmp.current + 1,
                description: 'description',
                image: image.base64,
                title: 'title',
                imageId: image.id,
                mimeType: image.mimeType,
                uidFile: uidsFile.current,
            };
            indexTmp.current += 1;
            setArts([...arts, newArt]);
        };
        const onRemoveFile = (file:UploadFile) => {
            const removedArtIndex = arts.findIndex((a) => a.uidFile === file.uid);
            if (removedArtIndex >= 0) {
                ImagesApi.delete(arts[removedArtIndex].imageId);
                arts.splice(removedArtIndex, 1);
                setArts([...arts]);
            }
        };

        const handleSave = (art: ArtCreate) => {
            const updated = arts.find((x) => x.imageId === art.imageId);
            if (!updated) {
                return;
            }
            updated.description = art.description;
            updated.title = art.title;
            setArts([...arts]);
            setIsOpen(false);
        };

        return (
            <>
                <FileUploader
                    accept=".jpeg,.png,.jpg"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={onPreview}
                    uploadTo="image"
                    onChange={onChange}
                    onSuccessUpload={onSuccessUpload}
                    onRemove={onRemoveFile}
                >
                    {fileList.length < 15 ? <p>+ Додати</p> : <></>}
                </FileUploader>
                {arts.length > 0 ? (
                    <>
                        <h4>Попередній перегляд</h4>
                        <ArtGalleryAdminBlock arts={arts} />
                        <PreviewImageModal
                            art={arts[fileList.indexOf(filePreview!)]}
                            onSave={handleSave}
                            opened={isOpen}
                            setOpened={setIsOpen}
                        />
                    </>
                ) : null}
            </>
        );
    };

export default DownloadBlock;
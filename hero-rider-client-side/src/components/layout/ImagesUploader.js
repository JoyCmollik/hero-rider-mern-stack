import React, { useEffect } from 'react';
import { Button, Input, Upload, message, Spin } from 'antd';

const ImagesUploader = ({setImageFile, limit}) => {
   const props = {
		name: 'image',
		multiple: true,
		listType: 'picture',
		accept: '.png, .jpeg',
		maxCount: limit,
		action: 'https://api.imgbb.com/1/upload?expiration=9999999999&key=e2401ff27943b11283409a478fccc412',
		// beforeUpload: (file) => {
		// 	getBase64(file, (url) => {
		// 		handleUploadImageToCloudinary(url);
		// 	});
		// 	return false;
		// },
		iconRender: () => {
			return <Spin />;
		},
		onChange: (info) => {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
				console.log(info.file.response);
				setImageFile(() => info.file.response.data.display_url);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		progress: {
			strokeWidth: 2.5,
			strokeColor: { '0%': '#f0f', '100%': '#ff0' },
			showInfo: false,
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
   };

  return (
		<div className='w-full space-y-2 flex flex-col h-fit text-center'>
			<Upload.Dragger className='upload-list-inline' {...props}>
				<p className='ant-upload-drag-icon text-center'>
					<lord-icon
						src='https://cdn.lordicon.com/fgkmrslx.json'
						trigger='hover'
						colors='primary:#fff,secondary:#fff'
						style={{ width: 45, height: 45 }}
					/>
				</p>
				<p className='ant-upload-text'>
					Click or drag file to this area to upload
				</p>
				<small className='ant-upload-hint'>
					Please upload only one picture, selecting another will
					replace existing one
				</small>
			</Upload.Dragger>
		</div>
  );
}

export default ImagesUploader
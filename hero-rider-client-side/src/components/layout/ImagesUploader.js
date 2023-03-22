import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ImagesUploader = ({imageFile, setImageFile, limit}) => {
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
		maxFiles: limit,
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setImageFile(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const errorMessage = fileRejections?.length
		? fileRejections[0]?.errors[0]?.message
		: '';

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[imageFile]
	);
  return (
		<section className='w-full py-4'>
			{!imageFile?.length ? (
				<div
					className='flex flex-col justify-center items-center rounded-lg border border-dashed border-para py-2'
					{...getRootProps()}
				>
					<lord-icon
						src='https://cdn.lordicon.com/fgkmrslx.json'
						trigger='hover'
						colors='primary:#fff,secondary:#fff'
						style={{ width: 45, height: 45 }}
					/>
					<h4 className='text-base font-medium'>
						Drop your photos here
					</h4>
					<small>You can add upto {limit} image.</small>
					<p className='underline mt-4 tracking-wider cursor-pointer'>
						or simply click here to upload
					</p>
					<input {...getInputProps()} />
					<div
						className={`${
							errorMessage
								? 'p-4 bg-red-100 text-red-900 rounded-lg mt-4'
								: 'hidden'
						}`}
					>
						{errorMessage && <p>{errorMessage}</p>}
					</div>
				</div>
			) : (
				<div className='border rounded-lg p-4'>
					<div className='grid grid-cols-2 gap-4'>
						{imageFile.map((file) => (
							<div
								className='h-[100px] overflow-hidden rounded-lg'
								key={file.name}
							>
								<img
									className='object-cover w-fit rounded-lg'
									src={file.preview}
									alt='pics'
								/>
							</div>
						))}
					</div>
					<div className='flex justify-between items-center'>
						<h4 className='text-base'>Want to upload again?</h4>
						<button
							onClick={() => setImageFile([])}
							className='px-4 py-1 bg-red-100 text-red-400 rounded-lg'
						>
							Clear
						</button>
					</div>
				</div>
			)}
		</section>
  );
}

export default ImagesUploader